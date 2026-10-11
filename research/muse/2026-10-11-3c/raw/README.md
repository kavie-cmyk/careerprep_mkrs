# 3C — Competitor / Customer (alternatives + cases) / Company — bộ dữ liệu tổng hợp

Thu thập: **2026-10-11** (tất cả các worker). Tổng hợp từ 9 worker song song; KHÔNG có phân tích/insight/kết luận — chỉ gộp nguyên trạng.

## 1. Danh sách file

| File | Nội dung | Dòng dữ liệu |
|---|---|---|
| `competitor_programs.csv` | Chương trình đào tạo marketing của các NCC cạnh tranh (TM, AIM, HNAAu, Vinalink, BRAND Camp, DGM Asia, UAN, VietnamMarcom, PTI, IEIT, VietMoz, PACE, IMTA, EQVN, FPT Skillking, …) | 142 (42 w1a + 59 w1b + 41 w1c) |
| `alternatives.csv` | Giải pháp thay thế khóa học trả phí (tự học, cộng đồng, AI tools, mentoring, đào tạo doanh nghiệp) | 47 (28 w2a + 19 w2b) |
| `customer_cases.csv` | Lời kể người học: review, fanpage, diễn đàn, blog cá nhân, LinkedIn, báo chí (schema 27 cột) | 88 (59 w3a + 12 w3b + 17 w3c) |
| `company_facts.csv` | Sự kiện đã xác minh về CareerPrep / MIA | 48 (w4) |
| `evidence.csv` | Bằng chứng số liệu rời (value/unit/scope), liên kết entity + source | 158 (25+28+31+22+9+10+13+6+14) |
| `sources.csv` | Danh mục nguồn (đã khử trùng theo URL) | 180 (184 thô − 4 trùng) |
| `collection_log.csv` | Nhật ký thu thập: query/URL đã kiểm tra, kết quả, vấn đề | 176 |
| `README.md` | File này | — |
| `work/` | File gốc của 9 worker + script gộp `merge_3c.py` + `merge_stats.json` (vết provenance) | — |

## 2. Trường chính (giải thích ngắn)

- **competitor_programs.csv**: `program_id` (mã chương trình), `provider_name`, `program_name`, `official_url`, các trường `*_verbatim` (trích nguyên văn), `listed_price_vnd` / `promotional_price_vnd` / `promotion_conditions` / `price_observed_date` (giá và ngày đo), `source_ids` (nguồn, phân tách `;` cho dữ liệu w1a, `|` cho các worker còn lại), `missing_information` (thông tin chưa tìm thấy / mâu thuẫn ghi nhận).
- **alternatives.csv**: `alternative_id`, `name`, `alternative_type` (tự học / cộng đồng / AI tool / mentoring / đào tạo DN), `tasks_supported`, `price_and_conditions`, `supporting_excerpt`, `source_ids`.
- **customer_cases.csv**: `case_id`, `person_name_or_alias`, `role_verbatim`, `learner` / `payer` / `purchase_decision_maker`, `trigger_verbatim`, `task_or_problem_verbatim`, `chosen_solution`, `purchase_status`, `payment_evidence_verbatim`, `amount_paid_vnd`, các trường `*_verbatim` (lý do chọn/loại, rào cản, kênh thông tin, kỳ vọng, trải nghiệm, ứng dụng sau học), `outcome_verification`, `source_relationship`, `source_ids`, `duplicate_group`, `missing_information`.
- **company_facts.csv**: `fact_id`, `entity`, `program`, `topic`, `fact_description`, `supporting_excerpt`, `value`/`unit`/`period`, `source_type`, `source_ids`, `verification_status`, `missing_information`.
- **evidence.csv**: `evidence_id`, `research_area` (Competitor/Alternatives/Customer/Company), `entity_or_case_id` (mã entity HOẶC tên NCC ở cấp provider — xem ghi chú mục 6), `topic`, `factual_summary`, `verbatim_excerpt`, `source_id`, `source_location`, `event_date`, `value`/`unit`/`population_or_scope`, `commercial_relationship`, `verification_status`, `limitations`.
- **sources.csv**: `source_id`, `title`, `publisher`, `author_if_available`, `url`, `publication_date`, `access_date`, `source_type`, `commercial_relationship`, `access_status` (mức độ đọc được: toàn văn / một phần / chỉ snippet / blocked / kế thừa), `saved_file_if_any`.
- **collection_log.csv**: `log_id`, `research_area`, `entity_or_topic`, `query_or_url_checked`, `access_date`, `result` (kết quả truy cập), `issue` (vấn đề gặp phải), `related_source_ids` (có thể là chữ "không có" = không có source liên quan — xem L2a-008).

