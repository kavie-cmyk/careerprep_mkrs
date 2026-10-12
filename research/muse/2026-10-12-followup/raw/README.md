# Gói bổ sung dữ liệu 3C CareerPrep — ccc-followup-20261011

Ngày thu thập: 2026-10-11. Phạm vi: THUẦN THU THẬP DỮ LIỆU — không phân tích, không insight, không kết luận, không đề xuất.

## File trong gói

| File | Số dòng dữ liệu | Nguồn gộp |
|---|---|---|
| [program_updates.csv](program_updates.csv) | 331 | raw_p1a_program_updates (13) + raw_p1b_program_updates (16) + raw_p4_program_updates (302) |
| [practice_and_feedback.csv](practice_and_feedback.csv) | 98 | raw_p2_practice.csv (42) + 57 story Instagram highlight M3C-PF-043→099 (12/10) |
| [customer_cases_new.csv](customer_cases_new.csv) | 36 | raw_p3a_cases (18) + raw_p3b_cases (7) + 8 bài LinkedIn M3C-CC-107→114 + 3 tín hiệu cân nhắc M3C-CC-115→117 (12/10) |
| [sources_new.csv](sources_new.csv) | 83 | 6 file raw_*_sources (5+12+14+10+5+29) + M3C-S-P2-003 cập nhật đọc đầy đủ + 8 nguồn LinkedIn M3C-S-P5-001→008 (12/10) |
| [collection_log_new.csv](collection_log_new.csv) | 133 | 6 file raw_*_log (110) + 17 dòng truy vết trùng (M3C-L-DEDUP-01→17) + M3C-LG-LI-001/002, M3C-LG-TT-001/002/003, M3C-LG-IG-001 (12/10) |
| [open_questions.csv](open_questions.csv) | 47 | 6 file raw_*_open (43) + 4 mục dữ liệu nội bộ M3C-OQ-INT-001→004 |

File raw gốc của 6 worker giữ nguyên trong [work/](work/) — không ghi đè.

## Trạng thái câu hỏi mở theo ưu tiên

- **Ưu tiên 1** (P1a/P1b + 4 mục nội bộ, 17 câu): 1 câu "đã xác định một phần" (CG-PU-01: điều kiện hiện tại là ngày 15; mốc thời gian thay đổi chưa rõ); 2 câu "còn mâu thuẫn" (M3C-OQ-P1a-004, M3C-OQ-P1b-002); các câu còn lại ở trạng thái mở/chưa xác định (giá TM gán nhãn chưa chắc chắn, trang không công bố, chờ đơn vị xác nhận…); 4 mục M3C-OQ-INT-001→004 ở trạng thái "cần CareerPrep cung cấp nội bộ" (xem dưới).
- **Ưu tiên 2** (P2, 7 câu): tất cả "chưa giải quyết" — Instagram highlight cần đăng nhập; số lượt phản hồi sheet chỉ có ước tính ~2.100–2.200; deck final MoMo x ePass không có; khóa Social Media AI chưa có bằng chứng bài cuối khóa công khai; rubric chấm điểm không công bố.
- **Ưu tiên 3** (P3a/P3b, 8 câu): P3a thu được 16 case mới + 2 trùng (phần lớn là lời chứng thực nhà cung cấp); P3b không tìm thấy case mới cho Vinalink/HNAAu, 1 case mới (Quan Nguyen, LinkedIn); không tìm thấy case từ chối/bỏ học có lý do cụ thể.
- **Ưu tiên 4** (P4, 15 câu): 13 "chưa xác định", 2 "còn mâu thuẫn"/"còn mâu thuẫn nguồn".

## Nguồn đọc đầy đủ / một phần / bị chặn

