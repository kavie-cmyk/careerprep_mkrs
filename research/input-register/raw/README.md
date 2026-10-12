# MIA Category Research Pack — README

Gói dữ liệu thu thập phục vụ nghiên cứu Category cho chương trình "Marketing in Action" (CareerPrep Vietnam).
**Thuần thu thập dữ kiện — không chứa insight, định vị, chiến lược hay kết luận thị trường.**

## 1. Phạm vi và thời điểm nghiên cứu

- **Phạm vi Category:** "Khóa học ngắn hạn và chương trình nâng cao năng lực marketing cho người đi làm tại Việt Nam", gồm đào tạo cá nhân (B2C) và đào tạo doanh nghiệp (B2B).
- **Thời điểm chốt:** 08/10/2026 (múi giờ Việt Nam). Mọi quan sát giá/lịch mang `observed_date` 08/10/2026.
- **Ưu tiên dữ liệu 2025–2026;** dữ liệu lịch sử từ 2023 được giữ khi có, dữ liệu cũ hơn được ghi rõ là lịch sử. Lịch khai giảng sau 08/10/2026 được đánh dấu `lớp dự kiến` (kế hoạch tương lai), không tính là lớp đã tổ chức.
- **Dữ liệu đã có từ trước (không thu thập lại):** 24 CSV Google Trends (5 từ khóa, 10/2023–09/2026); 2 khảo sát MMA × Decision Lab (VN n=94, 10/2023–02/2024; SEA n=143, 2026); mô tả ban đầu 6 nhà cung cấp trên dashboard; ước tính đối tượng Meta (không dùng để ước tính nhu cầu mua khóa học).
- **Không sửa/thay thế các nguồn S01–S18 đã có trên dashboard.** Dữ liệu mới dùng ID tiền tố `M-`.

## 2. Danh sách file và số dòng thực tế

| File | Số dòng dữ liệu | Nội dung |
|---|---|---|
| `01_sources.csv` | 83 | Danh mục nguồn (M-S001→M-S417) |
| `02_evidence.csv` | 119 | Dữ kiện định lượng/định tính (M-E001→M-E453, M-E121/M-E122 tách từ M-E108) |
| `03_programs.csv` | 27 | Chương trình đào tạo (M-P101→M-P127) |
| `04_cohorts.csv` | 7 | Lớp khai giảng (M-C101→M-C107) |
| `05_learner_voices.csv` | 22 | Lời kể người học (M-V201→M-V222) |
| `06_search_demand.csv` | 240 | Nhu cầu tìm kiếm: 2 volume tuyệt đối + 238 truy vấn gắn nhãn ý định (M-K301→M-K540) |
| `07_task_log.csv` | 39 | Nhật ký nhiệm vụ + trạng thái (FOUND/PARTIAL/NOT_FOUND_PUBLIC/BLOCKED/NEEDS_INPUT) |
| `08_qa_log.csv` | 132 | 71 check QA độc lập + 61 dòng ghi nhận sửa lỗi đã áp dụng |
| `README.md` | — | File này |
| `proofs/` | 0 file | Không lưu bằng chứng nhị phân; URL + vị trí cụ thể (locator) trong mỗi dòng là đường dẫn truy xuất |

Tất cả CSV: UTF-8, có header, không gộp ô. Ô trống = dữ liệu chưa thu thập được, **không phải giá trị bằng 0**.

## 3. Bảng năm câu hỏi Category

