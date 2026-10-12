"""Add explicit, source-linked interpretation to the retained four-C report."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

intro = '''<section id="overview" class="research-intro">
<div class="research-thesis"><p class="report-label">NHẬN ĐỊNH TỪ BỐN C</p><h2>Cơ hội nằm ở khoảng cách giữa biết marketing và làm marketing có căn cứ.</h2><p>Yêu cầu công việc đòi hỏi đo lường và ngân sách. Một số người học vẫn lúng túng dù đã tự học hoặc làm dự án. CareerPrep có lời kể cụ thể về cách chữa bài, trong khi nhiều đối thủ cũng cung cấp thực hành và góp ý.</p><a href="#research-conclusions">Xem bốn C dẫn đến nhận định này như thế nào →</a></div>
<div class="reading-key"><span><i class="observed-dot"></i><b>Dữ kiện:</b> điều được ghi nhận trong nguồn</span><span><i class="inference-dot"></i><b>Suy luận:</b> cách giải thích từ các dữ kiện</span></div>
<p class="scope-note">Phạm vi: đào tạo marketing ngắn hạn tại Việt Nam, tập trung vào nhu cầu người đi làm; giữ các trường hợp sinh viên, chủ doanh nghiệp và đào tạo đội ngũ khi có liên quan. Dữ liệu đến 12/10/2026.</p>
</section>'''

findings = [
    ('Nhu cầu học phân hóa theo công việc cần giải quyết.',
     'Cơ hội tăng trưởng nằm ở học để giải quyết công việc cụ thể.',
     'AI tăng quan tâm tìm kiếm, còn đo lường và ngân sách xuất hiện nhiều trong mẫu tuyển dụng. Khi đọc cùng lời kể người học, đây là cơ sở suy luận về cơ hội nâng kỹ năng cho người đang làm nghề.'),
    ('AI, bài tập và góp ý đã xuất hiện ở nhiều đơn vị.',
     'Có thực hành chưa đủ để phân biệt một khóa học.',
     'AIM, TM và Vinalink đều công bố bài tập hoặc dự án; khóa video cũng có bài tập và thảo luận. Sự khác biệt đáng xem xét nằm ở người học được làm bài gì, được sửa thế nào và có căn cứ nào để tin vào quá trình đó.'),
    ('Biết từng phần chưa chắc đã biết vận dụng.',
     'Người có kiến thức vẫn cần giúp biến nó thành cách làm.',
     'Một số người học kể đã tự học hoặc làm dự án nhưng vẫn thiếu cách kết nối kiến thức. Giải thích hợp lý là họ cần biết cách áp dụng và kiểm tra quyết định của mình, thay vì chỉ tiếp nhận thêm nội dung.'),
    ('Ba khóa phục vụ các công việc khác nhau.',
     'Giá trị của chữa bài nằm ở cách kiểm tra lập luận marketing.',
     'Bài Foundation có góp ý về lý do thông điệp thuyết phục; phản hồi Digital nói đến đánh giá tối ưu và phân bổ ngân sách. Đây là căn cứ cho giá trị hướng dẫn tư duy qua bài tập, chưa phải bằng chứng vượt trội so với đối thủ.'),
]

category_logic = '''<div class="c-reading reasoning" id="category-reasoning"><b>Vì sao suy luận như vậy?</b><ol><li><span>Dữ kiện</span><p>“AI marketing” tăng 121,4% về chỉ số tìm kiếm bình quân; bốn từ khóa học chung giảm. Trong 111 tin, 80 nhắc đo lường và 69 nhắc ngân sách.</p></li><li><span>Giải thích</span><p>Việc học vẫn có động lực từ yêu cầu nghề, nhưng sự quan tâm không tăng đồng đều ở mọi chủ đề. Nội dung giúp giải quyết nhiệm vụ cụ thể có cơ sở hơn một lời hứa học marketing chung.</p></li><li><span>Insight</span><p><strong>Nguồn tăng trưởng đáng chú ý là nhu cầu nâng năng lực làm việc, trong đó AI là một hướng; không nên đồng nhất toàn bộ cơ hội với AI.</strong></p></li></ol><details><summary>Điều có thể làm nhận định này yếu đi</summary><p>Tìm kiếm AI có thể chỉ là tò mò hoặc tìm công cụ miễn phí. Tin tuyển dụng phản ánh yêu cầu nghề, không đo người muốn mua khóa. Lời kể nối được nhu cầu với việc học, nhưng chưa cho biết quy mô người mua.</p><a href="#wave-data" data-wave-set="opportunities">Đọc cả các trường hợp tự học thành công →</a></details><a href="#source-S14">Tìm kiếm</a> · <a href="#wave-jd-method">Mẫu tuyển dụng</a> · <a href="#three-c-record-M3C-CC-111">Lời kể người đã làm dự án</a></div>'''

competitor_matrix = '''<div class="practice-comparison"><h3>“Thực hành” đang có nhiều cách cung cấp</h3><p class="c-note">Thông tin chương trình và FAQ đã thu thập; bảng mô tả dịch vụ, không xếp chất lượng.</p><table><thead><tr><th>Chương trình</th><th>Cách học được công bố</th></tr></thead><tbody>
<tr><th><a href="#three-c-record-CP1a-022">AIM · Hands-On</a></th><td>Kế hoạch marketing theo nhóm, thuyết trình và hướng dẫn tại lớp</td></tr>
<tr><th><a href="#three-c-record-CP1a-002">TM · AI Digital</a></th><td>Bài cuối khóa trên dữ liệu; mentoring 1–1 theo gói được ghi nhận</td></tr>
<tr><th><a href="#three-c-record-CP2-002">Vinalink · Content 3C</a></th><td>Bài theo buổi và mini campaign; công bố hỗ trợ trong khóa</td></tr>
<tr><th><a href="#three-c-record-CP2-041">HNAAu · AI Digital</a></th><td>Thực hành công cụ theo buổi; mức chữa bài cá nhân chưa rõ</td></tr>
<tr><th><a href="#three-c-record-M3C-PU-114">BRANDCamp · Video</a></th><td>Bài tập, trắc nghiệm và thảo luận theo FAQ nền tảng</td></tr>
</tbody></table><p class="c-note">Mentoring TM là quyền lợi theo gói, cần xác nhận điều kiện hiện hành. “Chưa rõ” là khoảng trống thông tin, không có nghĩa đơn vị không hỗ trợ.</p></div>'''

competitor_logic = '''<div class="c-reading reasoning" id="competitor-reasoning"><b>Vì sao suy luận như vậy?</b><ol><li><span>Dữ kiện</span><p>Trong nhóm chương trình đối chiếu, bài tập, dự án, công cụ AI và trao đổi với giảng viên đã có ở nhiều hình thức học.</p></li><li><span>Giải thích</span><p>Một người cân nhắc lớp học có thể thấy nhiều đơn vị dùng những lời hứa giống nhau. Nhãn “AI” hoặc “thực hành” vì thế giải thích ít về sự khác nhau giữa các khóa.</p></li><li><span>Insight</span><p><strong>Điểm có thể phân biệt là chất lượng hướng dẫn trên một bài cụ thể; phải xem nội dung góp ý và bài làm, không chỉ xem số buổi hay tên công cụ.</strong></p></li></ol><details><summary>Điều chưa thể suy thành lợi thế</summary><p>AIM có hướng dẫn bài nhóm; TM có bài cuối khóa và mentoring theo gói. Dữ liệu hiện có không hỗ trợ nhận định “chưa ai làm thực hành” hoặc “CareerPrep là nơi duy nhất có góp ý”.</p></details></div>'''

consumer_logic = '''<div class="c-reading reasoning" id="consumer-reasoning"><b>Vì sao suy luận như vậy?</b><ol><li><span>Dữ kiện</span><p>Trần Dũng đã làm dự án nhưng quyết định còn cảm tính; Irene tự học chưa hiệu quả; tác giả Decor Hà Nội học nền tảng rồi vẫn cần thực hành thêm.</p></li><li><span>Giải thích</span><p>Ba lời kể ở các bối cảnh khác nhau cùng cho thấy khoảng cách giữa tiếp nhận kiến thức và dùng nó. Đây là một nhu cầu quan sát được, không phải đặc điểm của mọi người học.</p></li><li><span>Insight</span><p><strong>Một giá trị có thể khiến lớp học đáng cân nhắc là giúp người học biết mình đang làm đúng hay sai và sửa được phần còn vướng.</strong></p></li></ol><details><summary>Những lý do khác vẫn tồn tại</summary><p>Có người học để tìm hiểu nghề, củng cố nền tảng, kết nối hoặc theo lời giới thiệu của bạn. Có người tự học thành công. Vì vậy, không kết luận mọi người mua khóa vì tự học thất bại.</p><a href="#three-c-record-M3C-CC-114">Bạn bè giới thiệu</a> · <a href="#wave-record-OP-08">Động cơ học khác</a> · <a href="#wave-record-OP-04">Tự học AI thành công</a></details></div>'''

company_logic = '''<div class="c-reading reasoning" id="company-reasoning"><b>Vì sao suy luận như vậy?</b><ol><li><span>Dữ kiện</span><p>Foundation: góp ý lý do thông điệp thuyết phục và rào cản bảo mật. Digital: chữa cách đánh giá tối ưu, ngân sách và hành trình khách hàng.</p></li><li><span>Giải thích</span><p>Điểm gặp nhau là cách kiểm tra và sửa lập luận marketing. Lời kể mô tả được quá trình hướng dẫn cụ thể hơn một lời khen chung về giảng viên.</p></li><li><span>Insight</span><p><strong>CareerPrep có cơ sở để thể hiện giá trị “làm bài có lý do, sửa bài có căn cứ” ở Foundation và Digital. Social AI chưa có mức căn cứ tương ứng trong dữ liệu đã thu thập.</strong></p></li></ol><details><summary>Những trải nghiệm cần đọc cùng lời khen</summary><p>Một học viên Digital đề nghị giảng chậm hơn; một người mong được chữa bài nộp trễ. Có hướng dẫn không có nghĩa mọi học viên theo kịp hoặc đã nhận đủ hỗ trợ.</p><a href="#three-c-record-M3C-PF-039">Tốc độ học</a> · <a href="#three-c-record-M3C-PF-022">Bài nộp trễ</a></details><a href="#three-c-record-M3C-PF-023">Bài Foundation</a> · <a href="#three-c-record-M3C-PF-016">Chữa bài Digital</a></div>'''

connection = '''<section class="cross-c connected-story" id="research-conclusions">
<div class="connection-heading"><p class="report-label">KẾT NỐI BỐN C</p><h2>Từ nhu cầu nghề đến giá trị của việc học có hướng dẫn</h2><p>Đọc cạnh nhau, bốn C chỉ ra cùng một khoảng thiếu: vận dụng kiến thức vào công việc.</p></div>
<div class="connection-grid" aria-label="Bốn căn cứ dẫn đến kết luận"><article class="category"><b>Category</b><p>Yêu cầu nghề đòi hỏi đo lường, ngân sách và ứng dụng kỹ năng.</p><a href="#category-reasoning">Căn cứ →</a></article><article class="competitor"><b>Competitor</b><p>Nhiều lựa chọn đã có AI và thực hành; lời hứa chung khó phân biệt.</p><a href="#competitor-reasoning">Căn cứ →</a></article><article class="consumer"><b>Consumer</b><p>Một nhóm người học biết từng phần nhưng vẫn vướng khi vận dụng.</p><a href="#consumer-reasoning">Căn cứ →</a></article><article class="company"><b>Company</b><p>CareerPrep có lời kể cụ thể về cách hướng dẫn lập luận và sửa bài.</p><a href="#company-reasoning">Căn cứ →</a></article></div>
<div class="connection-arrow" aria-hidden="true">↓</div>
<div class="joint-insight"><span>KẾT LUẬN SUY LUẬN</span><h3>Giá trị phù hợp của CareerPrep là giúp người làm marketing biến kiến thức thành kế hoạch và quyết định có căn cứ.</h3><p>Vì nhu cầu nghề đòi hỏi biết vận dụng, người học kể vẫn thiếu cách làm, còn thực hành đã có ở nhiều đối thủ, điểm đáng phân biệt nằm ở <strong>cách giảng viên giúp người học tìm ra vấn đề và sửa lập luận trong bài làm</strong>. Dữ liệu Foundation và Digital đã có mô tả cho giá trị này.</p><p class="implication"><b>Hàm ý về định vị từ nghiên cứu:</b> “Làm marketing có căn cứ” là hướng định vị phù hợp với nhu cầu và trải nghiệm đã thu thập. Bài tập và nội dung góp ý cụ thể là căn cứ để bảo vệ hướng này.</p></div>
<div class="inference-boundary"><div><b>Nhận định có cơ sở</b><p>Có nhu cầu nâng kỹ năng gắn công việc; có người thiếu khả năng vận dụng; có lời kể về hướng dẫn ở CareerPrep.</p></div><div><b>Còn cần chứng minh</b><p>CareerPrep tốt hơn đối thủ ở mức nào; người học tiến bộ ra sao; bao nhiêu người sẵn sàng trả tiền cho giá trị này.</p></div></div>
<details class="conclusion-conditions"><summary>Thông tin nào có thể thay đổi nhận định?</summary><ul><li>Nếu phỏng vấn người học cho thấy nguyên nhân chọn khóa chủ yếu là giá, chứng chỉ hoặc kết nối, vai trò của chữa bài trong quyết định mua phải giảm xuống.</li><li>Nếu bài làm và nhận xét cùng điều kiện ở đối thủ cho thấy mức hướng dẫn tương đương hoặc tốt hơn, “làm có căn cứ” vẫn phù hợp nhu cầu nhưng chưa tạo khác biệt cho CareerPrep.</li><li>Nếu bài trước/sau không thể hiện tiến bộ, lời kể về trải nghiệm chưa đủ chứng minh hiệu quả của cách hướng dẫn.</li></ul><p>Không chờ những kiểm tra này mới được suy luận; dùng chúng để xác định phạm vi của nhận định hiện tại.</p></details>
<p class="connection-download"><a href="research/inference/2026-10-12/insights.md" download>Tải lập luận và các căn cứ đối chiếu ↓</a> · <a href="#input-coverage">Đối chiếu toàn bộ đầu vào →</a></p>
</section>'''

for path in ['index.html', 'research/report-template.html']:
    f = ROOT / path
    s = f.read_text()
    s = re.sub(r'<section id="overview" class="research-intro">.*?</section>', intro, s, count=1, flags=re.S)
    for old, title, body in findings:
        pattern = r'<div class="c-finding"><span>KẾT LUẬN NGHIÊN CỨU</span><h3>' + re.escape(old) + r'</h3><p>.*?</p></div>'
        s, n = re.subn(pattern, '<div class="c-finding"><span>INSIGHT · SUY LUẬN TỪ DỮ LIỆU</span><h3>'+title+'</h3><p>'+body+'</p></div>', s, count=1, flags=re.S)
        assert n == 1, (path, old)
    s, n = re.subn(r'<div class="c-reading"><b>Nguồn tăng trưởng có cơ sở</b>.*?</div>', category_logic, s, count=1, flags=re.S); assert n == 1
    s = s.replace('<h3 class="c-subtitle">Năm chương trình đối chiếu</h3><div class="provider-list">', competitor_matrix+'<details class="c-detail provider-prices"><summary>Giá, gói và điều kiện của năm chương trình</summary><div class="provider-list">')
    s, n = re.subn(r'</div><div class="c-reading"><b>Điều dữ liệu cho thấy</b>.*?</div><a class="c-source"', '</div></details>'+competitor_logic+'<a class="c-source"', s, count=1, flags=re.S); assert n == 1
    s = s.replace('<div class="c-reading"><b>Phân biệt ba trạng thái</b>', consumer_logic+'<details class="c-detail"><summary>Đã học, muốn mua và đã trả tiền</summary>')
    s = s.replace('<a href="#three-c-record-M3C-CC-117">Muốn học miễn phí</a></div>', '<a href="#three-c-record-M3C-CC-117">Muốn học miễn phí</a></details>')
    s = s.replace('<div class="c-reading"><b>Giới hạn về kết quả</b>', company_logic+'<details class="c-detail"><summary>Lời kể trải nghiệm và kết quả sau học</summary>')
    s = s.replace('<a href="#three-c-record-M3C-OQ-P2-001">Đối chiếu 56 dòng / 57 story</a></div>', '<a href="#three-c-record-M3C-OQ-P2-001">Đối chiếu 56 dòng / 57 story</a></details>')
    s, n = re.subn(r'<section class="cross-c" id="research-conclusions">.*?</section>', connection, s, count=1, flags=re.S); assert n == 1
    s = s.replace('research-v18', 'research-v19')
    f.write_text(s)
print('Four-C reasoning and combined conclusion written; all source browsers retained.')