- Đọc toàn văn: phần lớn trang khóa học chính thức (CareerPrep, TM, AIM, Vinalink, HNAAu, BRAND Camp, SEONGON…), 3 file HTML CareerPrep lưu tại work/ (cp_digital-marketing-in-action.html, cp_marketing-foundation-in-action.html, cp_social-media-ai-in-action.html), bài LinkedIn, bài báo, thread VOZ.
- Đọc một phần: Google Sheet feedback — chỉ render được cửa sổ dòng 1113–1204 qua giao diện (giới hạn virtualization); đã export CSV toàn bộ tab (6.345 dòng text) để ước tính; trang Google Sites Vinalink (mở trực tiếp bị chuyển sang trang đăng nhập Google — chỉ đọc qua search index snippet); FAQ SEONGON — chỉ đọc được snippet (mục FAQ chỉ hiện câu hỏi, không hiện nội dung trả lời trong bản trích xuất); một số trang TM chỉ hiện curriculum, khối giá không hiển thị.
- Bị chặn: Instagram stories highlight "Cảm nhận sau khi kết thúc khóa học" — HTTP 403 (cần đăng nhập); đã lấy được URL chính xác từ trang khóa (M3C-S-P2-003).

## Giá còn mâu thuẫn (chưa giải quyết)

- **CG-PU-01** (M3C-PU-001, CareerPrep Marketing in Action): ghi chú nội bộ 07/10 ghi "giảm 500K khi đăng ký trước ngày **20** hàng tháng"; trang hiện tại (11/10) ghi "giảm 500K khi đăng ký trước ngày **15** hàng tháng". Mốc thời gian thay đổi chưa rõ.
- **CG-PU-02** (M3C-PU-009/010, Social Media AI in Action): trang ghi giá gốc 4.890.000đ → 3.200.000đ kèm chữ "Giảm 30% chỉ trong tháng này" — 3.200.000đ thực tế tương đương giảm ~34,56%, không phải 30%; đoạn hướng dẫn chuyển khoản chỉ ghi giá gốc 4.890.000đ, không ghi giá ưu đãi.
- **CG-TM-COMBO** (M3C-PU-106, Tomorrow Marketers): trang combo (11/10) hiển thị HAI mức cho HAI combo khác nhau — 17.820.000đ → 11.556.000đ và một combo khác → 11.583.000đ; blog TM (08/10) ghi 11.583.000đ.
- **CG-VL-3C** (M3C-PU-108/109, Vinalink Agentic Content Marketing 3C): khối CHÍNH SÁCH HỌC PHÍ ghi gốc 9.900.000đ / giảm còn 7.400.000đ; mục FAQ cùng trang ghi gốc 8.900.000đ / sớm còn 6.900.000đ / nhóm 3+ còn 5.900.000đ.
- **CG-TM-GRID** (M3C-PU-104/M3C-PU-107, TM AI Digital Marketing): M3C-PU-104 — bảng giá sinh viên gán nhãn cột chưa chắc chắn; M3C-PU-107 — footer trang hiển thị "ƯU Đãi khi đăng kí trước ngày 17/12: Đăng kí đơn còn 3.590.000đ; nhóm 2+ còn 3.390.000đ" — mức giá không tương ứng với khóa AI Digital Marketing (Standard 8.910.000đ); khóa áp dụng CHƯA xác định.
- **CG-BC-PROMO** (M3C-PU-115, BRAND Camp): ưu đãi 30% ghi nhận qua snippet ~27/09/2026; trang chủ mở ngày 11/10 không thấy banner ưu đãi 30% cho khóa Foundation of Digital Marketing.

## Trùng đã xử lý (từ raw_p3b_dedup.csv; 2 dòng cuối do QA bổ sung 11/10 — cùng nội dung, worker khác đăng ký source riêng)