| Câu hỏi (question_id) | Dữ liệu đã tìm được (ID liên quan) | Dữ liệu còn thiếu |
|---|---|---|
| **SIZE** — Quy mô thị trường trả phí | Học viên tích lũy tự công bố theo đơn vị: TM (M-E001/M-E002, mâu thuẫn 15.000+ vs ~30.000), AIM (M-E003/M-E004: 9.000+ vs 7.700+), Vinalink (M-E007/M-E008/M-E010: 15.000/20.000/50.000 — mâu thuẫn), Unica 200.000+ toàn nền tảng (M-E025), BRAND Camp 250+ khóa (M-E019); giá niêm yết/ưu đãi 27 chương trình (M-P101→M-P127) | **course_revenue: 0 đơn vị công bố** (M-T-A09 NOT_FOUND_PUBLIC); **actual_enrollment theo năm/quý: 0 đơn vị công bố**; unique_paid_buyers: chỉ có số lẻ tẻ (Unica 9.753 chưa rõ gồm học thử — M-E026); tỷ lệ lấp đầy/hoàn thành/mua lại: không có |
| **GROWTH** — Tăng trưởng hay bão hòa | Chuỗi cùng nhãn: AIM 7.700+→9.000+ (M-E003/M-E004), AIM B2B 60+→200+ chương trình (M-E005/M-E006), BRAND Camp 200+→250+ khóa 2023→2025 (M-E017→M-E019); search volume tuyệt đối PARTIAL: 2 biến thể từ ychoc.com ~2022 (M-K301/M-K302); 231 related queries gắn nhãn ý định (M-K303→M-K533) | Chuỗi tuyển sinh/doanh thu cùng định nghĩa qua các kỳ: **không có**; volume tuyệt đối cho 5 seed nguyên văn: NOT_FOUND_PUBLIC (cần Keyword Planner — NEEDS_INPUT) |
| **WHO** — Ai đang học | 22 lời kể: 2 độc lập (M-V201 review tiêu cực AIM; M-V202 tự xưng tinhte.vn), 20 do NCC tuyển chọn (WMS 11, CASK 3, TM 3, CAS 3); khảo sát PwC 2025 VN (M-E201→M-E203), Herbalife×OnePoll (M-E204) | Cơ cấu học viên thực tế (tuổi/nghề/kinh nghiệm) đại diện: **không có** — 20/22 lời kể do NCC chọn lọc, cấm dùng làm phân bố; lời kể prospective_learner thực chất: NOT_FOUND_PUBLIC |
| **WHERE** — Học ở đâu, hình thức nào | 27 chương trình với hình thức/giá/địa điểm (03_programs.csv); 7 lớp Vinalink có mã lớp + trạng thái (04_cohorts.csv); 3 lớp sau 08/10/2026 là kế hoạch tương lai | Tỷ trọng tuyển sinh theo hình thức/địa phương: **không có**; announced_capacity mọi lớp: NOT_FOUND_PUBLIC; lịch khai giảng HNAAu/AIM: NOT_FOUND_PUBLIC |
| **GROWTH_SOURCE** — Nguồn tăng trưởng | 5 tầng tách riêng: skill_gap (TopCV 27,51% — M-E403, đã xác minh qua baomoi.com; Navigos 76,8% — M-E404), desire_to_learn (Navigos 78,5% — M-E406; Anphabe 58% tự học AI — M-E408), planned_training (TopCV 59,1% — M-E401), approved_budget (HRD 2022 theo ngành — M-E439→M-E451), completed_transaction (FPT 98,8% — M-E427; British Council 2019 — lịch sử); nguồn chi trả gián tiếp: Luật Việc làm 2025 (M-E205), mẫu quy chế DN (M-E206) | Khảo sát hỏi trực tiếp "ai trả tiền" cho khóa marketing: **NOT_FOUND_PUBLIC** (M-E213, kết quả âm); ngân sách đào tạo **marketing** tách riêng: NOT_FOUND_PUBLIC; giá trị hợp đồng B2B: không có |

## 4. Nguồn/dữ kiện mâu thuẫn (giữ cả hai, không hòa giải)

