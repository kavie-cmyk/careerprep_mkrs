"""Build the review layer without changing supplied CSV cells or original files."""
import csv
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PACK = Path(__file__).resolve().parent
RAW = PACK / 'raw'

def read(name):
    with (RAW / name).open(encoding='utf-8-sig', newline='') as f:
        rows = list(csv.DictReader(f))
    assert all(None not in r and all(v is not None for v in r.values()) for r in rows), name
    return rows

data = json.loads((ROOT / 'research/muse/2026-10-11-3c/reviewed.json').read_text())
raw = {k: read(f) for k, f in {
    'updates':'program_updates.csv', 'practice':'practice_and_feedback.csv',
    'customers':'customer_cases_new.csv', 'sources':'sources_new.csv',
    'logs':'collection_log_new.csv', 'questions':'open_questions.csv'
}.items()}
ids = [next(iter(r.values())) for rows in raw.values() for r in rows]
assert len(ids) == len(set(ids)) == 728

def record(r, field, status='Theo bộ thu thập bổ sung'):
    return dict(r, _id=r[field], _status=status, _notes=[],
                _sourceIds=re.findall(r'(?:M3C-S-[\w-]+|S\d[a-z]?-[\d]+)', r.get('source_ids',r.get('related_source_ids',''))),
                _urls=[], _batch='12/10/2026', _relatedIds=[])

for r in raw['sources']:
    n=record(r,'source_id',r.get('access_status','Theo bộ thu thập bổ sung'))
    if re.match(r'^https?://', r['exact_url']): n['_urls']=[r['exact_url']]
    data['sources'].append(n)

checks = [
    ('VFU-S001','AI Digital Marketing — lần đối chiếu 12/10','Tomorrow Marketers','https://www.tomorrowmarketers.org/digital-planning','Trang được trình đọc web trả về có lịch lớp 11/2026 và mức 4.490.000đ; nhãn gói và ưu đãi chưa xác nhận. Khác bản thu thập tại URL không www ngày 11/10; không xác định là thay đổi giá hay khác phiên bản URL.'),
    ('VFU-S002','Foundation — đối chiếu ưu đãi và đối tượng 12/10','CareerPrep','https://marketing.careerprep.vn/marketing-foundation-in-action','Đọc lại trang chính thức: 4.800.000đ, giảm 500K nếu đăng ký trước ngày 15 hàng tháng; 6 buổi; đối tượng có cả người đã làm marketing cần hệ thống kiến thức. Lịch trong form chưa ghi năm.'),
    ('VFU-S003','Foundation of Digital Marketing — đối chiếu 12/10','BRAND Camp','https://www.brandcamp.asia/course/10-foundation-of-digital-marketing','Trang chính thức hiển thị 85 video, 299.000đ. 71 mục trong bản trích của Muse là phần danh sách đọc được, không thay cho tổng số video nhà cung cấp công bố.')
]
for id,title,publisher,url,note in checks:
    data['sources'].append(record(dict(source_id=id,title=title,publisher=publisher,exact_url=url,
       access_date='2026-10-12',access_status='Đối chiếu qua trang chính thức',read_scope=note,
       source_type='trang chính thức',commercial_relationship='đơn vị tự công bố'),'source_id'))
    data['sources'][-1]['_urls']=[url]
source_map={r['_id']:r for r in data['sources']}

def attach(n):
    n['_urls']=list(dict.fromkeys(u for id in n['_sourceIds'] for u in source_map.get(id,{}).get('_urls',[])))
    assert all(id in source_map for id in n['_sourceIds']), (n['_id'],n['_sourceIds'])
    return n

data['updates']=[]
for r in raw['updates']:
    n=record(r,'update_id',r['resolution_status'])
    if 'không thấy trong nguồn đã đọc' in r['observed_value'].lower():
        n['_status']='Chưa thu thập được thông tin';n['_notes'].append('Không tìm thấy trong phần đã đọc không có nghĩa chương trình không có quyền lợi này.')
    if r['conflict_group']:n['_notes'].append('Giữ các mức và điều kiện riêng; chưa chọn một giá làm giá hiện hành chung.')
    if n['_id']=='M3C-PU-103':
        n['_status']='Cần đối chiếu phiên bản URL và giá hiện hành'
        n['_notes'].append('8.910.000đ là giá trong bộ thu thập 11/10. Lần đối chiếu 12/10 tại URL www xuất hiện 4.490.000đ, nhưng chưa xác nhận nhãn gói/điều kiện. Không dùng 8.910.000đ làm giá hiện hành đã chốt.')
        n['_relatedIds']=['VFU-PU001']
    if n['_id'] in ['M3C-PU-333','M3C-PU-338']:
        n['_notes'].append('Đọc cùng M3C-PU-113/114: trang danh mục công bố giảng viên; FAQ nền tảng có thời hạn truy cập. Không coi phần trích ngắn là phủ định thông tin ở nguồn khác.')
    if n['_id']=='M3C-PU-328':n['_notes'].append('“Đánh giá từng dự án” không xác nhận mọi bài tập cá nhân đều được chữa; giữ đúng phạm vi dự án.')
    if n['_id'] in ['M3C-PU-359','M3C-PU-449']:
        n['_notes'].append('Không nâng lời hứa chấm/góp ý hoặc hỗ trợ 24/7 thành hình thức góp ý văn bản hay số lượt hỏi không giới hạn nếu nguồn không nêu rõ.')
    data['updates'].append(attach(n))