| Cặp | Kết quả |
|---|---|
| CC3-001 ↔ CC1-003 | trùng đã xác nhận (cùng bài baomoi.com/CATP 15/05/2026) |
| CC3-002 ↔ CC1-004 | trùng đã xác nhận (cùng bài baomoi.com/CATP 15/05/2026) |
| CC3-003 ↔ CC1-002 | trùng đã xác nhận (cùng bài baomoi.com/CATP 15/05/2026) |
| CC3-004 ↔ CC1-001 | trùng đã xác nhận (cùng bài baomoi.com/CATP 15/05/2026) |
| CC3-010 ↔ CC1-005 | trùng đã xác nhận (cùng bài Báo Lao Động ~14/07/2024) |
| CC1-050 ↔ XV-128 (hypothesis-test extra_voices) | trùng đã xác nhận — KHÔNG tính người mới; matched_old_case_id: XV-128; duplicate_group: DUP-GTV01 |
| CC1-055 ↔ HTE-101 (hypothesis-test evidence) | trùng đã xác nhận — KHÔNG tính người mới; matched_old_case_id: HTE-101 |
| CC3-012 / CC3-013 / CC3-014 ↔ M-E485 (pack-v2 Category, bài ZNews 04/07/2022) | trùng đã xác nhận — KHÔNG tính người mới; matched_old_case_id: M-E485 |
| M3C-CC-001 ↔ M3C-CC-106 | trùng đã xác nhận (cùng bài LinkedIn của Quan Nguyen; 2 source M3C-S-P3a-001/M3C-S-P3b-001 cùng URL) — duplicate_group: DUP-LINKEDIN-1 |
| M3C-CC-005 ↔ M3C-CC-100 | trùng đã xác nhận (cùng bài blog ẩn danh Decor Hà Nội; 2 source M3C-S-P3a-004/M3C-S-P3b-002 cùng URL) — duplicate_group: DUP-DECOR-1 |

- CC1-058 / CC1-059: **giữ trạng thái chưa rõ** — nguồn Google Sites chưa xác minh được chủ thể/quan hệ thương mại; không tự kết luận.
- CC2-002 / CC2-004 / CC2-007 / CC2-010 / CC2-012: **giữ là ý kiến, không phải người mua** — đã xác nhận, không nâng thành case người mua.
- 17 dòng truy vết tương ứng đã thêm vào collection_log_new.csv (M3C-L-DEDUP-01→17).
- 2 dòng M3C-DUP-001/002 của P3a được GIỮ LẠI trong customer_cases_new.csv, đã điền matched_old_case_id (CC1-007, CC1-016) và duplicate_group (DUP-AIM-1, DUP-AIM-2) — không xóa.

## 4 mục dữ liệu nội bộ bổ sung (brief mục 7)

Đã thêm vào open_questions.csv với finding_status = "cần CareerPrep cung cấp nội bộ":

- M3C-OQ-INT-001: số người hỏi tư vấn / đăng ký trả tiền / thực học / người trả học phí theo khóa và kỳ tuyển sinh.
- M3C-OQ-INT-002: tiền thực thu, chiết khấu, hoàn tiền; nguồn tuyển sinh và chi phí tương ứng.
- M3C-OQ-INT-003: chi phí giảng viên/trợ giảng, thời gian chữa bài, sĩ số tối đa và khả năng mở thêm lớp.
- M3C-OQ-INT-004: số hoàn thành bài cuối khóa, bài làm có quyền dùng trong tuyển sinh, phản hồi cả người hoàn thành lẫn người bỏ học.

## Ghi chú kỹ thuật (không thay đổi dữ kiện)

