# MIA Category Research Pack v2 — README thay đổi

Ngày chốt nghiên cứu: 08/10/2026 (giờ VN). Vòng 2: xác minh + lấp khoảng trống + đóng 5 câu hỏi.
Bộ gốc (pack v1) giữ nguyên tại `../pack-20261008/` để truy vết. Mọi thay đổi ở v2 đều ghi nhật ký, không sửa âm thầm.

## Danh sách file và số dòng thực tế

| File | Dòng dữ liệu | Thay đổi so với v1 |
|---|---|---|
| 01_sources.csv | 178 (83 cũ + 95 mới M-S418→) | +95 nguồn mới vòng 2 |
| 02_evidence.csv | 274 (119 cũ + 155 mới M-E454→) | Áp kết quả xác minh vào cột limitation (79 giữ, 38 hạ mức, 1 mâu thuẫn, 1 loại); M-E109 vô hiệu hóa claim theo QA2-01 |
| 03_programs.csv | 82 (27 cũ + 55 mới M-P128→) | +55 chương trình (7 NCC mới + liền kề) |
| 04_cohorts.csv | 7 | M-C107 đánh dấu "loại khỏi phân tích" (QA2-01) |
| 05_learner_voices.csv | 22 | Giữ nguyên (xác minh: 20/22 do NCC tuyển chọn) |
| 06_search_demand.csv | 240 | Giữ nguyên (bộ user 10/2023–09/2026 là chính theo QA2-03) |
| 07_task_log.csv | 48 (39 cũ + 9 mới V2-T01→V2-T09) | +9 bế tắc vòng 2 |
| 08_qa_log.csv | 143 (132 cũ + 11 mới) | +2 FAIL đã sửa, +8 FLAG đã xử lý, +1 PASS tổng |
| 09_verification.csv | 119 | MỚI: kết quả xác minh từng dòng (4 thuộc tính A–D + bằng chứng đối chiếu + người kiểm tra) |
| 10_gap_closure.csv | 5 | MỚI: khoảng trống từng câu hỏi + trạng thái đóng |
| 11_market_estimates.csv | 1 | MỚI: mô hình minh họa Vinalink 18–50,4 tỷ VND/năm (giả định, 1 NCC — KHÔNG suy rộng) |
| 12_category_conclusions.md | 5 câu hỏi | MỚI: trả lời + trạng thái đóng từng câu |
| proofs/ | README + 4 claim | MỚI: trích dẫn ngắn cho claim quan trọng (Vinalink 73k, BRAND Camp 53 in-house, giá AIM theo cặp, chuỗi giá Vinalink) |

## Dữ kiện bị loại / sửa và lý do

1. **M-E109 + M-C107 — LOẠI** (QA2-01): nguồn là bài bế giảng Facebook Marketing K86 ngày 27/12/2019, không hỗ trợ claim "130 học viên / 04/03/2026 / khóa Digital Marketing Plan AI". Dòng giữ lại để truy vết, claim vô hiệu hóa.
2. **SG-E027 (mới) — SỬA** (QA độc lập v2): đã xóa số "130 người" vì vi phạm QA2-01.
3. **PF-060 (mới) — SỬA**: khôi phục URL đầy đủ từ verification M-E021.
4. **38 dòng hạ mức** theo verification: ghi rõ trong limitation (tiếp cận snippet, hỗ trợ một phần, hoặc chỉ dùng làm bối cảnh).
5. **8 FLAG QA v2** đã xử lý: chuỗi giá Vinalink (mốc 2020 yếu — litado 404), nhãn chuỗi BRAND Camp ("tín hiệu"), mốc saigonreview (~2024), "trung tâm ~31"→"~34", PF-029 "chưa rõ đơn vị" (QA2-11), URL TikTok F-L20, claim Top 6/10 BRAND Camp, tham chiếu nội bộ G-F206.
6. **README v1** đếm sai 19/22→20/22 curated (QA2-12): v2 ghi đúng 20/22.

## Mâu thuẫn chưa giải quyết (giữ cả hai, không chọn số đẹp)

- Vinalink lifetime: 15.000+ / 20.000+ / 50.000+ / 73.000+ (73k đã xác minh có thật trên web).
- TM lifetime: 15.000+ vs 30.000+.
- Trang TM: audit ghi lịch 09/11/2026, verification đọc được 01/10/2026 — trang đã cập nhật; chỉ dùng như lịch công bố (QA2-02).

## Giới hạn truy cập và phương pháp

- 4/119 dòng v1 không tiếp cận được nguồn (404/403/URL cắt cụt/kết quả âm).
- Wayback CDX lỗi upstream 500 — bỏ, không thử lại.
- Đếm sĩ số lớp từ ảnh fanpage: cần live browser/FB CLI (NEEDS_INPUT).
- Search volume tuyệt đối 5 seed: NOT_FOUND_PUBLIC (cần Keyword Planner).
- File thô 5 nhóm + QA giữ trong `raw/` để đối chiếu kiểm toán.

## Đầu vào cần tiếp (gộp)

1. Dữ liệu nội bộ MIA: syllabus, học phí, giảng viên, alumni, tuyển sinh các khóa trước (V2-T09).
2. Phê duyệt hỏi giá B2B trực tiếp 5 NCC (V2-T05).
3. Thiết kế khảo sát người học: "ai trả tiền", tỷ lệ trùng NCC, rào cản (V2-T04, V2-T06).
4. Live browser/FB CLI có đăng nhập để đếm sĩ số lớp (V2-T03).
5. Tài khoản Google Ads (Keyword Planner) cho search volume tuyệt đối.

Không có insight/chiến lược trong gói này — chỉ dữ liệu và đánh giá điều kiện đóng.
