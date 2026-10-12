'use strict';
(() => {
  const data = window.THREE_C_DATA;
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const el = id => document.getElementById(id);
  const readerText = v => String(v ?? '').replace('Giữ bản gốc để truy vết; không cộng dòng trùng thành người mới.','Cùng một người đã xuất hiện ở bản ghi khác.').replace('Bài cá nhân tự đăng không đồng nghĩa kết quả đã được kiểm chứng.','Kết quả được kể chưa được kiểm chứng độc lập.').replace(/\bNCC\b/g,'đơn vị đào tạo').replace(/\bDMIA\b/g,'Digital Marketing in Action').replace(/\bclaim\b/gi,'thông tin').replace(/\bdeck\b/gi,'bài trình bày').replace(/before\/after/gi,'trước và sau góp ý').replace(/\bsnippet\b/gi,'đoạn trích kết quả tìm kiếm').replace(/\bseeding\b/gi,'nội dung quảng bá').replace(/\bURL\b/g,'đường dẫn').replace(/\bBTVN\b/g,'bài tập về nhà');
  const statusLabel = v => ({'Theo dữ liệu thu thập':'Theo nguồn thu thập','Theo bộ thu thập bổ sung':'Theo nguồn bổ sung','Trùng với bộ trước':'Đã có trong tài liệu trước','Có bản ghi trùng cần đọc cùng':'Có thông tin trùng','Story do nhà cung cấp chọn đăng':'Story Instagram do đơn vị chọn đăng','Cần đối chiếu phiên bản URL và giá hiện hành':'Các trang ghi giá khác nhau','Đối chiếu bổ sung 12/10':'Được kiểm tra ngày 12/10'}[v] || readerText(v));
  const set = el('three-c-dataset'), status = el('three-c-status'), search = el('three-c-search');
  let page = 0, filtered = [], pageSize = 12;
  const labels = {programs:'thông tin chương trình',alternatives:'lựa chọn thay thế',customers:'bản ghi về người học',company:'thông tin CareerPrep',evidence:'thông tin',sources:'nguồn',logs:'lần tìm hoặc kiểm tra nguồn',updates:'thông tin chương trình bổ sung',practice:'bản ghi bài tập và phản hồi',questions:'câu hỏi cần xác nhận'};
  const subject = r => [r.provider_name||r.provider,r.program_name,r.name,r.person_name_or_alias||r.person_alias,r.entity,r.program,r.title,r.entity_or_topic,r.topic,r.field].filter(Boolean).join(' · ');
  const describe = (r,k) => {
    if(k==='programs') return [['Dành cho',r.customer_description_verbatim],['Nội dung',r.curriculum],['Hình thức và thời lượng',[r.learning_format,r.duration].filter(Boolean).join(' · ')],['Học phí ghi nhận',[r.listed_price_vnd,r.promotional_price_vnd].filter(Boolean).join(' / ')],['Điều kiện',r.promotion_conditions]];
    if(k==='customers') return [['Vai trò',r.role_verbatim],['Nhu cầu',r.task_or_problem_verbatim||r.task],['Lý do tìm hiểu hoặc học thêm',r.trigger||r.trigger_verbatim],['Cách học hoặc cách làm trước đó',r.previous_solution||r.previous_solutions_verbatim],['Lựa chọn',r.chosen_solution],['Tình trạng học hoặc đăng ký',r._reviewedPurchase||r.purchase_status],['Trải nghiệm',r.experience_verbatim||r.experience],['Lý do chọn',r.selection_reasons_verbatim||r.selection_reason],['Thời điểm',r.publication_date||r.event_date]];
    if(k==='company') return [['Thông tin',r.fact_description],['Trích dẫn',r.supporting_excerpt],['Giá trị / kỳ',[r.value,r.unit,r.period].filter(Boolean).join(' · ')]];
    if(k==='alternatives') return [['Nhiệm vụ',r.tasks_supported],['Nội dung',r.features_or_content],['Giá / điều kiện',r.price_and_conditions],['Hướng dẫn',r.guidance_or_support]];
    if(k==='evidence') return [['Tóm tắt',r.factual_summary],['Trích dẫn',r.verbatim_excerpt],['Phạm vi',r.population_or_scope],['Thời điểm',r.event_date]];
    if(k==='sources') return [['Nhà xuất bản',r.publisher],['Ngày đăng',r.publication_date],['Truy cập',r.access_date],['Tình trạng truy cập',r.access_status],['Phần đã đọc',r.read_scope],['Loại nguồn',r.source_type]];
    if(k==='updates') return [['Nội dung cập nhật',r.observed_value],['Thông tin ghi nhận trước',r.original_value],['Gói / hình thức',[r.package_scope,r.learning_format].filter(Boolean).join(' · ')],['Điều kiện',[r.eligibility,r.promotion_deadline,r.VAT_status].filter(Boolean).join(' · ')],['Kỳ / ngày',[r.cohort_and_year,r.access_date].filter(Boolean).join(' · ')]];
    if(k==='practice') {const promise=!r.record_type&&r.assignment_description==='lời hứa trang bán khóa';return [['Loại thông tin',r._displayType||r.record_type],['Bài tập / phản hồi',promise?r.individual_or_group:r.assignment_description],['Nhận xét giảng viên',promise?'':r.instructor_feedback_description],['Ứng dụng được kể',r.application_claim],['Cách kiểm chứng',r.application_evidence],['Giới hạn',r.limitations],['Khóa / ngày',[r.cohort,r.event_date].filter(Boolean).join(' · ')]];}
    if(k==='questions') return [['Câu hỏi',r._displayQuestion||r.exact_question],['Thông tin đã kiểm tra',r.what_was_read],['Kết quả ghi nhận',r.finding_status],['Thông tin cần bổ sung',r.next_source_or_internal_data_needed]];
    return [['Đã kiểm tra',r.query_or_url_checked||r.query_or_url],['Kết quả',r.result],['Vướng mắc',r.issue],['Ngày',r.access_date||r.checked_at]];
  };
  const fields = r => Object.entries(r).filter(([k])=>!k.startsWith('_')).map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');
  function statuses() {
    status.innerHTML = '<option value="">Tất cả</option>'+[...new Set(data[set.value].map(r=>r._status))].sort().map(s=>`<option value="${esc(s)}">${esc(statusLabel(s))}</option>`).join('');
  }
  function draw() {
    const q=search.value.trim().toLocaleLowerCase('vi');
    filtered=data[set.value].filter(r=>(!status.value || r._status===status.value) && (!q || JSON.stringify(r).toLocaleLowerCase('vi').includes(q)));
    const pages=Math.max(1,Math.ceil(filtered.length/pageSize));page=Math.min(page,pages-1);
    el('three-c-count').textContent=`Hiển thị ${filtered.length} trong ${data[set.value].length} ${labels[set.value]}.`;
    el('three-c-body').innerHTML=filtered.slice(page*pageSize,(page+1)*pageSize).map(r=>`<tr id="three-c-record-${esc(r._id)}"><td><b>${esc(r._id)}</b><p>${esc(subject(r))}</p>${r._batch?`<small>Bổ sung ${esc(r._batch)}</small>`:''}</td><td>${describe(r,set.value).filter(([,v])=>v).map(([k,v])=>`<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join('')}</td><td><span class="pill ${r._notes.length?'amber':'outline'}">${esc(statusLabel(r._status))}</span>${r._notes.map(n=>`<p class="wave-note">${esc(readerText(n))}</p>`).join('')}<small>${esc(readerText(r.source_relationship||r.commercial_relationship||''))}</small>${r.missing_information?`<small>Chưa rõ: ${esc(readerText(r.missing_information))}</small>`:''}${r._relatedIds?.length?`<details><summary>Thông tin liên quan</summary>${r._relatedIds.map(id=>`<a href="#three-c-record-${esc(id)}">${esc(id)}</a><br>`).join('')}</details>`:''}</td><td>${r._urls.filter(u=>/^https?:\/\//.test(u)).map((u,i)=>`<a href="${esc(u)}" target="_blank" rel="noopener">Mở nguồn ${i+1}</a><br>`).join('')}<small>${esc(r._sourceIds.join(' · '))}</small><details><summary>Nội dung file gốc</summary><p class="c-note">Tên cột và nội dung được giữ như tài liệu đã nhận.</p><dl class="wave-fields">${fields(r)}</dl></details></td></tr>`).join('') || '<tr><td colspan="4" class="empty">Không tìm thấy nội dung phù hợp. Thử xóa bộ lọc hoặc đổi từ khóa.</td></tr>';
    el('three-c-page').textContent=`Trang ${page+1} / ${pages}`;
    el('three-c-prev').disabled=page===0;el('three-c-next').disabled=page>=pages-1;
  }
  set.addEventListener('change',()=>{page=0;statuses();draw();});
  status.addEventListener('change',()=>{page=0;draw();});search.addEventListener('input',()=>{page=0;draw();});
  el('three-c-reset').addEventListener('click',()=>{status.value='';search.value='';page=0;draw();});
  el('three-c-prev').addEventListener('click',()=>{page--;draw();});el('three-c-next').addEventListener('click',()=>{page++;draw();});
  const index = new Map(Object.keys(labels).flatMap(k=>data[k].map(r=>[r._id,k])));
  function navigate() {
    const prefix='#three-c-record-';if(!location.hash.startsWith(prefix))return;
    const id=decodeURIComponent(location.hash.slice(prefix.length)), k=index.get(id);if(!k)return;
    set.value=k;statuses();status.value='';search.value=id;page=0;draw();
    const row=el('three-c-record-'+id);if(row){for(let node=row.parentElement;node;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;requestAnimationFrame(()=>row.scrollIntoView({block:'start'}));}
  }
  window.addEventListener('hashchange',navigate);
  el('three-c-audit-body').innerHTML=data.audit.map(a=>`<tr><td>${a.ids.map(id=>`<a href="#three-c-record-${esc(id)}">${esc(id)}</a>`).join(' · ')}</td><td>${esc(readerText(a.status))}</td><td>${esc(readerText(a.note))}</td></tr>`).join('');
  const path='research/muse/2026-10-11-3c/';
  const files=[['README.md','Phạm vi và cách thu thập'],['competitor_programs.csv','Chương trình đối thủ'],['alternatives.csv','Lựa chọn thay thế'],['customer_cases.csv','Trường hợp người học'],['company_facts.csv','Thông tin CareerPrep'],['evidence.csv','Thông tin đã thu thập'],['sources.csv','Nguồn'],['collection_log.csv','Lịch sử kiểm tra nguồn']];
  el('three-c-downloads').innerHTML=files.map(([f,n])=>`<a class="button secondary" href="${path}raw/${f}" download>${n}</a>`).join('')+`<a class="button secondary" href="${path}reviewed.json" download>Dữ liệu kèm ghi chú kiểm tra</a><a class="button secondary" href="${path}muse_followup_prompt.md" download>Yêu cầu thu thập thêm</a>`;
  const followupPath='research/muse/2026-10-12-followup/';
  el('followup-downloads').innerHTML=[['program_updates.csv','Thông tin chương trình bổ sung'],['practice_and_feedback.csv','Bài tập và phản hồi'],['customer_cases_new.csv','Trường hợp người học bổ sung'],['sources_new.csv','Nguồn bổ sung'],['collection_log_new.csv','Các lần tìm và kiểm tra nguồn'],['open_questions.csv','Câu hỏi cần xác nhận'],['README.md','Phạm vi tài liệu bổ sung']].map(([f,n])=>`<a class="button secondary" href="${followupPath}raw/${f}" download>${n}</a>`).join('')+`<a class="button secondary" href="${followupPath}reviewed.json" download>Dữ liệu kèm ghi chú</a><a class="button secondary" href="${followupPath}impact.md" download>Thông tin ảnh hưởng đến kết luận</a><a class="button secondary" href="${followupPath}muse_remaining_prompt.md" download>Yêu cầu thu thập thêm</a>`;
  statuses();draw();navigate();
})();
