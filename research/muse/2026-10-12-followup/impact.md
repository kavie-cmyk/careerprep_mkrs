# Điều chỉnh kết luận sau bộ bổ sung 12/10/2026

Đã đọc README và toàn bộ 728 dòng của sáu CSV: 331 cập nhật chương trình, 98 bản ghi bài tập/phản hồi, 36 trường hợp khách hàng, 83 nguồn, 133 nhật ký và 47 câu hỏi. Những số này là dòng dữ liệu, không phải số người hoặc chương trình độc lập.

## Kết luận nghiên cứu theo 4C

- **Category:** nhu cầu đang phân hóa theo nhiệm vụ học; AI mở thêm sự quan tâm, lập kế hoạch và đo lường có căn cứ từ yêu cầu nghề và lời kể. Bộ mới không cập nhật Google Trends, mẫu tuyển dụng hay mẫu câu hỏi AI, nên giữ đúng các mẫu đó. Chưa có giao dịch cùng kỳ để đo quy mô hay tăng trưởng doanh số toàn thị trường.
- **Competitor:** AI, bài tập và góp ý đã có ở nhiều chương trình. Khác biệt công khai là hình thức, phạm vi, đầu vào, bài cá nhân/nhóm và hỗ trợ. Giá phải đọc cùng gói, số người và ngày ghi nhận; không xếp chất lượng giảng dạy từ nội dung công bố.
- **Consumer:** nhu cầu hệ thống kiến thức có ở cả người đã đi làm, không chỉ người mới/chuyển ngành. Có lời kể học thêm sau khi tự học chưa hiệu quả, nhưng thanh toán và nguyên nhân chọn mua phần lớn chưa rõ. Không coi hỏi tài liệu hoặc muốn học miễn phí là ý định mua khóa trả phí.
- **Company:** Foundation và Digital có thêm lời kể cá nhân về bài tập/góp ý; Social AI còn thiếu sản phẩm học viên tương ứng trong bộ đã nhận. Đây là căn cứ về quá trình học, chưa xác minh mức cải thiện, việc làm, lương hay hiệu quả quảng cáo.

Báo cáo được trình bày cho nhân viên nghiên cứu thị trường gửi trưởng phòng Marketing, với bốn C ngang hàng. Không đưa kế hoạch tuyển sinh, ưu tiên chạy quảng cáo hoặc phân bổ ngân sách vào kết luận nghiên cứu.

## Cách xử lý các vấn đề trong dữ liệu

- CSV có 56 dòng story (M3C-PF-043–098), cùng 42 dòng trước đó = 98. README/log nói 57 story và PF-099, nhưng nguồn cũng ghi một story không đọc được. Không tạo thêm dòng; không tính số người độc lập hoặc tỷ lệ có việc từ story.
- Quan Nguyen và bài Decor Hà Nội mỗi người có hai dòng trong bộ mới. Hai dòng AIM đã trùng bộ cũ. Bài của Quynh Huong được ghi cả ở practice và customers; Trần Dũng kể cùng nhóm MoMo x ePass. Không cộng thành các dự án độc lập hay nối thành trước/sau.
- M3C-CC-100 suy trả tiền từ việc đã học khóa có thu phí; lớp đánh giá chỉ ghi đã học, thanh toán chưa xác nhận. Ba bình luận LinkedIn gồm một hỏi thông tin, một xin kế hoạch và một muốn học miễn phí, không phải ba người có ý định mua.
- Huong Nguyen kể về Data Foundation của Hưng Lưu; chưa xác nhận khóa thuộc CareerPrep và không gán thành kết quả Digital Marketing in Action.
- Một số ô URL chứa mảnh câu; năm dòng thông tin trang bán khóa đặt loại bản ghi ở cột khác; M3C-OQ-P2-002 lệch ý nghĩa cột. Giữ nguyên byte CSV, thêm ghi chú và cách đọc ở lớp đánh giá.
- Không dùng 6.345 dòng văn bản, ước 2.100–2.200 phản hồi hay điểm 9,5 do sheet tự tính làm mẫu số/điểm toàn bộ người học.
- Kết quả âm tính trong 15 bình luận Quan Nguyen không phủ định các bài học viên P5 mới. README nhắc hai video YouTube của TM nhưng gói không có URL/source để kiểm tra; chưa dùng làm bằng chứng sản phẩm học viên.

## Việc cần bổ sung có ảnh hưởng quyết định

CareerPrep cung cấp số tuyển sinh trả tiền, thực thu, hoàn tiền, chi phí tuyển sinh và giảng dạy, khả năng hỗ trợ mỗi lớp; bài thật cùng nhận xét, quyền dùng bài và phản hồi người bỏ học. Muse tiếp tục thu thập đúng các khoảng trống công khai trong `muse_remaining_prompt.md`; không tìm doanh thu nội bộ từ chỉ số mạng xã hội.