1. **Tomorrow Marketers:** 15.000+ học viên (tin tuyển dụng ~01/2026, M-E001) vs "gần 30.000 học viên, 10 năm" (trang sự kiện 2025, đối chiếu trực tiếp, M-E002).
2. **Vinalink Academy:** 15.000+ (TopCV, M-E007) vs 20.000+ (saigonreview ~2026, M-E010) vs 50.000+ (trang vinalink.com 2018, M-E008); học viên/tháng: 400 (M-E012) vs 300–400 (M-E009) vs 500–600 (M-E011).
3. **AIM Academy:** 7.700+ (trang elearning cũ, M-E004) vs 9.000+ (trang chủ 2026, M-E003) — coi là chuỗi cùng nhãn nhưng trang cũ chưa đối chiếu trực tiếp được (fetch lỗi 08/10).
4. **Vinalink SEO AI 5.0:** 6 buổi (trang lịch khai giảng) vs 9 buổi × 3 giờ (trang khóa học) — M-E115.
5. **Vinalink Facebook AI Marketing:** gốc 9,9M/sớm 7,4M đã gồm VAT (trang chi tiết, đọc trực tiếp) vs snippet cũ 7,9M/5,9M — M-E103.
6. **Vinalink AI Marketing Plan:** sớm 7,9M (FAQ) vs 7,4M đã gồm VAT (bài editorial) — M-E104.
7. **Số 2.000 lượt/tháng** cho "khóa học marketing online" trong bài MONA Media là **ví dụ giả định** ("Giả sử..."), không phải số liệu — đã loại, ghi M-E303 để tránh nhầm với số 880/tháng của ychoc.com (M-K302).

## 5. Giới hạn truy cập và giới hạn phương pháp

- **Không vượt tường đăng nhập:** Facebook groups, trang review yêu cầu đăng nhập, Ahrefs/SEMrush/Ubersuggest bản trả phí, scribd — không truy cập, ghi BLOCKED/NEEDS_INPUT.
- **Search snippet chỉ dùng để tìm nguồn,** không làm bằng chứng đã xác minh (ngoại lệ duy nhất được ghi rõ: M-E004 trang elearning AIM fetch lỗi, ghi theo snippet + limitation).
- **Nguồn thứ cấp phổ biến:** nhiều số liệu chỉ qua báo chí dẫn lại (TopCV, Navigos, HRD, Ken Research) — `verification_status` phân biệt "đối chiếu nguồn gốc" / "công bố nhà cung cấp" / "tự thuật người học" / "chưa xác minh" từng dòng.
- **Lời kể công khai là mẫu tự chọn** (19/22 do NCC tuyển chọn, thiên lệch tích cực) — không dùng để tính tỷ lệ đại diện thị trường; đã gắn `provider_curated=yes`.
- **Trích dẫn nguyên văn ≤25 từ** mỗi nguồn; không lưu SĐT/email/dữ liệu cá nhân không cần thiết; không liên hệ người học.
- **Không cộng gộp** mẫu, học viên, doanh thu, tỷ lệ khác phạm vi/kỳ/phương pháp. Số "0" không xuất hiện với nghĩa "không có" — ô trống nghĩa là chưa thu thập được.
- **QA độc lập:** 71 check (10 PASS / 43 FAIL / 18 FLAG), không phát hiện dữ liệu giả mạo (11 URL spot-check khớp nội dung). Toàn bộ FAIL đã được điều phối viên sửa và ghi nhận trong `08_qa_log.csv` (mã QA-F101→). Lỗi nghiêm trọng nhất đã sửa: gán sai người↔lời kể ở 5 lời kể WMS (M-V207→M-V211, đối chiếu trực tiếp wms.vn).

## 6. Đầu vào cần người dùng cung cấp tiếp

1. **Tài khoản Google Ads (Keyword Planner)** — để lấy search volume tuyệt đối cho 5 seed + biến thể (hiện tại NEEDS_INPUT; Ahrefs/SEMrush BLOCKED).
2. **CRM / số liệu tuyển sinh / doanh thu / syllabus / kết quả học viên của chính Marketing in Action** — chưa được cung cấp (ghi NEEDS_INPUT theo quy tắc).
3. **Live browser hoặc Facebook CLI có đăng nhập** — để đếm sĩ số từ ảnh lớp khai giảng trên fanpage (TM, AIM, Vinalink) — agent A ghi NEEDS_INPUT (M-T-A11).
4. **Phê duyệt hỏi giá B2B trực tiếp** các đơn vị có mảng doanh nghiệp — 0 giá trị hợp đồng B2B được công bố công khai.
5. **Bản gốc khảo sát MISA 360 marketer** (nếu có quan hệ lấy được) — hiện chỉ có nguồn thứ cấp (M-E410).