for id,provider,program,field,value,source in [
 ('VFU-PU001','Tomorrow Marketers','AI Digital Marketing','đối chiếu giá khác phiên bản URL','Bản thu thập 11/10 ở URL không www ghi Standard 8.910.000đ. Trang www trả về ngày 12/10 xuất hiện 4.490.000đ và lịch lớp 11/2026; nhãn gói, hiệu lực và điều kiện chưa xác nhận.','VFU-S001'),
 ('VFU-PU002','BRAND Camp','Foundation of Digital Marketing','tổng số video công bố','Trang chính thức đối chiếu 12/10 ghi 85 video và 299.000đ; không đổi tổng thời lượng thành 71 theo danh sách trích một phần.','VFU-S003'),
 ('VFU-PU003','CareerPrep','Marketing Foundation','ưu đãi và người học','Trang chính thức đối chiếu 12/10 ghi giảm 500K trước ngày 15 hằng tháng; đối tượng có cả sinh viên, người đã làm marketing và người chuyển ngành.','VFU-S002')]:
    data['updates'].append(attach(record(dict(update_id=id,provider=provider,program=program,field=field,observed_value=value,source_ids=source,access_date='2026-10-12'),'update_id','Đối chiếu bổ sung 12/10')))

data['practice']=[]
for r in raw['practice']:
    n=record(r,'record_id');n['_displayType']=r['record_type']
    if not r['record_type'] and r['assignment_description']=='lời hứa trang bán khóa':
        n['_displayType']='Thông tin trang bán khóa';n['_status']='Thông tin chương trình, chưa phải trải nghiệm học'
        n['_notes'].append('Loại bản ghi được ghi ở cột assignment_description. Nội dung chương trình nằm ở individual_or_group. Giữ nguyên các ô gốc; lớp hiển thị đọc theo nội dung.')
    if 'testimonial do NCC đăng lại' in r['record_type']:
        n['_status']='Story do nhà cung cấp chọn đăng'
        n['_notes'].append('Một dòng story không tương đương một người. Kết quả việc làm, lương và quảng cáo là nội dung được đăng lại, chưa xác minh độc lập.')
    for field in ['before_url','after_url']:
        if r[field] and not re.match(r'^https?://',r[field]):
            n['_notes'].append(f'{field} chứa chữ hoặc ghi chú, không phải URL bài làm; không tạo liên kết từ ô này.')
    if n['_id']=='M3C-PF-023':
        n['_relatedIds']=['M3C-CC-107','M3C-CC-111']
        n['_notes'].append('Cùng bài của Quynh Huong với M3C-CC-107. Trần Dũng M3C-CC-111 kể cùng nhóm; không tính thành hai dự án hoặc nối thành bản trước/sau.')
    if n['_id'] in ['M3C-PF-020','M3C-PF-028']:
        n['_notes'].append('Cùng người ANON-FB-19 và cùng ngày 02/08/2026; hai góc nội dung, không cộng thành hai người.')
    if n['_id'] in ['M3C-PF-012','M3C-PF-013','M3C-PF-014']:
        n['_notes'].append('Góp ý thuộc Data Marketers; không gán thành thiếu sót riêng của Digital Marketing in Action.')
    data['practice'].append(attach(n))