## 3. Phạm vi đã kiểm tra (theo worker)

- **w1a** (TM + AIM): 27 nguồn, 42 chương trình, 29 log. Đọc toàn văn đa số trang TM/AIM; một số trang chỉ trích xuất được một phần (curriculum + product offer, không thấy khối giá).
- **w1b** (HNAAu + Vinalink): 36 nguồn, 59 chương trình, 27 log. Ghi nhận: 2 URL bị 429 (3 lần thử), 1 URL không phân giải, 1 URL 404 (đoán sai), 1 trang không mở trong đợt này (giới hạn request).
- **w1c** (BRAND Camp, DGM Asia, UAN + VietnamMarcom, PTI, IEIT, VietMoz, PACE, IMTA, EQVN, FPT Skillking, …): 36 nguồn, 41 chương trình, 16 log. Trang chi tiết một số NCC không mở được (429, không thử lại theo quy định).
- **w2a** (tự học + cộng đồng): 23 nguồn, 28 alternatives, 15 log. Các group Facebook marketing bị BLOCKED (yêu cầu đăng nhập; subagent không có live browser) — L2a-008.
- **w2b** (AI tools + mentoring + đào tạo DN): 9 nguồn, 19 alternatives, 18 log. 3 lượt truy cập thất bại.
- **w3a** (review / fanpage / trang NCC): 29 nguồn, 59 case, 26 log. Mục đánh giá trên fanpage Facebook bị chặn (chỉ trả về stats, cần đăng nhập) — L3a-004. Một số nền tảng không có review người mua hiển thị.
- **w3b** (diễn đàn): 5 nguồn, 12 case, 12 log. Facebook group, Zalo, Discord yêu cầu đăng nhập/app — không truy cập được. Một số thread là bài PR của NCC (đã loại, không tạo case).
- **w3c** (blog cá nhân / social / LinkedIn / báo): 6 nguồn, 17 case, 22 log. TikTok và bài Facebook chặn đọc qua fetch text (yêu cầu đăng nhập). Kết quả quốc tế và blog của chính NCC ngoài phạm vi — không thu.
- **w4** (company: CareerPrep/MIA): 13 nguồn, 48 fact, 11 log. Tra cứu MST: không trả về bản ghi nào khớp "CTY TNHH CAREER PREP" (kết quả trả về là công ty khác). 1 lượt fetch thất bại do 429.

## 4. Thông tin chưa tìm thấy / chưa xác minh (tổng hợp từ các worker, nguyên văn rút gọn)

- Học phí nhiều khóa không công bố công khai (ghi trong `missing_information` từng chương trình: CP1a-022/023, CP2-xxx, PACE CMO…).
- VAT: nhiều NCC không ghi rõ VAT cho giá gốc (VD: CP2-001, CP2-007, CP2-034).
- Lịch khai giảng/số buổi/giảng viên của một số khóa chưa xác minh (chi tiết trong `missing_information`).
- Số liệu NCC tự công bố (học viên, doanh nghiệp) chưa kiểm chứng độc lập — ghi trong `limitations` của evidence (VD: E1a-005, E1a-006).
- Review trên fanpage Facebook các NCC: không đọc được mục đánh giá (cần đăng nhập) — w3a.
- Group Facebook/Zalo/Discord về học marketing: không truy cập được — w2a, w3b.
- TikTok: yêu cầu đăng nhập — w3c.
- MST "CTY TNHH CAREER PREP": không tìm thấy bản ghi khớp — w4.

## 5. Các trường hợp trùng (duplicate_group) — liệt kê, không diễn giải

- `DUP-AIM01 (trang lặp lại cùng quote 2 lần)` — CC1-014 (1 case)
- `DUP-GTV01 (quote 1 của cùng trang đã có ở XV-128)` — CC1-050 (1 case)

## 6. Mâu thuẫn giá / thông tin đã ghi nhận — liệt kê, không diễn giải

Mỗi mục: ID — trường — nội dung mâu thuẫn (giữ cả hai phía theo quy ước của worker).

