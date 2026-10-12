"""Reconcile every supplied file with immutable source packs and save unmatched versions."""
from pathlib import Path
from collections import defaultdict
import csv,hashlib,json,shutil

ROOT=Path(__file__).resolve().parents[1]
UPLOAD=Path('/workspace/scratch/addb5b42ae48/upload')
BASE=ROOT/'research/input-register'
BASE.mkdir(exist_ok=True)
index=defaultdict(list)
for f in (ROOT/'research').rglob('*'):
    if f.is_file() and 'input-register' not in f.parts:
        index[hashlib.sha256(f.read_bytes()).hexdigest()].append(str(f.relative_to(ROOT)))

def kind(f,path):
    name=f.name.lower()
    if name.endswith('.png'):return 'Khung nghiên cứu 4C','Tham chiếu cấu trúc','Ảnh Category đặt câu hỏi và căn cứ; không phải dữ kiện thị trường.'
    if 'conclusion' in name or 'hypothesis_review' in name:return 'Category / Competitor / Consumer','Đối chiếu, cập nhật kết luận','Kết luận của gói không được chấp nhận tự động; số JD, review và các khoảng trống được cập nhật theo bản rà soát.'
    if 'qa' in name or 'verification' in name:return 'Kiểm tra dữ liệu','Giữ làm căn cứ phân loại','Dùng để loại claim không được nguồn hỗ trợ và tránh đưa dữ liệu trùng/sai phạm vi vào kết luận.'
    if 'log' in name or 'readme' in name or 'gap' in name or 'open_question' in name:return 'Phạm vi, đường tìm và khoảng trống','Đối chiếu trạng thái hiện tại','Giữ lịch sử; câu hỏi được đọc theo lần cập nhật, không dùng trạng thái cũ để phủ định nguồn mới.'
    if 'market_estimate' in name:return 'Category · quy mô và mô hình tham khảo','Phân biệt ước tính với giao dịch','Không dùng quy mô giáo dục rộng, giả định hoặc giá niêm yết để tính doanh thu khóa marketing.'
    if 'customer' in name or 'learner' in name or 'voice' in name or 'review' in name:return 'Consumer · động cơ và trải nghiệm','Dùng trong phân tích có giới hạn','Khử trùng khi suy số người; giữ quan hệ nguồn, tình trạng đã học/trả tiền và các lời kể tích cực/lẫn góp ý.'
    if 'practice' in name:return 'Company / Consumer · bài và góp ý','Dùng trong phân tích có giới hạn','Tách lời kể, lời công bố và sản phẩm kiểm chứng; không cộng story thành học viên hoặc tỷ lệ kết quả.'
    if 'company' in name:return 'Company · chương trình CareerPrep','Đọc cùng bản cập nhật 12/10','Giữ thông tin gốc; lịch, giá và quyền lợi đọc theo gói và lần ghi nhận.'
    if 'program' in name or 'alternative' in name or 'cohort' in name:return 'Competitor / Category · nguồn cung','Dùng cùng điều kiện và phiên bản','Không cộng khóa/gói thành số đơn vị; lớp dự kiến không thành lớp đã tổ chức; giá khác gói không so trực tiếp.'
    if 'jd_' in name:return 'Category · yêu cầu công việc','Dùng mẫu đã phân loại 111 tin','Giữ 112 tin gốc; loại thực tập và sửa nhãn quá rộng trước khi tính 80/69/50/45.'
    if 'search' in name:return 'Category · nhu cầu tìm kiếm','Đọc theo thang đo và ý định','Không quy Google Trends thành lượng người mua; volume ví dụ/nguồn chưa xác nhận không được nâng thành dung lượng thị trường.'
    if 'opportunity' in name:return 'Category / Consumer · đối chiếu vấn đề','Đọc như bảng so sánh nghiên cứu','Không đưa thứ tự gợi ý của nguồn thành kế hoạch marketing hoặc xếp hạng doanh thu.'
    return '4C · nguồn và dữ kiện','Dùng theo bản rà soát','Nguồn, kỳ, mẫu và giới hạn được giữ riêng; không chấp nhận mọi claim trong một file.'

files=[];matched=0;added=0
for f in sorted(UPLOAD.iterdir()):
    if not f.is_file():continue
    sha=hashlib.sha256(f.read_bytes()).hexdigest();paths=index.get(sha,[])
    if paths:
        matched+=1;path=sorted(paths,key=lambda p:(len(p),p))[0]
    else:
        added+=1
        destination=BASE/'raw'/f.name.replace(' ','_').replace('(','_').replace(')','')
        destination.parent.mkdir(exist_ok=True);shutil.copyfile(f,destination);path=str(destination.relative_to(ROOT))
    assert hashlib.sha256((ROOT/path).read_bytes()).hexdigest()==sha
    rows=None
    if f.suffix=='.csv':
        with f.open(encoding='utf-8-sig',newline='') as handle:rows=len(list(csv.DictReader(handle)))
    scope,use,note=kind(f,path)
    if f.name in ['01_sources.csv','02_evidence.csv','03_programs.csv','04_cohorts.csv','07_task_log.csv','08_qa_log.csv']:
        use='Bản đầu được giữ; dùng bản đã rà soát 08/10'
        note+=' Các ID của nguồn/chương trình/dữ kiện/lớp được kế thừa trong gói V2; M-E109/M-C107 bị loại vì nguồn không hỗ trợ claim 130 người/lớp 2026.'
    review=''
    if '2026-10-12-followup' in path:review='research/muse/2026-10-12-followup/reviewed.json'
    elif '2026-10-11-3c' in path:review='research/muse/2026-10-11-3c/reviewed.json'
    elif '2026-10-08-v2' in path or 'Bản đầu' in use:review='research/muse/2026-10-08-v2/reviewed-public.json'
    elif '2026-10-11/' in path:review='research/muse/2026-10-11/reviewed.json'
    files.append(dict(name=f.name,path=path,sha256=sha,bytes=f.stat().st_size,rows=rows,scope=scope,use=use,note=note,reviewPath=review))
register=dict(files=files,hashMatchedBefore=matched,archivedNow=added,updated='2026-10-12',googleTrendsFiles=len(list((ROOT/'research/google-trends').rglob('*.csv'))))
(BASE/'coverage.json').write_text(json.dumps(register,ensure_ascii=False,indent=2))
(ROOT/'research/input-register.js').write_text('window.INPUT_REGISTER = '+json.dumps(register,ensure_ascii=False,separators=(',',':'))+';\n')
with (BASE/'coverage.csv').open('w',encoding='utf-8',newline='') as handle:
    writer=csv.DictWriter(handle,fieldnames=list(files[0]));writer.writeheader();writer.writerows(files)
print(json.dumps({'files':len(files),'hashMatchedBefore':matched,'archivedNow':added,'googleTrendsFiles':register['googleTrendsFiles']},ensure_ascii=False))
