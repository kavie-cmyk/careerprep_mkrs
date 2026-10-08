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
function chart(target, rows, max = 100, unit = '%') {
  const el = document.getElementById(target);
  el.innerHTML = `<div class="bars" role="img" aria-label="${esc(rows.map(r => `${r.metric}: ${format(r.value)}${unit}`).join('; '))}">${rows.map(r => `<div class="bar-row"><span>${esc(r.metric)}</span><div class="bar-track"><div class="bar-fill" style="--bar-width:${Math.max(0,Math.min(100,r.value/max*100))}%"></div></div><span class="bar-value">${format(r.value)}${unit}</span></div>`).join('')}<div class="chart-axis"><span>0${unit}</span><span>${format(max/2)}${unit}</span><span>${format(max)}${unit}</span></div></div>`;
}
chart('skills-chart', data.evidence.filter(e => e.group === 'Nhu cầu kỹ năng'));
chart('learning-chart', data.evidence.filter(e => e.group === 'Nguồn học tập'));
chart('training-chart', data.evidence.filter(e => e.group === 'Đào tạo doanh nghiệp' && e.source === 'S01'));
document.getElementById('price-chart').innerHTML = '<div class="price-groups"><div class="price-group"><h4>HNAAu · Foundation</h4><p>12 buổi · hai hình thức học</p><div id="price-hnaau"></div></div><div class="price-group"><h4>TM · Performance with AI</h4><p>10 buổi · Live-learning qua Zoom</p><div id="price-tm"></div></div></div>';
chart('price-hnaau', [{metric:'Trực tuyến',value:4},{metric:'Trực tiếp',value:5}],10,'');
chart('price-tm', [{metric:'Early bird',value:6.21},{metric:'Niêm yết',value:8.91}],10,'');
document.getElementById('sources').innerHTML = data.sources.map(s => `<article id="source-${esc(s.id)}" class="source-item"><h4><span>${esc(s.id)}</span> ${esc(s.title)}</h4><p><b>${esc(s.publisher)}</b> · ${esc(s.type)}</p><p>${esc(s.period)} · ${esc(s.scope)}</p><p><b>Vị trí:</b> ${esc(s.locator)}</p><p><b>Giới hạn:</b> ${esc(s.limit)}</p><a href="${esc(s.url)}" target="_blank" rel="noopener">Đọc nguồn gốc</a></article>`).join('');
document.getElementById('qual-body').innerHTML = data.qualitative.map(q => `<tr><td>${esc(q.id)}</td><td>${esc(q.finding)}</td><td><a href="#source-${esc(q.source)}">${esc(q.source)}</a></td></tr>`).join('');
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
  document.getElementById('evidence-body').innerHTML = rows.length ? rows.map(e => {const s=sourceMap[e.source];return `<tr><td>${esc(e.id)}</td><td>${esc(e.group)}</td><td>${esc(e.metric)}</td><td>${format(e.value)} ${esc(e.unit)}</td><td>${esc(s.period)}<small>${esc(s.scope)}</small></td><td><a href="#source-${esc(s.id)}">${esc(s.id)}</a><small>${esc(e.location)}</small></td></tr>`;}).join('') : '<tr><td colspan="6" class="empty">Không có dữ kiện khớp bộ lọc. Điều chỉnh từ khóa hoặc chọn tất cả nhóm.</td></tr>';
  document.getElementById('evidence-count').textContent = `${rows.length} / ${data.evidence.length} dữ kiện`;
}
[search,groupFilter,sourceFilter].forEach(el => el.addEventListener(el === search ? 'input' : 'change', renderEvidence));
renderEvidence();
function csvCell(v){return '"'+String(v??'').replace(/"/g,'""')+'"';}
function buildCSV(){
  const headers=['Mã','Loại','Nhóm','Dữ kiện','Giá trị','Đơn vị','Nguồn','Nhà xuất bản','URL','Thời kỳ','Phạm vi','Vị trí','Giới hạn','Ngày đối chiếu'];
  const rows=[...data.evidence.map(e=>{const s=sourceMap[e.source];return[e.id,'Định lượng',e.group,e.metric,e.value,e.unit,s.id,s.publisher,s.url,s.period,s.scope,e.location,s.limit,data.updated];}),...data.qualitative.map(q=>{const s=sourceMap[q.source];return[q.id,'Định tính','Nguồn cung',q.finding,'','',s.id,s.publisher,s.url,s.period,s.scope,s.locator,s.limit,data.updated];})];
  return '\ufeff'+[headers,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n');
}
document.getElementById('download-csv').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([buildCSV()],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='Marketing_in_Action_Category_Evidence_2026-10-08.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.getElementById('print').addEventListener('click',()=>window.print());
const navLinks=[...document.querySelectorAll('.sidebar nav a')];
const observer=new IntersectionObserver(entries=>{const seen=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(seen[0])navLinks.forEach(a=>a.classList.toggle('selected',a.getAttribute('href')==='#'+seen[0].target.id));},{rootMargin:'-10% 0px -65% 0px',threshold:0});
document.querySelectorAll('main>section').forEach(s=>observer.observe(s));
navLinks[0].classList.add('selected');