- raw_p2_practice.csv có 33 dòng bị lệch cột do dấu phẩy không được quote trong ô text (worker P2); đã căn lại đúng thứ tự 17 cột schema bằng cách: nhận diện đuôi source_relationship/source_ids (M3C-S-P2-xxx)/limitations, nối lại các mảnh text bị tách. Nội dung ô giữ nguyên.
- raw_p2_open.csv có 5 dòng lệch cột tương tự (M3C-OQ-P2-001/004/005/006/007); đã căn lại 8 cột. Các ô reason_unresolved bị worker bỏ sót được để trống.
- 5 dòng "lời hứa trang bán khóa" (M3C-PF-034→038): worker NHẤT QUÁN đặt giá trị này ở cột assignment_description (record_type để trống) — giữ nguyên vị trí cột của worker, không dời.
- Kiểm tra: ID duy nhất trong từng file và toàn gói (tiền tố M3C-); mọi source_ids trong 3 file dữ liệu đều tồn tại trong sources_new.csv; 6 file parse được bằng python csv (UTF-8); chỉ 1 ô dùng chữ "đã xác minh" (M3C-PU-100, original_value — có cơ sở: nguồn M3C-S-P1b-001 đọc toàn văn 250 dòng trang chính thức); 229 ô "không thấy trong nguồn đã đọc" giữ nguyên; quét các cụm "có thể/chắc chắn/kết luận/do đó" — các hit còn lại đều là lời của nguồn/người học được thuật lại hoặc câu chữ cẩn trọng của worker (VD: "KHÔNG kết luận…", "gán nhãn chưa chắc chắn"), không phải suy đoán mới.

## Việc còn dở

- **Source M3C-S-P4-014** (trang "Khóa học bán hàng online đa kênh" của Học Viện Marketing Á Âu — hocvienmarketingaau.com/khoa-hoc-ban-hang-da-khenh/, đã đọc toàn văn 195 dòng ngày 11/10): findings chưa kịp đưa vào build của worker P4. Đã ghi nhận trong collection_log_new.csv (M3C-L-P4-014) và open_questions.csv (M3C-OQ-P4-002) — cần một lượt bổ sung để ghi findings vào program_updates.csv.

## Bổ sung ngày 12/10/2026 (sau đăng nhập của user)
- **Instagram** (M3C-OQ-P2-001 → đã trả lời): đọc toàn bộ 57 story highlight "Cảm nhận sau khi kết thúc khóa học" sau khi user đăng nhập (trước đó 403). Ghi 57 dòng M3C-PF-043→099, record_type "đánh giá sau khóa (testimonial do NCC đăng lại)" — không phải mẫu độc lập; mọi claim việc làm/lương/kết quả đều là lời kể trong story do NCC chọn đăng, không có bằng chứng độc lập.
- **LinkedIn** (M3C-OQ-P3a-003 → đã trả lời âm tính): 15 bình luận dưới bài Quan Nguyen — không có bình luận nào về cân nhắc/mua/trả học phí.
- **LinkedIn mở rộng**: 8 bài học viên mới (Quynh Huong Pham Nguyen, Thao N., Irene Nguyen, Lê Hữu Nghĩa, Trần Dũng, Huong Nguyen, Hien Do, Thai Hoa Tran Ngoc) + 3 tín hiệu cân nhắc mua trong bình luận. Tất cả 9 bài đều tích cực; không có review tiêu cực; không tìm được bài học viên TM/AIM hay bài về Social Media AI in Action.
- **TikTok đợt 1**: đọc 8/10 video — comment chủ yếu hỏi giá/đăng ký, không có luồng so sánh 6 đơn vị. 2 video không đọc được (CAPTCHA slider vẫn hiện sau đăng nhập; comment không tải được).
- **TikTok mở rộng**: tìm được 13 video đúng chủ đề (có video học viên CareerPrep/AIM/Vinalink); comment cả 13 video bị rate-limit không render — user quyết định danh sách video là đủ, không thử lại.
- **Facebook** (qua facebook-cli, không cần đăng nhập): 3 bài do NCC đăng, 0 case mới; phát hiện bài tập cuối khóa TM nằm trên YouTube (2 video); group riêng tư không vào được; review fanpage cần live browser (chưa làm).
- Kiểm tra cuối 12/10: ID duy nhất toàn gói, mọi tham chiếu M3C-S-* đều tồn tại trong sources_new.csv, 6 file parse OK (UTF-8).
