'use strict';
(()=>{
 const w=window.HYPOTHESIS_DATA;
 const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const pct=(n,d)=>new Intl.NumberFormat('vi-VN',{maximumFractionDigits:1}).format(n/d*100)+'%';
 const link=id=>`<a href="#wave-record-${escape(id)}">${escape(id)}</a>`;
 const bars=(rows,n)=>`<div class="wave-bars" role="group">${rows.map((r,i)=>`<a class="wave-bar" href="#wave-data" data-wave-set="${escape(r.set)}" data-wave-group="${escape(r.group||'')}" aria-label="${escape(r.label)}: ${r.count}${n?'/'+n:''}"><span>${escape(r.label)}</span><div class="wave-track"><i style="width:${Math.min(100,r.count/(n||Math.max(...rows.map(v=>v.count)))*100)}%;--bar-color:${['#245ba6','#15806e','#8754ad','#bc7131','#637185','#b44658'][i%6]}"></i></div><b>${r.count}${n?` / ${n}<small>${pct(r.count,n)}</small>`:''}</b></a>`).join('')}</div>`;
 document.getElementById('wave-stats').innerHTML=[['112','JD gốc · 111 vào mẫu'],['115','dòng evidence / tổng hợp'],['54','review · 42 text trong phạm vi'],['164','dòng thảo luận / lời kể']].map(([n,t])=>`<div><strong>${n}</strong><span>${t}</span></div>`).join('');
 document.getElementById('wave-jd-chart').innerHTML=bars([...w.stats.jd].sort((a,b)=>b.count-a.count).map(x=>({...x,set:'jd',group:x.key})),111);
 document.getElementById('wave-ai-chart').innerHTML=bars([...w.stats.behavior].sort((a,b)=>b.count-a.count).map(x=>({...x,set:'voices',group:x.label})),75);
 document.getElementById('wave-review-chart').innerHTML=bars([{label:'Text trong phạm vi, chưa thấy dấu hiệu rõ',count:26,set:'reviews',group:'eligible-clear'},{label:'Text trong phạm vi, kênh thương mại / nghi seeding',count:16,set:'reviews',group:'eligible-commercial'},{label:'Bối cảnh / không đủ text / lệch cột',count:12,set:'reviews',group:'excluded'}],54);
 document.getElementById('wave-output-chart').innerHTML=bars([{label:'Kể đã tạo đầu ra / đã áp dụng',count:12,set:'reviews',group:'actual'},{label:'Kiến thức / khen / kỳ vọng chung',count:29,set:'reviews',group:'general'},{label:'Nội dung trùng tự học',count:1,set:'reviews',group:'overlap'}],42);
 const adjust={budget:'Loại nhãn ngân sách ở JD-013, JD-048.',kpi:'JD-103 là KPI nhân viên, không đo lường marketing.',optimization:'11 quote rộng về sản phẩm, quy trình, lợi nhuận hoặc chiến lược; xem nhật ký từng JD.',agency:'JD-020 là kinh nghiệm làm trong agency, không quản lý agency.'};
 document.getElementById('wave-jd-compare').innerHTML=w.stats.jd.map(x=>`<tr><td>${escape(x.label)}</td><td>${x.raw}/112 (${pct(x.raw,112)})</td><td>${x.count}/111 (${pct(x.count,111)})</td><td>${adjust[x.key]}</td></tr>`).join('');
 document.getElementById('wave-role-matrix').innerHTML=w.stats.roles.map(x=>`<tr><td>${escape(x.role)}</td><td>${x.n}</td>${['budget','kpi','optimization','agency'].map(k=>`<td>${x.metrics[k]}/${x.n}<small>${pct(x.metrics[k],x.n)}</small></td>`).join('')}</tr>`).join('');
 document.getElementById('wave-audit-body').innerHTML=w.issues.map(x=>`<tr><td>${escape(x.item)}</td><td>${escape(x.decision)}</td><td>${escape(x.reason)}</td></tr>`).join('');
 const rawBase='research/muse/2026-10-11/raw/';
 document.getElementById('wave-downloads').innerHTML=Object.keys(w.originalHashes).map(n=>`<a class="button secondary" download href="${rawBase+encodeURIComponent(n.replace('hypothesis_review (1).md','hypothesis_review_copy.md'))}">${escape(n)}</a>`).join('')+'<a class="button secondary" download href="research/muse/2026-10-11/reviewed.json">Dữ liệu đã phân loại + quyết định sử dụng</a>';
 const ds=document.getElementById('wave-dataset'), group=document.getElementById('wave-group'), search=document.getElementById('wave-search');let page=0;const size=25;
 const human={evidence:'Evidence / tham chiếu',jd:'Yêu cầu tuyển dụng',reviews:'Trải nghiệm khóa học',voices:'Thảo luận / lời kể',opportunities:'So sánh bài toán'};
 function options(){
 let opts=[];
 if(ds.value==='jd')opts=[['eligible','Mẫu đã phân loại'],['excluded','Tin ngoài mẫu'],...w.stats.jd.map(x=>[x.key,x.label])];
 else if(ds.value==='reviews')opts=[['eligible-clear','Trong phạm vi, chưa thấy dấu hiệu rõ'],['eligible-commercial','Trong phạm vi, nguồn thương mại / nghi seeding'],['actual','Kể đã tạo đầu ra'],['general','Khen / kiến thức / kỳ vọng'],['overlap','Nội dung trùng tự học'],['excluded','Bối cảnh / không đủ text / lệch cột']];
 else if(ds.value==='voices')opts=[...new Set(w.voices.map(x=>x.behavior))].map(v=>[v,v]);
 else if(ds.value==='evidence')opts=[...new Set(w.evidence.map(x=>x.group))].map(v=>[v,v]);
 group.innerHTML='<option value="">Tất cả nhóm</option>'+opts.map(([v,t])=>`<option value="${escape(v)}">${escape(t)}</option>`).join('');
 }
 function matches(x){
 const g=group.value;if(g){
 if(ds.value==='jd'){if(g==='eligible'&&!x.eligible)return false;if(g==='excluded'&&x.eligible)return false;if(x.reviewed[g]!==undefined&&(!x.eligible||!x.reviewed[g]))return false;}
 else if(ds.value==='reviews'){
 const tests={'eligible-clear':x.eligible&&!x.commercial,'eligible-commercial':x.eligible&&x.commercial,actual:x.eligible&&x.outcome==='Kể đã áp dụng / tạo đầu ra',general:x.eligible&&x.outcome==='Khen / kiến thức / kỳ vọng chung',overlap:x.eligible&&x.id==='KT-003',excluded:!x.eligible};if(!tests[g])return false;
 }else if(ds.value==='voices'){if(x.behavior!==g)return false;}else if(x.group!==g)return false;
 }
 const q=search.value.trim().toLocaleLowerCase('vi');return !q||JSON.stringify(x).toLocaleLowerCase('vi').includes(q);
 }
 const excludedFields=new Set(['id','group','urls','eligible','reviewed','reviewNotes','commercial','outcome','payment','quality','behavior']);
 function original(x){return `<details><summary>Toàn bộ trường gốc &amp; phân loại</summary><dl class="wave-fields">${Object.entries(x).filter(([k])=>!excludedFields.has(k)).map(([k,v])=>`<dt>${escape(k)}</dt><dd>${escape(typeof v==='object'?JSON.stringify(v):v)}</dd>`).join('')}</dl></details>`;}
 function row(x){
 let title,body,meta,quality;
 if(ds.value==='jd'){title=x.title;body=Object.entries(x.reviewed).filter(([,v])=>v).map(([k])=>w.stats.jd.find(t=>t.key===k).label).join(' · ')||'Chưa có quote đủ rõ cho bốn nhãn';meta=`${x.company} · ${x.platform} · ${x.role_type} · ${x.seniority}`;quality=x.eligible?'Trong mẫu 111':'Ngoài mẫu: intern';}
 else if(ds.value==='reviews'){title=x.course_name;body=x.excerpt;meta=`${x.platform} · ${x.posted_date||'Không rõ ngày'} · ${x.payment}`;quality=x.eligible?x.quality:'Không dùng trong chart Category';}
 else if(ds.value==='voices'){title=x.person_role;body=x.excerpt;meta=`${x.platform} · ${x.hypothesis_id} · ${x.behavior}`;quality=x.eligible?x.quality:'Trùng lời kể, không tính độc lập mới';}
 else if(ds.value==='opportunities'){title=x['vấn đề được kể'];body=x['điểm chưa đáp ứng'];meta=x['phương án đang dùng'];quality='Bảng tổng hợp Muse; không phải một người / một giao dịch';}
 else{title=x['bài toán'];body=x['hành vi liên quan đào tạo'];meta=`${x['loại nguồn']} · ${x['ngày đăng']||'Không rõ ngày'} · ${x.hypothesis_id}`;quality=x['mức độc lập với nhà cung cấp'];}
 const limits=x['giới hạn']||x.limitation||'';
 return `<tr id="wave-record-${escape(x.id)}" tabindex="-1"><td><b>${escape(x.id)}</b><small>${escape(x.group)}</small></td><td><b>${escape(title)}</b><p>${escape(body)}</p><small>${escape(meta)}</small></td><td>${escape(quality)}<small>${escape(limits)}</small>${x.reviewNotes?.length?`<p class="wave-note">${escape(x.reviewNotes.join(' '))}</p>`:''}</td><td>${ds.value==='opportunities'?(x.evidence_ids.match(/HTE-\\d+/g)||[]).map(link).join(' · ')+'<br>':''}${x.urls.map((u,i)=>`<a href="${escape(u)}" target="_blank" rel="noopener">Nguồn ${i+1}</a>`).join(' · ')||'<span class="caption">Không có URL riêng hợp lệ</span>'}${original(x)}</td></tr>`;
 }
 function render(){const rows=w[ds.value].filter(matches);const max=Math.max(0,Math.ceil(rows.length/size)-1);page=Math.min(page,max);document.getElementById('wave-data-body').innerHTML=rows.slice(page*size,(page+1)*size).map(row).join('')||'<tr><td colspan="4">Không có dòng phù hợp.</td></tr>';document.getElementById('wave-count').textContent=`${rows.length} / ${w[ds.value].length} dòng · ${human[ds.value]} · số dòng, không phải số người độc lập`;document.getElementById('wave-page').textContent=`Trang ${page+1} / ${max+1}`;document.getElementById('wave-prev').disabled=page===0;document.getElementById('wave-next').disabled=page>=max;}
 function setData(set,g=''){ds.value=set;options();group.value=g;search.value='';page=0;render();}
 function reveal(hash){if(!hash.startsWith('#wave-record-'))return;const id=decodeURIComponent(hash.slice('#wave-record-'.length));const set=['evidence','jd','reviews','voices','opportunities'].find(k=>w[k].some(x=>x.id===id));if(!set)return;setData(set);search.value=id;render();const target=document.getElementById('wave-record-'+id);if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'auto'}));}
 ds.addEventListener('change',()=>{options();page=0;render();});group.addEventListener('change',()=>{page=0;render();});search.addEventListener('input',()=>{page=0;render();});document.getElementById('wave-reset').addEventListener('click',()=>setData(ds.value));document.getElementById('wave-prev').addEventListener('click',()=>{page--;render();});document.getElementById('wave-next').addEventListener('click',()=>{page++;render();});
 document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;if(a.dataset.waveSet)setData(a.dataset.waveSet,a.dataset.waveGroup||'');const href=a.getAttribute('href')||'';if(href.startsWith('#wave-record-'))reveal(href);});window.addEventListener('hashchange',()=>reveal(location.hash));options();render();reveal(location.hash);
})();