- **CP1a-007 / CP1a-009** (`promotion_conditions`): giá combo TM Digital Foundation + Digital Performance — trang combo-pricing (đo 11/10) ghi 17.820.000đ → 11.556.000đ/combo; blog TM (đo 08/10) ghi 17.820.000đ → 11.583.000đ/combo.
- **CP1a-022 / CP1a-023 / CP1a-024** (`missing_information`/`curriculum`): chương trình Marketing Management của AIM — trang chương trình ghi 4 khóa, các trang khóa học thành phần ghi 5 khóa.
- **CP1a-028 / CP1a-029** (`curriculum`/`duration`): Creative Ideas — 7 buổi (trang chương trình) vs 8 buổi (homepage/lịch khai giảng).
- **CP1a-031** (`duration`): Event & Activation Management — 9 buổi (trang chương trình) vs 10 buổi (homepage).
- **CP1a-033 / CP1a-036 / CP1a-039** (`curriculum`/`missing_information`/`post_course_support`): chương trình Digital Marketing của AIM — trang chương trình ghi 6 khóa, trang Performance Digital Marketing ghi 5 khóa; tên khóa "Digital Planning" vs "Integrated Digital Planning".
- **CP1a-037** (`duration`/`missing_information`): Integrated Digital Planning — 9 buổi (curriculum trích xuất) vs 10 buổi (trang chương trình); tên khóa khác nhau giữa URL và trang chương trình.
- **CP2-001** (`promotion_conditions`/`missing_information`): HNAAu — trang chi tiết ghi đăng ký sớm giảm 2.500.000đ → còn 7.400.000đ; mục FAQ cùng trang ghi còn 7.900.000đ. Lịch học các ca mâu thuẫn (ghi cả hai).
- **CP2-003** (`duration`/`missing_information`): Vinalink — trang "Các khoá học" ghi 9 buổi × 3 giờ; trang "Lịch khai giảng" ghi 6 buổi; snippet ghi 6 buổi.
- **CP2-007** (`missing_information`): hình thức học — pack-v2 M-P140 ghi "online có GV", trang chi tiết ghi "Học qua Video".
- **CP2-019** (`missing_information`): chứng chỉ "Giám Đốc Digital Marketing" — giá liệt kê 31.000.000đ – 39.000.000đ (ghi nhận mâu thuẫn, chi tiết trong file).
- **CP2-034** (`duration`/`missing_information`): 2 buổi (bảng nội dung) vs 3 buổi (bảng giá).
- **CP3-013** (`duration`): DGM Asia — trang giới thiệu ghi 20 buổi, khối giá cùng trang ghi 22 buổi.
- **CP3-015** (`listed_price_vnd`): UAN Mentoring — mentoring.uan.vn ghi phí Mentor 500.000đ; mentorship.uan.vn ghi Mentor chuyển khoản 1.000.000đ trước Matching Day.
- **CP3-016** (`duration`): EQVN — 33 buổi (eqvn.net) vs 37 buổi (lịch khai giảng eqvn.edu.vn) vs 46 buổi học trực tuyến (mẫu email).
- **CP3-021** (`curriculum`/`duration`): FPT Skillking — 18 tháng/3 học kỳ (bản mới) vs 2 năm/4 học kỳ (bản cũ).
- **CF-009** (`fact_description`/`verification_status`): ưu đãi "Giảm 500.000 khi đăng ký trước ngày 20 hàng tháng" có trong báo cáo nội bộ 2026-10-07 nhưng không còn tìm thấy trên landing khi mở lại ngày 2026-10-11.
- **CF-031** (`fact_description`): footnote trang CareerPrep ghi "Mức chi phí cho 01 tháng sử dụng tài khoản" trong khi mô tả khóa ghi 6 tháng.
- **CF-037** (`fact_description`): trang "Về CareerPrep" (nội dung ~2021) mô tả Hưng Lưu là Senior Media Manager tại PMAX / Giám đốc Marketing tại BHL Education; landing các khóa 2026 ghi Former Senior Growth Manager (chức danh khác thời điểm).
- **E1a-005 / E1a-006** (`limitations`): AIM tự công bố 9000+ học viên / 200+ chương trình DN; trang elearning cũ ghi 7700+ / 60+.
- **E1a-008** (`factual_summary`/`limitations`): homepage AIM ghi 20 khóa học; 3 trang chương trình hiện tại cộng lại = 15 khóa.
- **E1b-xxx** (`limitations`): các mức số liệu học viên Vinalink từ nguồn thứ ba mâu thuẫn nhau và với mức NCC tự công bố (E1b-002, E1b-004, E1b-005, E1b-006, E1b-007, E1b-021); năm bắt đầu mảng đào tạo 2009 vs 2011 (E1b-018).
- **E2a-014** (`limitations`): số liệu thành viên group mâu thuẫn, chưa xác minh (không truy cập được group gốc).
- **E4-007** (`limitations`): footnote 01 tháng vs 6 tháng tài khoản học tập (khóa video CareerPrep) chưa được làm rõ.
- **L1a-028 / L1c-003 / L1c-006 / L1c-008 / L1c-010 / L4-007** (collection_log): các mâu thuẫn trên đã được ghi nhận ở cấp log.