for r in raw['customers']:
    n=record(r,'case_id');n['_reviewedPurchase']=r['purchase_status']
    if r['duplicate_group'] or r['matched_old_case_id'] not in ['','không tìm thấy']:
        n['_status']='Có bản ghi trùng cần đọc cùng'
        n['_notes'].append('Giữ bản gốc để truy vết; không cộng dòng trùng thành người mới.')
    if n['_id']=='M3C-CC-100':
        n['_reviewedPurchase']='Đã học; chưa xác nhận trả học phí từ phát biểu trực tiếp'
        n['_notes'].append('Dòng gốc suy đã trả tiền vì khóa có thu phí. Không dùng suy luận này làm bằng chứng thanh toán; đọc cùng M3C-CC-005.')
    if n['_id']=='M3C-CC-112':
        n['_status']='Chưa xác nhận khóa thuộc CareerPrep'
        n['_notes'].append('Data Foundation do Hưng Lưu dạy; chưa xác nhận thuộc CareerPrep và không phải Digital Marketing in Action. Không dùng làm kết quả của ba khóa trong đề xuất.')
    if n['_id'] in ['M3C-CC-116','M3C-CC-117']:
        n['_reviewedPurchase']='Xin tài liệu hoặc học miễn phí; chưa thể hiện ý định mua'
        n['_notes'].append('Không xếp thành tín hiệu cân nhắc mua khóa trả phí.')
    if n['_id']=='M3C-CC-115':n['_reviewedPurchase']='Hỏi thông tin khóa; chưa ghi nhận mua hoặc thanh toán'
    if n['_id']=='M3C-CC-107':n['_relatedIds']=['M3C-PF-023','M3C-CC-111']
    if n['_id']=='M3C-CC-111':n['_relatedIds']=['M3C-PF-023','M3C-CC-107'];n['_notes'].append('Lời kể khóa đã học 5 buổi không thay cho thời lượng 6 buổi trang hiện tại; cùng nhóm bài MoMo x ePass với Quynh Huong.')
    if n['_id']=='M3C-CC-106':n['_relatedIds']=['M3C-CC-001']
    if n['_id']=='M3C-CC-100':n['_relatedIds']=['M3C-CC-005']
    n['_notes'].append('Đã học, đã trả tiền và kết quả sau học là ba thông tin khác nhau. Bài cá nhân tự đăng không đồng nghĩa kết quả đã được kiểm chứng.')
    data['customers'].append(attach(n))

for r in raw['logs']:data['logs'].append(attach(record(r,'log_id')))
data['questions']=[]
for r in raw['questions']:
    n=record(r,'question_id',r['finding_status']);n['_displayQuestion']=r['exact_question']
    if n['_id']=='M3C-OQ-P2-002':
        n['_displayQuestion']=r['exact_question']+r['related_old_ids'];n['_status']='Chưa giải quyết'
        n['_notes'].append('Dấu phẩy trong câu hỏi làm lệch ý nghĩa các cột: related_old_ids là phần cuối câu hỏi, what_was_read là CF-039. Giữ ô gốc; không đọc finding_status thành trạng thái đã giải quyết.')
    if n['_id']=='M3C-OQ-P2-001':
        n['_status']='Đã đọc theo nguồn; 56 dòng story trong CSV'
        n['_notes'].append('Nguồn mô tả 57 story, có 1 story chữ nhỏ không đọc được. CSV nhận có 56 dòng M3C-PF-043–098, không có PF-099; không tự tạo dòng thiếu.')
    if n['_id']=='M3C-OQ-P3a-003':
        n['_status']='Đã có thêm bài học viên ngoài bình luận Quan Nguyen'
        n['_notes'].append('Kết quả âm tính chỉ áp dụng 15 bình luận của bài Quan Nguyen. Các nguồn P5 bổ sung bài học viên khác; câu hỏi rộng không còn ở trạng thái không tìm được ai khác.')
    if n['_id']=='M3C-OQ-P4-012':n['_notes'].append('README nhắc 2 video YouTube nhưng gói không có URL hoặc dòng nguồn tương ứng. Chưa xác nhận sản phẩm hoặc đúng khóa; không đóng câu hỏi từ ghi chú này.')
    data['questions'].append(attach(n))

for r in data['programs']+data['company']:
    linked=[u['_id'] for u in data['updates'] if r['_id'] in re.findall(r'(?:CF-\d+|CP[\w-]+)',u.get('existing_program_or_fact_id',''))]
    if linked:
        r['_relatedIds']=linked;r['_notes'].append('Có dữ liệu bổ sung ngày 12/10; đọc các bản cập nhật liên quan trước khi dùng thông tin ghi nhận trước đó.')

