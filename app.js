'use strict';
const data = window.RESEARCH;
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceMap = Object.fromEntries(data.sources.map(s => [s.id, s]));
const format = n => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(n);
const trends = data.trends;
const trendColors = ['#2657a5','#c05b21','#00836f','#8b57ab','#cf3657'];
const trendMonths = trends.time.filter(r => r.date >= trends.analysisStart && r.date <= trends.analysisEnd);
const trendSelected = new Set(trends.terms.map((_,i)=>i));
const signed = n => `${n > 0 ? '+' : ''}${new Intl.NumberFormat('vi-VN',{maximumFractionDigits:1}).format(n)}%`;
document.getElementById('trends-controls').innerHTML = trends.terms.map((term,i)=>`<label style="--series-color:${trendColors[i]}"><input type="checkbox" data-series="${i}" checked><span>${esc(term)}</span></label>`).join('');
function drawTrends(){
  const W=1100,H=360,left=48,right=22,top=20,bottom=48,pw=W-left-right,ph=H-top-bottom;
  const x=i=>left+i/(trendMonths.length-1)*pw;
  const y=v=>top+(100-v)/100*ph;
  const grid=[0,25,50,75,100].map(v=>`<line x1="${left}" y1="${y(v)}" x2="${W-right}" y2="${y(v)}" stroke="#e0e7f0"/><text x="${left-12}" y="${y(v)+4}" text-anchor="end">${v}</text>`).join('');
  const ticks=[0,6,12,18,24,30,35].map(i=>`<text x="${x(i)}" y="${H-17}" text-anchor="middle">${trendMonths[i].date.slice(5,7)}/${trendMonths[i].date.slice(0,4)}</text>`).join('');
  const lines=[...trendSelected].map(i=>`<polyline points="${trendMonths.map((r,n)=>`${x(n)},${y(r.values[i])}`).join(' ')}" fill="none" stroke="${trendColors[i]}" stroke-width="2.6"/>${trendMonths.map((r,n)=>`<circle cx="${x(n)}" cy="${y(r.values[i])}" r="3" fill="${trendColors[i]}"><title>${esc(trends.terms[i])} · ${r.date.slice(0,7)}: ${r.values[i]}</title></circle>`).join('')}`).join('');
  document.getElementById('trends-chart').innerHTML = trendSelected.size ? `<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="trends-title trends-desc"><title id="trends-title">Quan tâm tìm kiếm của ${trendSelected.size} từ khóa trên thang 0–100</title><desc id="trends-desc">36 tháng từ 10/2023 đến 09/2026. ${esc([...trendSelected].map(i=>`${trends.terms[i]}: ${signed(trends.summary[i].change)} biến động trung bình 12 tháng`).join('; '))}. Chi tiết từng tháng có trong bảng dữ liệu gốc.</desc>${grid}${ticks}${lines}</svg>` : '<p class="empty" role="status">Chọn ít nhất một từ khóa để hiển thị biểu đồ.</p>';
}
document.querySelectorAll('[data-series]').forEach(input=>input.addEventListener('change',()=>{const i=Number(input.dataset.series);input.checked?trendSelected.add(i):trendSelected.delete(i);drawTrends();}));
drawTrends();
document.getElementById('trends-summary').innerHTML = trends.summary.map((r,i)=>`<tr><td><span class="series-dot" style="background:${trendColors[i]}"></span><b>${esc(r.term)}</b></td>${r.means.map(m=>`<td>${format(m)}</td>`).join('')}<td><b>${signed(r.change)}</b></td></tr>`).join('');
const trendHeader = first=>`<tr><th>${first}</th>${trends.terms.map(t=>`<th>${esc(t)}</th>`).join('')}</tr>`;
document.getElementById('trends-time-head').innerHTML = trendHeader('Tháng');
document.getElementById('trends-time-body').innerHTML = trends.time.map(r=>`<tr><td>${r.date.slice(5,7)}/${r.date.slice(0,4)}${trends.excludedDates.includes(r.date)?'<small>Ngoài kỳ phân tích</small>':''}</td>${r.values.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('');
document.getElementById('trends-region-head').innerHTML = trendHeader('Địa phương');
document.getElementById('trends-region-body').innerHTML = trends.regions.map(r=>`<tr><td>${esc(r.region)}</td>${r.values.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('');
['top','rising'].forEach(key=>{document.getElementById(`trends-${key}-body`).innerHTML=trends[key].map(r=>`<tr><td>${esc(r.query)}</td><td>${r.interest}</td><td>${esc(r.increase)}</td></tr>`).join('');});
const trendFileLabels={time:'CSV · chuỗi tháng (37)',region:'CSV · địa phương (63)',top:'CSV · Top (50)',rising:'CSV · Rising (50)'};
document.getElementById('trends-downloads').innerHTML=trends.files.map(f=>`<a class="button secondary" href="${esc(f.path)}" download>${trendFileLabels[f.kind]}</a>`).join('')+'<a class="button secondary" href="research/google-trends/analysis.json" download>JSON · dữ liệu & cách tính</a>';
const individual = data.individualTrends;
function drawIndividualChanges(){
  const bars=individual.map((r,i)=>`<div class="change-row"><a href="#fact-E${33+i}">${esc(r.term)}</a><div class="change-track"><span class="change-zero"></span><span class="change-fill ${r.change>0?'positive':'negative'}" style="left:${r.change>0?25:25+r.change/2}%;width:${Math.abs(r.change)/2}%"></span></div><b>${signed(r.change)}</b></div>`).join('');
  document.getElementById('single-change-chart').innerHTML=`<h4 id="changes-title">Biến động chỉ số tìm kiếm · năm từ khóa</h4><p class="caption">Trung bình 10/2025–09/2026 so với 10/2024–09/2025</p><p class="sr-only" id="changes-desc">${esc(individual.map(r=>`${r.term}: ${signed(r.change)}`).join('; '))}. Các bộ xuất riêng có thang chuẩn hóa riêng; chỉ đối chiếu mức thay đổi theo thời gian trong từng từ khóa.</p><div class="change-bars">${bars}<div class="change-scale"><span>−50%</span><span>0%</span><span>+50%</span><span>+100%</span><span>+150%</span></div></div>`;
}
drawIndividualChanges();
const intentExamples=[
  {index:0,queries:['đại học marketing','đại học tài chính marketing'],note:'Có ý định tìm hiểu đại học/tuyển sinh',ref:'Q09'},
  {index:4,queries:['ai marketing tools','ai marketing news','claude ai'],note:'Có công cụ, tin tức và mô hình AI',ref:'Q12'},
  {index:3,queries:['chiến lược marketing','sách digital marketing'],note:'Có kiến thức và sách; chưa tách ý định mua khóa',ref:'Q13'}
];
document.getElementById('intent-preview').innerHTML=intentExamples.map(e=>{const r=individual[e.index];const found=e.queries.filter(q=>[...r.top,...r.rising].some(v=>v.query===q));return `<tr><td><b>${esc(r.term)}</b><small><a href="#source-${r.source}">${r.source}</a></small></td><td>${found.map(q=>`<span class="query-term">${esc(q)}</span>`).join('')}</td><td>${esc(e.note)}<small><a href="#fact-${e.ref}">${e.ref}</a></small></td></tr>`;}).join('');
document.getElementById('single-summary').innerHTML=individual.map(r=>`<tr><td><b>${esc(r.term)}</b><small><a href="#source-${esc(r.source)}">${esc(r.source)}</a></small></td>${r.means.map(v=>`<td>${format(v)}</td>`).join('')}<td><b>${signed(r.change)}</b></td></tr>`).join('');
const singleSelect=document.getElementById('single-term');
singleSelect.innerHTML=individual.map((r,i)=>`<option value="${i}">${esc(r.term)}</option>`).join('');
function renderSingle(){
  const r=individual[Number(singleSelect.value)];
  const months=r.time.filter(m=>m.date>=r.config.start && m.date<=r.config.end);
  document.getElementById('single-config').textContent=`${r.term} · ${r.config.geography} · 10/2023–09/2026 · ${r.config.category} · ${r.config.searchType} · ${r.config.queryType}. ${r.verification}`;
  const W=1100,H=300,L=48,R=22,T=20,B=40,pw=W-L-R,ph=H-T-B;
  const x=i=>L+i/(months.length-1)*pw,y=v=>T+(100-v)/100*ph;
  const grid=[0,25,50,75,100].map(v=>`<line x1="${L}" y1="${y(v)}" x2="${W-R}" y2="${y(v)}" stroke="#e0e7f0"/><text x="${L-12}" y="${y(v)+4}" text-anchor="end">${v}</text>`).join('');
  const ticks=[0,6,12,18,24,30,35].map(i=>`<text x="${x(i)}" y="${H-12}" text-anchor="middle">${months[i].date.slice(5,7)}/${months[i].date.slice(0,4)}</text>`).join('');
  document.getElementById('single-chart').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="single-chart-title single-chart-desc"><title id="single-chart-title">${esc(r.term)} · chỉ số 36 tháng · thang chuẩn hóa riêng</title><desc id="single-chart-desc">Biến động trung bình 12 tháng ${signed(r.change)}. Chi tiết trong bảng dữ liệu gốc.</desc>${grid}${ticks}<polyline points="${months.map((m,i)=>`${x(i)},${y(m.value)}`).join(' ')}" fill="none" stroke="#2657a5" stroke-width="2.6"/>${months.map((m,i)=>`<circle cx="${x(i)}" cy="${y(m.value)}" r="3" fill="#2657a5"><title>${m.date.slice(0,7)}: ${m.value}</title></circle>`).join('')}</svg>`;
  const labels={time:'Chuỗi tháng',region:'Địa phương',top:'Top',rising:'Rising'};
  document.getElementById('single-files').innerHTML=r.files.map(f=>`<a href="${esc(f.path)}" download class="button secondary">CSV · ${labels[f.kind]} (${f.rows})</a>`).join('');
  chart('single-region-chart',[...r.regions].sort((a,b)=>b.value-a.value).slice(0,5).map(v=>({metric:v.region,value:v.value})),100,'');
  const negative=r.rising.filter(v=>v.increase.startsWith('-')).length;
  document.getElementById('single-quality').textContent=`Xuất ${r.exported}; ${r.time.length} tháng gốc, ${months.length} tháng phân tích; ${r.regions.length} địa phương; Top ${r.top.length} dòng, Rising ${r.rising.length} dòng. ${negative} dòng Rising có giá trị thay đổi âm. Các dòng vắng mặt chưa được quy thành 0.`;
  document.getElementById('single-time').innerHTML=r.time.map(m=>`<tr><td>${m.date.slice(5,7)}/${m.date.slice(0,4)}${m.date<r.config.start?'<small>Ngoài kỳ phân tích</small>':''}</td><td>${m.value}</td></tr>`).join('');
  document.getElementById('single-regions').innerHTML=r.regions.map(m=>`<tr><td>${esc(m.region)}</td><td>${m.value}</td></tr>`).join('');
  ['top','rising'].forEach(key=>{document.getElementById(`single-${key}`).innerHTML=r[key].map(q=>`<tr><td>${esc(q.query)}</td><td>${q.interest}</td><td>${esc(q.increase)}</td></tr>`).join('');});
}
singleSelect.addEventListener('change',renderSingle);
renderSingle();
function chart(target, rows, max = 100, unit = '%') {
  const el = document.getElementById(target);
  el.innerHTML = `<div class="bars" role="img" aria-label="${esc(rows.map(r => `${r.metric}: ${format(r.value)}${unit}`).join('; '))}">${rows.map(r => `<div class="bar-row"><span>${esc(r.metric)}</span><div class="bar-track"><div class="bar-fill" style="--bar-width:${Math.max(0,Math.min(100,r.value/max*100))}%"></div></div><span class="bar-value">${format(r.value)}${unit}</span></div>`).join('')}<div class="chart-axis"><span>0${unit}</span><span>${format(max/2)}${unit}</span><span>${format(max)}${unit}</span></div></div>`;
}
chart('skills-chart', data.evidence.filter(e => e.group === 'Nhu cầu kỹ năng'));
chart('learning-chart', data.evidence.filter(e => e.group === 'Nguồn học tập'));
chart('training-chart', data.evidence.filter(e => e.group === 'Đào tạo doanh nghiệp' && e.source === 'S01'));
document.getElementById('price-chart').innerHTML = `<div class="benchmark-bars" role="group" aria-label="Học phí các chương trình tham chiếu, đơn vị triệu đồng">${data.muse.priceBenchmarks.map((r,i)=>`<div class="benchmark-row ${i<3?'self-paced':'instructor-led'}"><a href="#fact-${esc(r.fact)}">${i<3?'BRAND Camp · ':''}${esc(r.label)}<small>${esc(r.format)}</small></a><div class="benchmark-track"><span style="width:${r.value/10*100}%"></span></div><b>${new Intl.NumberFormat('vi-VN',{maximumFractionDigits:3}).format(r.value)}</b></div>`).join('')}<div class="benchmark-axis"><span>0</span><span>5</span><span>10 triệu</span></div></div>`;
document.getElementById('learner-cases').innerHTML=data.muse.reviewedVoices.map(v=>`<tr><td><b>${esc(v.role)}</b><small>${esc(v.context)}</small></td><td>${esc(v.task)}<small>${esc(v.signal)}</small></td><td><a href="#fact-${esc(v.fact)}">${esc(v.fact)}</a><small>${esc(v.rawId)}</small></td></tr>`).join('');
document.getElementById('voice-curation').innerHTML=`<div class="curation-bar" role="img" aria-label="22 lời kể: 20 do nhà cung cấp tuyển chọn, 1 không do nhà cung cấp tuyển chọn, 1 chưa rõ"><span class="curated" style="width:${20/22*100}%">20 / 22 được tuyển chọn</span><span class="independent" style="width:${1/22*100}%" title="1 không do nhà cung cấp tuyển chọn"></span><span class="unknown" style="width:${1/22*100}%" title="1 chưa rõ"></span></div><div class="curation-legend"><span><i class="curated"></i>Nhà cung cấp tuyển chọn · 20</span><span><i class="independent"></i>Không do nhà cung cấp tuyển chọn · 1</span><span><i class="unknown"></i>Chưa rõ · 1</span></div>`;
const publicCategory=data.publicCategory;
document.getElementById('public-questions').innerHTML=publicCategory.questions.map(q=>`<tr><td>${esc(q.question)}</td><td><span class="pill blue">${esc(q.status)}</span><p>${esc(q.answer)}</p></td><td>${esc(q.basis)}<p><a href="${esc(q.href)}">Xem bằng chứng</a></p></td></tr>`).join('');
document.getElementById('public-opportunities').innerHTML=publicCategory.opportunities.map(o=>`<tr><td><b>${esc(o.direction)}</b></td><td>${esc(o.job)}</td><td>${esc(o.evidence)}<small><a href="#source-${esc(o.source)}">${esc(o.source)}</a>${o.extraSource?` · <a href="#source-${esc(o.extraSource)}">${esc(o.extraSource)}</a>`:''}</small></td><td>${esc(o.level)}</td></tr>`).join('');
document.getElementById('public-review').innerHTML=publicCategory.reviewDecisions.map(r=>`<tr><td>${esc(r.item)}</td><td><span class="pill outline">${esc(r.decision)}</span></td><td>${esc(r.use)}${r.source?`<small><a href="#source-${esc(r.source)}">${esc(r.source)}</a></small>`:''}</td><td>${esc(r.limit)}</td></tr>`).join('');
const programSearch=document.getElementById('public-program-search');
const programKind=document.getElementById('public-program-kind');
programKind.innerHTML+=[...new Set(publicCategory.programs.map(p=>p.kind))].map(k=>`<option value="${esc(k)}">${esc(k)}</option>`).join('');
function renderPublicPrograms(){
 const query=normalize(programSearch.value.trim());
 const rows=publicCategory.programs.filter(p=>(!programKind.value||p.kind===programKind.value)&&normalize([p.rawId,p.provider,p.name].join(' ')).includes(query));
 document.getElementById('public-program-body').innerHTML=rows.length?rows.map(p=>`<tr><td>${esc(p.rawId)}<small>${esc(p.provider)}</small></td><td>${p.url?`<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a>`:esc(p.name)}<small>${esc(p.format)}</small></td><td>${esc(p.kind)}<small>${esc(p.payment)}</small></td><td>${p.listedPrice?`Niêm yết: ${esc(p.listedPrice)} ${esc(p.currency)}<br>`:''}${p.promotionalPrice?`Ưu đãi: ${esc(p.promotionalPrice)} ${esc(p.currency)}<br>`:''}${esc(p.conditions)||'Không công bố trong dòng dữ liệu'}</td><td>${esc(p.note)}</td></tr>`).join(''):'<tr><td colspan="5" class="empty">Không có mục khớp bộ lọc.</td></tr>';
 document.getElementById('public-program-count').textContent=`${rows.length} / ${publicCategory.programs.length} mục`;
}
programSearch.addEventListener('input',renderPublicPrograms);programKind.addEventListener('change',renderPublicPrograms);renderPublicPrograms();
document.getElementById('muse-review').innerHTML=data.muse.reviewDecisions.map(r=>`<tr><td>${esc(r.item)}</td><td><span class="pill outline">${esc(r.decision)}</span></td><td>${esc(r.use)}</td><td>${esc(r.limit)}</td></tr>`).join('');
document.getElementById('muse-programs').innerHTML=data.muse.programs.map(p=>`<tr><td>${esc(p.rawId)}<small>${esc(p.provider)}</small></td><td><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a></td><td>${esc(p.review)}</td><td>${esc(p.verified)||'Chưa dùng để lập luận'}</td></tr>`).join('');
document.getElementById('sources').innerHTML = data.sources.map(s => `<article id="source-${esc(s.id)}" class="source-item"><h4><span>${esc(s.id)}</span> ${esc(s.title)}</h4><p><b>${esc(s.publisher)}</b> · ${esc(s.type)}</p><p>${esc(s.period)} · ${esc(s.scope)}</p><p><b>Vị trí:</b> ${esc(s.locator)}</p><p><b>Giới hạn:</b> ${esc(s.limit)}</p><a href="${esc(s.url)}" target="_blank" rel="noopener">Đọc nguồn tham chiếu</a></article>`).join('');
document.getElementById('qual-body').innerHTML = data.qualitative.map(q => `<tr id="fact-${esc(q.id)}" tabindex="-1"><td>${esc(q.id)}</td><td>${esc(q.finding)}</td><td><a href="#source-${esc(q.source)}">${esc(q.source)}</a></td></tr>`).join('');
document.getElementById('gaps-body').innerHTML = data.gaps.map(g => `<tr><td><b>${esc(g.question)}</b></td><td><span class="pill amber">${esc(g.status)}</span></td><td>${esc(g.need)}</td><td>${esc(g.method)}</td></tr>`).join('');
document.getElementById('source-count').textContent = `· ${data.sources.length} nguồn`;
document.getElementById('footer-count').textContent = `${data.evidence.length} dữ kiện định lượng · ${data.qualitative.length} quan sát định tính · ${data.sources.length} nguồn`;
const groupFilter = document.getElementById('group-filter');
const sourceFilter = document.getElementById('source-filter');
const search = document.getElementById('search');
groupFilter.innerHTML += [...new Set(data.evidence.map(e => e.group))].map(g => `<option value="${esc(g)}">${esc(g)}</option>`).join('');
sourceFilter.innerHTML += data.sources.filter(s=>data.evidence.some(e=>e.source===s.id)).map(s=>`<option value="${esc(s.id)}">${esc(s.id)} · ${esc(s.publisher)}</option>`).join('');
function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();}
function renderEvidence(){
  const query = normalize(search.value.trim());
  const rows = data.evidence.filter(e => (!groupFilter.value || e.group === groupFilter.value) && (!sourceFilter.value || e.source === sourceFilter.value) && normalize([e.id,e.metric,e.group,e.value,e.unit,e.source,sourceMap[e.source].publisher,sourceMap[e.source].scope].join(' ')).includes(query));
  document.getElementById('evidence-body').innerHTML = rows.length ? rows.map(e => {const s=sourceMap[e.source];return `<tr id="fact-${esc(e.id)}" tabindex="-1"><td>${esc(e.id)}</td><td>${esc(e.group)}</td><td>${esc(e.metric)}</td><td>${format(e.value)} ${esc(e.unit)}</td><td>${esc(s.period)}<small>${esc(s.scope)}</small></td><td><a href="#source-${esc(s.id)}">${esc(s.id)}</a><small>${esc(e.location)}</small></td></tr>`;}).join('') : '<tr><td colspan="6" class="empty">Không có dữ kiện khớp bộ lọc. Điều chỉnh từ khóa hoặc chọn tất cả nhóm.</td></tr>';
  document.getElementById('evidence-count').textContent = `${rows.length} / ${data.evidence.length} dữ kiện`;
}
[search,groupFilter,sourceFilter].forEach(el => el.addEventListener(el === search ? 'input' : 'change', renderEvidence));
renderEvidence();
function csvCell(v){return '"'+String(v??'').replace(/"/g,'""')+'"';}
function buildCSV(){
  const headers=['Mã','Loại','Nhóm','Dữ kiện','Giá trị','Đơn vị','Nguồn','Nhà xuất bản','URL','Thời kỳ','Phạm vi','Vị trí','Giới hạn','Ngày đối chiếu'];
  const rows=[...data.evidence.map(e=>{const s=sourceMap[e.source];return[e.id,'Định lượng',e.group,e.metric,e.value,e.unit,s.id,s.publisher,s.url,s.period,s.scope,e.location,s.limit,data.updated];}),...data.qualitative.map(q=>{const s=sourceMap[q.source];return[q.id,'Định tính','Quan sát',q.finding,'','',s.id,s.publisher,s.url,s.period,s.scope,s.locator,s.limit,data.updated];})];
  return '\ufeff'+[headers,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n');
}
document.getElementById('download-csv').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([buildCSV()],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='Marketing_in_Action_Category_Evidence_2026-10-08.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.getElementById('print').addEventListener('click',()=>window.print());
const navLinks=[...document.querySelectorAll('.sidebar nav a')];
const observer=new IntersectionObserver(entries=>{const seen=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(seen[0])navLinks.forEach(a=>a.classList.toggle('selected',a.getAttribute('href')==='#'+seen[0].target.id));},{rootMargin:'-10% 0px -65% 0px',threshold:0});
document.querySelectorAll('main>section').forEach(s=>observer.observe(s));
navLinks[0].classList.add('selected');

// A source or fact link opens every enclosing disclosure before scrolling.
// Fact links remain usable after the appendix has been filtered.
function revealReference(hash){
  if(!hash || hash==='#')return;
  const id=decodeURIComponent(hash.slice(1));
  if(id.startsWith('fact-E') && !document.getElementById(id)){
    search.value='';groupFilter.value='';sourceFilter.value='';renderEvidence();
  }
  const target=document.getElementById(id);
  if(!target)return;
  for(let node=target.parentElement;node;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;
  requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'auto'}));
}
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  if(!link)return;
  const hash=link.getAttribute('href');
  revealReference(hash);
});
window.addEventListener('hashchange',()=>revealReference(location.hash));
revealReference(location.hash);
window.addEventListener('beforeprint',()=>{
  document.querySelectorAll('.calculation').forEach(detail=>{detail.dataset.printOpen=String(detail.open);detail.open=true;});
});
window.addEventListener('afterprint',()=>{
  document.querySelectorAll('.calculation').forEach(detail=>{detail.open=detail.dataset.printOpen==='true';delete detail.dataset.printOpen;});
});