## 7. Ghi chú kỹ thuật

- **Tiền tố ID**: worker w1a dùng `CP1a-###` (thay vì `CP1`) cho mã chương trình TM/AIM — giữ nguyên vì ID đã duy nhất trong file gộp. Các worker khác: `CP2` (w1b), `CP3` (w1c), `ALT1` (w2a), `ALT2` (w2b), `CC1` (w3a), `CC2` (w3b), `CC3` (w3c), `CF` (w4). Evidence: `E1a/E1b/E1c/E2a/E2b/E3a/E3b/E3c/E4`. Sources: `S1a/S1b/S1c/S2a/S2b/S3a/S3b/S3c/S4` (riêng w4 dùng `S4-###`, không có chữ cái giữa). Log: `L1a/L1b/L1c/L2a/L2b/L3a/L3b/L3c/L4`.
- **Khử trùng sources** (theo URL chính xác, 4 cặp; ưu tiên bản đọc toàn văn / access_status tốt hơn):

| Bỏ | Giữ | URL |
|---|---|---|
| S3a-004 | S1a-016 | https://aimacademy.vn/khoa-hoc/digital-marketing/ |
| S1c-035 | S2b-002 | https://www.brandsvietnam.com/congdong/topic/336771-mo-don-dang-ky-chuong-trinh-uan-mentoring-1-on-1-season-4 |
| S3a-001 | S3c-001 | https://baomoi.com/c55162288.epi |
| S3c-003 thay cho S3a-002 | S3c-003 | https://thanhphohaiphong.gov.vn/su-that-dang-sau-nhung-khoa-hoc-ban-hang-online-ngay-chot-tram-don.html |

  Các tham chiếu `source_ids`/`source_id`/`related_source_ids` trong 6 file còn lại đã được remap sang ID được giữ (23 ô đã đổi giá trị). Lưu ý: cặp S1a-016/S3a-004 có mô tả nội dung khác nhau (trang chương trình chính thức vs mục Đánh giá của học viên) nhưng URL trùng chính xác nên gộp theo quy tắc.
- **Không khử trùng**: 3 dòng có URL là `(file nội bộ, không URL công khai)` (S2a-018, S2a-019, S2a-023) được giữ nguyên cả 3 — đây là placeholder, không phải URL thật; mỗi dòng là một file nội bộ khác nhau.
- **Dấu phân tách nhiều ID**: `;` trong dữ liệu w1a (kế thừa format worker), `|` trong các worker còn lại — giữ nguyên format gốc từng dòng khi remap.
- **`entity_or_case_id` trong evidence.csv** có thể là mã entity (CP/ALT/CC/CF) hoặc tên NCC ở cấp provider (VD: "AIM Academy", "Vinalink Academy") — theo đúng cách worker ghi, không chuẩn hoá.
- **Lỗi đã sửa trong quá trình gộp**: 4 remap khử trùng sources (bảng trên); 1 giá trị chữ "không có" ở `related_source_ids` (L2a-008) được công nhận là hợp lệ (nghĩa: không có source liên quan), không phải tham chiếu treo. Không phát hiện lệch cột hay ID trùng trong file worker.
- **Kiểm tra trước khi ghi** (bằng `work/merge_3c.py`): mọi CSV parse được bằng `csv` module; header đúng thứ tự schema gốc; ID duy nhất trong từng file; mọi `source_id` tham chiếu đều tồn tại trong `sources.csv`; ô chứa dấu phẩy/xuống dòng được đặt trong ngoặc kép (QUOTE_MINIMAL); file ghi UTF-8 (không BOM).