audit = [
 (['M3C-CC-001','M3C-CC-106','M3C-CC-005','M3C-CC-100','M3C-DUP-001','M3C-DUP-002'],'Không cộng người mới từ dòng trùng','Hai cặp trùng trong bộ mới; hai dòng trùng với bộ cũ. Không tính 36 dòng thành 36 khách hàng mới.'),
 (['M3C-CC-107','M3C-PF-023','M3C-CC-111'],'Một bài và một nhóm được kể ở nhiều nơi','Quynh Huong được ghi cả ở practice và customers; bài Trần Dũng kể cùng nhóm. Không cộng thành dự án độc lập hoặc nối bản trước/sau.'),
 (['M3C-PF-043','M3C-S-P2-003','M3C-OQ-P2-001'],'56 dòng story được nhận; nguồn mô tả 57','42 dòng trước + 56 dòng story = 98 dòng practice. Nguồn có một story không đọc được; không có PF-099 trong file nhận. Chưa xác nhận số người độc lập.'),
 (['M3C-CC-100','M3C-CC-115','M3C-CC-116','M3C-CC-117'],'Đã học và hỏi tài liệu chưa chứng minh trả tiền','Không suy thanh toán từ giá niêm yết. Ba bình luận gồm một hỏi thông tin, một xin bài tham khảo và một muốn học miễn phí.'),
 (['M3C-CC-112'],'Không gán Data Foundation cho DMIA','Khóa và đơn vị chưa xác nhận; chỉ dùng như bối cảnh nhu cầu đọc số liệu, không làm kết quả của chương trình CareerPrep đang đề xuất.'),
 (['M3C-PU-103','VFU-PU001'],'Giá TM cần đối chiếu phiên bản URL','Bộ 11/10 ghi 8,91 triệu; trang www trả về 12/10 có 4,49 triệu nhưng nhãn gói chưa rõ. Không chọn giá cao hoặc thấp để lập lợi thế giá.'),
 (['M3C-PU-001','VFU-PU003','M3C-PU-009','M3C-PU-010'],'Foundation đã rõ điều kiện; Social vẫn mâu thuẫn','Foundation giảm 500K trước ngày 15 hằng tháng. Social: số tiền ưu đãi và tỷ lệ không khớp; hướng dẫn thanh toán dùng giá gốc, hiệu lực chưa xác nhận.'),
 (['M3C-PU-113','VFU-PU002','M3C-PU-114'],'Giữ đúng tổng số video và quyền lợi nền tảng','Trang chính thức công bố 85 video; 71 mục là phần trích đọc được. FAQ có thảo luận và thời hạn truy cập, không gọi khóa video là hoàn toàn không hỗ trợ.'),
 (['M3C-PF-009','M3C-PF-017','M3C-PF-018','M3C-PF-040','M3C-PF-034','M3C-OQ-P2-002'],'Phân biệt ô gốc với cách đọc','Một số ô URL chứa mảnh câu; loại bản ghi trang bán khóa đặt ở cột khác; một câu hỏi bị lệch ý nghĩa cột. Ghi chú riêng, không sửa CSV gốc.'),
 (['M3C-PF-001','M3C-PF-020','M3C-PF-028'],'Không dùng ước tính phản hồi làm mẫu số hài lòng','6.345 dòng văn bản không phải lượt phản hồi hoặc người. Ước 2.100–2.200 và điểm tổng hợp do sheet tự tính chưa được tái tính đầy đủ.'),
 (['M3C-PF-012','M3C-PF-013','M3C-PF-014','M3C-PF-022','M3C-PF-039'],'Góp ý phải gắn đúng khóa','Các góp ý chưa chữa hết bài ở Data Marketers không gán thành vấn đề DMIA. DMIA có góp ý tốc độ và nhu cầu chữa bài nộp trễ; cần xác nhận chính sách hỗ trợ.'),
 (['M3C-OQ-P3a-003','M3C-OQ-P4-012'],'Đọc kết quả theo phạm vi và lần cập nhật','Kết quả âm tính trong bình luận không phủ định bài P5 mới. Hai video TM trong README thiếu URL/source nên chưa được đưa thành bằng chứng đã xác minh.')
]
data['audit'] += [dict(ids=ids,status=status,note=note) for ids,status,note in audit]
data['reviewed']='2026-10-12'
data['followup']={'received':{k:len(v) for k,v in raw.items()},'instagramRows':56,'instagramReportedStories':57,
 'linkedInRelevantIds':['M3C-CC-001','M3C-CC-107','M3C-CC-108','M3C-CC-109','M3C-CC-110','M3C-CC-111','M3C-CC-113','M3C-CC-114'],
 'interpretation':'Số dòng và số bài thu thập, không phải số người mua hoặc tỷ lệ đại diện thị trường.'}

manifest=[]
for f in sorted(RAW.iterdir()):
    manifest.append(dict(file=f.name,bytes=f.stat().st_size,sha256=hashlib.sha256(f.read_bytes()).hexdigest()))
data['followup']['originalFiles']=manifest
for key in ['updates','practice','questions','customers','sources','logs']:
    assert len({r['_id'] for r in data[key]})==len(data[key]),key
all_ids={r['_id'] for k in ['programs','alternatives','customers','company','evidence','sources','logs','updates','practice','questions'] for r in data[k]}
assert all(id in all_ids for a in data['audit'] for id in a['ids']), 'audit reference'
assert all(id in all_ids for k in ['programs','company','customers','practice','updates'] for r in data[k] for id in r.get('_relatedIds',[])), 'related reference'
out=json.dumps(data,ensure_ascii=False,separators=(',',':'))
(ROOT/'research/three-c-data.js').write_text('window.THREE_C_DATA = '+out+';\n')
(PACK/'reviewed.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
(PACK/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print(json.dumps({k:len(data[k]) for k in ['updates','practice','customers','sources','logs','questions','audit']},ensure_ascii=False))
