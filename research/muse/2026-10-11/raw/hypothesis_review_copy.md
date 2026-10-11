# Đánh giá giả thuyết — Cơ hội đào tạo marketing cho người đi làm tại Việt Nam

- **Ngày:** 10/10/2026 · **Bổ sung 11/10/2026:** vét review sàn khóa học (54 review, `reviews_mining.csv`; dòng tổng hợp HTE-357→HTE-364) · **Phạm vi:** nguồn công khai · **Dữ liệu:** `evidence.csv` (96 dòng: 88 dòng cũ ID HTE-001→HTE-356 + 8 dòng tổng hợp review ID HTE-357→HTE-364)
- **QA độc lập:** 34 PASS / 4 FLAG / 0 FAIL trên 38 evidence quyết định (`raw/qa_report.md`); QA vòng review-mining kiểm tra các dòng tổng hợp mới (ghi trong `raw/qa_reviews_mining.md`)
- **Bổ sung 11/10/2026 (JD):** mở rộng mẫu JD kiểm tra vế (a) của H1 từ 14 lên **112 JD unique** đọc được toàn văn (`jd_sample.csv`, JD-001→JD-112; TopCV 48, LinkedIn Jobs VN 43, CareerViet 21)
- **Quy ước đọc:** "DỮ KIỆN" = điều nguồn thể hiện trực tiếp; "SUY LUẬN" = điều team diễn giải từ dữ kiện. Mọi nhận định dẫn `evidence_id` + URL.

---

## H1 — Bài toán quản trị chiến dịch

**Nội dung:** Trong nhóm marketer/quản lý marketing đang làm việc tại VN, lập ngân sách, đặt/đọc KPI, tối ưu chiến dịch và quản lý agency là các vấn đề lặp lại khiến họ chủ động tìm hỗ trợ hoặc đào tạo.

### Bằng chứng mạnh nhất ủng hộ (phân theo 3 vế)

**Vế (a) — việc trong JD (mở rộng 11/10/2026: n=112 unique):**
- DỮ KIỆN: 112 JD marketing đọc được toàn văn (`jd_sample.csv`, JD-001→JD-112; TopCV 48, LinkedIn Jobs VN 43, CareerViet 21; ngày truy cập 11/10/2026). Đã loại 4 tin: 1 Product Marketing Manager (ngoài phạm vi 7 vị trí mục tiêu), 1 JD thực chất là phát triển sản phẩm, 1 tin fresh-graduate/entry, 1 tin trùng đăng lại (dentsu). Không phát hiện trùng lặp liên nền tảng (đối chiếu company + title chuẩn hóa).
- DỮ KIỆN — tỷ lệ toàn mẫu (mẫu số n=112): nhắc quản lý/lập ngân sách **71/112 (63,4%)**; nhắc KPI/đo lường/báo cáo hiệu quả **81/112 (72,3%)**; nhắc tối ưu chiến dịch/A-B test/CPL-CPA-ROAS-CAC **61/112 (54,5%)**; nhắc quản lý/làm việc với agency-vendor-đối tác **46/112 (41,1%)**.
- DỮ KIỆN — theo loại vị trí: performance/digital (n=44): KPI 81,8%, tối ưu 65,9%, ngân sách 59,1%, agency 31,8%; brand/truyền thống (n=46): ngân sách 58,7%, KPI 58,7%, agency 45,7%, tối ưu 43,5%; tổng hợp (n=22): ngân sách 81,8%, KPI 81,8%, tối ưu 54,5%, agency 50,0%.
- DỮ KIỆN — theo cấp bậc: manager (n=52) nhắc ngân sách 76,9% so với junior/specialist (n=54) 50,0%; KPI xuất hiện ở cả hai nhóm (~70–80%). senior-manager+ chỉ n=5, không diễn giải.
- KHUNG MẪU & GIỚI HẠN: khung mẫu = tin tuyển dụng marketing còn đọc được toàn văn trên 3 nền tảng lớn, thu qua search theo 7 nhóm vị trí mục tiêu; chỉ tính tin đọc được toàn văn, tin hết hạn/không mở được bỏ qua và log lý do. Thiên lệch: lệch về doanh nghiệp đăng tin trên nền tảng lớn, thiếu SME tuyển qua quan hệ/giới thiệu; LinkedIn lệch về công ty lớn/đa quốc gia (agency 55,8% so với TopCV 27,1%); TopCV lệch về vị trí performance (tối ưu 68,8% so với LinkedIn 39,5%). Ngày đăng thường không hiển thị công khai (TopCV chỉ có hạn nộp, LinkedIn chỉ mốc tương đối) — độ mới suy từ hạn nộp/mốc tương đối, phần lớn 2025–2026. VietnamWorks và ITviec bị chặn bot hoàn toàn đối với subagent text-fetch (0 JD trong phạm vi) — khoảng trống nền tảng đã ghi nhận; 6 URL tin VietnamWorks thật tìm được qua LinkedIn của VietnamWorks cần live-browser mới đọc được. Sự cố W3: worker báo thu 30 tin nhưng file chỉ còn 9 dòng dữ liệu đầy đủ do mất context giữa chừng — chỉ 9 dòng này được tính, 21 tin còn lại không có dữ liệu field-level nên không đưa vào mẫu.
- SUY LUẬN: với n=112 có mẫu số rõ ràng, vế (a) "4 đầu việc là yêu cầu tuyển dụng phổ biến" đứng vững hơn hẳn so với mẫu 14 JD trước — đặc biệt KPI (72,3%) và ngân sách (63,4%). Agency là đầu việc yếu nhất trong 4 (41,1%) — không nên trình bày như "phổ biến ngang bằng" với 3 đầu việc còn lại. JD vẫn chỉ chứng minh yêu cầu tuyển dụng, không chứng minh "khó khăn" hay nhu cầu mua khóa.

**Vế (b) — khó khăn người làm kể:**
- DỮ KIỆN: GiangGina, Digital Content Manager (ELLE, Abbott…) kể đấu tranh lập ngân sách team content với sếp và phản đối KPI doanh thu vô lý (HTE-001, http://www.deargiang.com/marketing-pr/nghe-content-nhuan-but-bao-nhieu-co-kpi-doanh-thu-khong-so-luong-bai-viet-moi-ngay-ban-can-biet.html). Hạnh Lê, COO PMAX (ex-Lazada) kể chọn sai KPI, không nối được dữ liệu ads với CRM, tối ưu "không có công thức chung" (HTE-002, https://hocvien.haravan.com/blogs/marketing/kinh-nghiem-10-nam-lam-performance-marketing-tu-coo-pmax). Người bán thuê agency 500tr/tháng mất ~20% phí, không kiểm soát sâu (HTE-004, OTOFUN).
- SUY LUẬN: ngân sách/KPI/tối ưu/agency là bài toán có thật, lặp lại trong lời kể practitioner độc lập.

**Vế (c) — khó khăn dẫn tới tìm/mua đào tạo:**
- DỮ KIỆN: 3 marketer đang đi làm (AEON Vietnam, Trung Nguyen Legend, Electrolux) kể làm theo trực giác/e ngại con số → mua khóa AI Marketing 2026 của Tomorrow Marketers (HTE-006, https://reviewkhoahoc.net/ai-marketing-2026-tomorrow-marketers/). Học viên MOA/IMTA bỏ khóa cũ → chọn khóa khác vì "không áp dụng được" (HTE-009, HTE-010).
- SUY LUẬN: vế (c) tồn tại nhưng **toàn bộ bằng chứng đều là testimonial do NCC tuyển chọn** — không có case độc lập nào.

### Bằng chứng phản bác
- Blogger tự học content/marketing 8 năm, không học khóa nào mà thành công (HTE-013, https://ybox.vn/ky-nang/youth-confessions-chia-se-qua-trinh-minh-tu-hoc-content-and-online-marketing-64042d35d2e7fb55b023b64c).
- Cộng đồng TikTok (~3363 likes) hoài nghi "marketer mở khóa học là lùa gà", từ chối mua (HTE-014).
- Solopreneur dùng ChatGPT lập kế hoạch marketing thay cho khóa học/tư vấn (HTE-019, https://www.youtube.com/watch?v=lJUl4zQ_AWQ).

### Có lặp lại giữa các case độc lập không?
- Vế (b): CÓ — ngân sách/KPI/tối ưu xuất hiện ở 4+ nguồn độc lập (blog cá nhân, COO agency, diễn đàn, video nghề nghiệp).
- Vế (c): KHÔNG có lặp lại độc lập — chỉ lặp lại trong hệ testimonial của NCC.

### Kết luận H1: **ĐƯỢC HỖ TRỢ MỘT PHẦN** (cập nhật 11/10/2026)
- DỮ KIỆN: vế (a) được củng cố mạnh — từ 14 JD lên **112 JD unique có mẫu số**: KPI 72,3%, ngân sách 63,4%, tối ưu 54,5%, agency 41,1%; tỷ lệ khác biệt có ý nghĩa giữa performance/digital (KPI 81,8%, tối ưu 65,9%) và brand/truyền thống (agency 45,7% cao hơn, tối ưu 43,5% thấp hơn). Vế (b) đứng vững (lời kể practitioner độc lập).
- SUY LUẬN: vế (c) — "khiến họ chủ động tìm/mua đào tạo" — **vẫn chưa đủ bằng chứng độc lập** (toàn bộ là testimonial do NCC tuyển chọn). Mẫu JD lớn hơn không làm đổi được kết luận này vì JD theo thiết kế không đo được hành vi mua. Không được dùng H1 để kết luận "nhu cầu mua khóa quản trị chiến dịch đã được chứng minh".

---

## H2 — Giá trị của hướng dẫn và phản hồi

**Nội dung:** Một số người đi làm tìm lớp có giảng viên vì tự học chưa giúp họ áp dụng vào công việc, đánh giá bài làm hoặc sửa sai.

### Bằng chứng mạnh nhất ủng hộ
- DỮ KIỆN: review SEOViP kể "học cầm tay chỉ việc, thực hành trên dự án thật… những gì học đều có thể áp dụng ngay" (HTE-109) — **nhưng QA và R2 đều gắn nhãn nghi seeding/advertorial, độc lập KHÔNG RÕ, không dùng làm bằng chứng chính**. 3 quotes học viên TM kể từ "làm theo trực giác" sang "phân tích dữ liệu bài bản" (HTE-110) — **site review SEO, quote không kiểm chứng độc lập**.
- SUY LUẬN: không có bằng chứng độc lập mạnh nào ủng hộ H2.

### Mắt xích cốt lõi còn trống
- DỮ KIỆN (kết quả âm): R2 chạy 4 truy vấn thiết kế riêng để tìm chuỗi "đã tự học → không áp dụng được/không ai sửa bài → vì thế tìm lớp có giảng viên" — **không tìm thấy case công khai nào** (`raw/r2_h2.md`, mục 3.1).

### Bằng chứng phản bác
- Hồng Ngọc trả 5tr/11 buổi, chê nội dung trùng đại học, khuyên "không nhất thiết phải bỏ tiền học thêm" (HTE-103, https://znews.vn/znews-post1331999.html).
- Nguyễn Kim Chi trả 1,5tr lớp TikTok, nhận tài liệu sơ sài, bỏ học mất cọc 500k (HTE-105, Báo Lao Động).
- Thúy Trần, 10 năm digital marketing, bị layoff — tự học miễn phí GA/Meta Blueprint/AI tools, không tìm lớp GV (HTE-106, https://kenh14.vn/nghich-ly-cua-30s-di-xin-viec-kinh-nghiem-10-nam-van-phai-chung-minh-minh-con-tre-u-215260606181040146.chn).
- Chuyên gia trong nghề: "đi học chỉ đem lại những điều căn bản nhất… trả tiền để được hỏi" (HTE-107, https://ybox.vn/ky-nang/lam-sao-tu-hoc-digital-marketing-cho-sinh-vien-va-nguoi-di-lam-spnmjqppeq).
- Alumni TM: học xong vẫn yếu Excel, cuối tuần tự học thêm (HTE-108, https://blog.tomorrowmarketers.org/lam-marketing-tai-shopee-la-trai-nghiem-nhu-the-nao-chi-thanh-giang/) — lớp có GV **không lấp** khoảng trống áp dụng.

### Lời giải thích thay thế (có bằng chứng)
- Networking + nền tảng bài bản để vào nghề — không phải tự học thất bại (HTE-101, review AIM của nhóm sinh viên Margroup).
- Tò mò/bổ sung song song đại học (HTE-102).
- Tin vào uy tín người dạy qua review mạng (HTE-105 — chính là lý do khiến nạn nhân chọn nhầm khóa "lùa gà").
- "Chỉ học vì chứng chỉ / công ty cử đi học": **không tìm thấy lời kể cá nhân nào** — lời giải thích này chưa có bằng chứng first-person.

### Bằng chứng từ vét review sàn (bổ sung 11/10/2026 — 54 review, `reviews_mining.csv`, HTE-357→HTE-360, HTE-363→HTE-364)
- DỮ KIỆN: 54 review khóa marketing trên 4 sàn (Unica 32, Kyna 4, Edumall 2, KT.city/Gitiho/reviewkhoahoc.net 16). 19/54 nghi seeding (đã gắn nhãn). 35/54 còn lại là mẫu phân tích chính.
- DỮ KIỆN: 9/54 nhắc tới giảng viên — nhưng 4 lời cảm ơn chung ("thầy dạy tận tâm", "dễ hiểu"), 2 nghi seeding, 1 TIÊU CỰC (ED-002: GV "trả lời theo khuôn mẫu, phản hồi chậm tới 2 tháng"), 1 hỗ trợ trong group, 1 testimonial nghi seeding. **0/54 nhắc GV sửa bài/chấm bài/phản hồi 1-1** (HTE-359).
- DỮ KIỆN: nguồn nhipai.com được worker ghi nhận viết khóa Unica "không có hỗ trợ một kèm một… cần người chấm bài thì tìm lớp offline" — NHƯNG QA độc lập 11/10/2026 không tìm thấy bài viết để đối chiếu (site tồn tại, bài không được index, không có URL cụ thể) → hạ mức thành "nguồn editorial chưa đối chiếu", KHÔNG dùng cho kết luận (HTE-363).
- DỮ KIỆN: chỉ 8/54 nêu lý do chọn khóa — đều gắn nhu cầu thực tế cụ thể (cứu shop đang lỗ ads, địa phương không có lớp offline, kinh doanh thêm ngoài giờ…); 0/54 nêu "tự học không áp dụng được nên tìm lớp có GV" (HTE-360).
- DỮ KIỆN: 6/54 thất vọng sau trả tiền (nội dung cơ bản/trùng lặp, dịch vụ kém, app lỗi) — trùng hướng với HTE-103/HTE-105 cũ.
- SUY LUẬN: dữ liệu review KHÔNG tìm thấy cơ chế cốt lõi của H2 ở bất kỳ đâu: không ai kể được GV sửa bài/phản hồi cá nhân, không ai nêu lý do chọn lớp là "tự học thất bại". Vai trò GV trong review chỉ tồn tại ở mức lời cảm ơn chung — hoặc tiêu cực.

### Bằng chứng từ mở rộng nguồn ngoài sàn (bổ sung 11/10/2026 — 130 voices, `extra_voices.csv`, HTE-365→HTE-378)
- DỮ KIỆN: 130 cases ngoài sàn (W2: 23 review Google Maps trung tâm lớn; W7: 17 review listing mở rộng; W8: 21 case fanpage/forum/blog; W4: 16 case blog/diễn đàn/LinkedIn; W3: 2 case Facebook — cả hai do NCC đăng). YouTube mảng review khóa học (5 video — QA 11/10/2026: danh sách 5 video KHÔNG tìm thấy trong nguồn được trích dẫn, chưa đối chiếu được) và TikTok (9 video): 0 bình luận đọc được — BLOCKED toàn bộ, cần live-browser (danh sách video ưu tiên đã lưu, HTE-375).
- DỮ KIỆN (H2, n=55): chuỗi "tự học thất bại → tìm lớp có GV" có **0 case ĐỘC LẬP ĐẦY ĐỦ** — chỉ xuất hiện trong: 2 bài do NCC tự đăng (W7: Trại Sói iRe, VinaEnter), 1 bài nghi seeding có link referral (W4-005), 1 blog NCC (W8-009), và 1 ý kiến VOZ PHẢN BÁC một phần ("tự làm tự trải nghiệm, cần đéo học ai" — W8-002) (HTE-377).
- DỮ KIỆN (H2): GV sửa bài/phản hồi 1-1 cụ thể HIẾM — 0/23 review Google Maps trung tâm lớn nhắc tới (HTE-366). Case độc lập nhất: W4-001 (LinkedIn, Duy Nguyen — Creative đang đi làm, khóa Brand Development TM): "sau mỗi bài, trainer đều hướng dẫn khá chi tiết cách đánh giá, tiếp cận và giải quyết vấn đề" — NHƯNG động cơ học là mở rộng nghề + sứ mệnh cá nhân, KHÔNG phải "tự học thất bại" (HTE-371). Lý do "kèm cặp 1-1 / sửa bài" xuất hiện như lý do CHỌN khóa ở vài nguồn so sánh (GTV slideshare, nhipai, sosanhgiakhoahoc — độc lập hỗn hợp) (HTE-373).
- DỮ KIỆN (H2): ủng hộ một phần phổ biến nhất vẫn là "GV tận tình/giải đáp + áp dụng được vào việc" (review Maps). Thất vọng sau trả tiền tiếp tục xuất hiện (báo chí độc lập: 30tr/2 khóa "số 0 tròn trĩnh"; 5tr khóa TikTok + 30tr mua tương tác rồi kênh bị khóa). Động cơ khác (networking, vào nghề, tò mò) lặp lại.
- SUY LUẬN: số lượng tăng (55 voices mới) nhưng cơ chế cốt lõi và chuỗi nhân quả của H2 vẫn thiếu bằng chứng độc lập — chiều phản bác được củng cố thêm. **SỐ LƯỢNG LỚN KHÔNG TỰ ĐỘNG THÀNH BẰNG CHỨNG MẠNH**: ~1/3 số voices mới nghi seeding hoặc do NCC tự đăng; phần lớn ẩn danh/không rõ có đi làm không. Kết luận vẫn đánh trọng số theo mức độc lập và chất lượng nguồn, không theo số lượng.

### Bằng chứng từ live-browser Facebook (bổ sung 11/10/2026 — 34 review fanpage, `extra_voices.csv` XV-131→XV-164, HTE-379→HTE-382)
- DỮ KIỆN: đọc trực tiếp (không đăng nhập) mục đánh giá 3 fanpage: Tomorrow Marketers (22 review khóa học, trên tổng 585 review — 100% recommend), GTV SEO (6 review, 96% recommend/367), VietMoz (6 review, 96% recommend/69; 1 cặp trùng lặp nội dung). 3 fanpage còn lại (Vinalink, AIM, Vua Web Digi) bị tường đăng nhập; SEONGON 0 review.
- DỮ KIỆN (H2): pattern lặp lại là khen chung — "take care kĩ càng", "giảng viên có tâm và helpful", "hỗ trợ siêu nhiệt tình", "bài bản thực tế", "học phát thực hành được luôn". **0/34 review nhắc tới GV sửa bài tập hoặc phản hồi 1-1.** Case cụ thể nhất về áp dụng: Phạm Nhi (TM) — "giúp người học hiểu rõ cách áp dụng vào công việc"; GTV — "kiến thức ứng dụng liền vào công việc" (uy tín GV Vincent Đỗ).
- DỮ KIỆN (H2): 0 review tiêu cực trong 34 review — thiên lệch nền tảng rõ rệt (fanpage của NCC, 96–100% recommend). Không xác minh được người đánh giá có đi làm không.
- SUY LUẬN: vòng này bổ sung chiều "ủng hộ một phần" (GV tận tình + áp dụng được vào việc được nhắc nhiều, độc lập trung bình — tự đăng, không do NCC viết), NHƯNG đồng thời củng cố chiều phản bác: cơ chế cốt lõi của H2 (sửa bài/phản hồi cá nhân) tiếp tục vắng mặt trên 34 review trả tiền nữa. Kết luận H2 không đổi.
- DỮ KIỆN (giới hạn truy cập): YouTube 5/5 video có 0 bình luận (không phải bị chặn — không có gì để đọc); TikTok 4/4 video thử bị tường đăng nhập (~1.100+ bình luận không đọc được); Facebook 3/7 fanpage bị tường đăng nhập (HTE-383). Kênh thảo luận sâu nhất vẫn nằm sau đăng nhập.

### Kết luận H2: **CHƯA ĐỦ BẰNG CHỨNG** (giữ nguyên, được củng cố thêm chiều phản bác)
- DỮ KIỆN: mắt xích "tự học thất bại → tìm lớp có GV" tiếp tục không xuất hiện — nay trên 54 review trả tiền bổ sung, 0/54 nhắc GV sửa bài/phản hồi 1-1; nguồn độc lập khẳng định sàn lớn nhất không có hỗ trợ 1-1.
- SUY LUẬN: bằng chứng hiện có nghiêng về (i) các động cơ khác (nhu cầu thực tế cụ thể, uy tín GV, tiện lợi) và (ii) trải nghiệm thất vọng sau khi trả tiền. Không được dùng H2 để kết luận "người đi làm cần mentor/sẵn sàng trả phí vì tự học không hiệu quả".
- GIỚI HẠN MỚI: review là mẫu thuận tiện — người được mentor tốt có thể không viết review; vắng mặt trong review ≠ cơ chế không tồn tại. Nhưng với 2 vòng tìm kiếm độc lập đều cho kết quả âm, gánh nặng chứng minh thuộc về phía khẳng định H2.

---

## H3 — Vai trò của AI trong quyết định học

**Nội dung:** AI tạo thêm nhu cầu đào tạo khi người làm muốn hoàn thành nhiệm vụ marketing cụ thể; sự quan tâm không chỉ dành cho công cụ, tin tức hoặc tài nguyên miễn phí.

### Tách 4 tầng (dữ kiện)

**Tầng 1 — quan tâm chung:** CÓ. TikTok FOMO nghề nghiệp 26,1K like (HTE-201); LinkedIn chia sẻ khóa AI miễn phí Wharton (HTE-202); JobsGO 02/2025: Marketing/PR dùng AI cao nhất 94,2% (HTE-208, https://vietstock.vn/2025/02/lieu-ai-tuong-lai-co-the-vuot-mat-con-nguoi-trong-cong-viec-4511-1272095.htm).

**Tầng 2 — bài toán ứng dụng cụ thể:** CÓ, 2 case độc lập mạnh. Hoàng Ngọc Dũng (CEO ColorMedia, Brands Vietnam 06/2024): dùng Midjourney làm storyboard/proposal TVC + ChatGPT đọc brief/phân tích báo cáo hàng ngày (HTE-205, https://www.brandsvietnam.com/congdong/topic/341822-ung-dung-ai-de-tiet-kiem-thoi-gian-va-toi-uu-chi-phi-lam-du-an). Marketer tự build hệ thống Claude Skills để launch khóa học trong 1 tháng (thay vì 2–3 tháng), đạt 30 lead (HTE-206, https://zoedatalens.substack.com/p/buiild-ai-marketing-team-claude-skills).

**Tầng 3 — tìm/so sánh khóa:** GẦN NHƯ TRỐNG. 1 case duy nhất HTE-209 (blog minhvc.com, review gắn affiliate link của chính khóa được review — độc lập THẤP). Không tìm thấy thread/bài hỏi tư vấn độc lập nào.

**Tầng 4 — đã học/đã trả tiền:** TRỐNG Ở KÊNH ĐỘC LẬP. 3 case duy nhất (HTE-210/211/212) đều là review đăng trên website của chính đơn vị bán khóa (tonydzung.com) — không xác minh được danh tính, chức danh, hay việc chi trả thực tế.

### Bằng chứng phản bác vế "tạo thêm nhu cầu đào tạo"
- 2 case tầng 2 mạnh nhất (HTE-205, HTE-206) ủng hộ vế 1 (nhu cầu từ task cụ thể) nhưng **phản bác vế 2**: cả hai đều đáp ứng bằng **tự học miễn phí + công cụ**, không mua khóa.
- GitHub repo học AI miễn phí định vị thẳng ضد khóa trả phí: "ít nhất sẽ không mất tiền cho những khóa học không đáng" (HTE-213, https://github.com/roccat92/hoc-ai).
- **Chính NCC khóa AI (HVMO) thừa nhận**: thị trường bão hòa, giá thổi phồng, "không ít học viên thất vọng… không áp dụng được vào công việc" sau khi trả tiền (HTE-215, https://hocvienmarketingonline.com/khoa-hoc-ai-gia-bao-nhieu).
- VnEconomy/3HORIZONS 09/2026: 95% dùng GenAI cá nhân nhưng chỉ 15% ghi nhận tăng doanh thu (HTE-207) — dùng nhiều ≠ tạo nhu cầu đào tạo trả phí.
- HTE-214 (quote "học free + practice hiệu quả hơn mua khóa nghìn đô"): QA FLAG — TikTok chặn, quote **không xác minh được**, không dùng cho kết luận.

### Bằng chứng từ vét review sàn — khóa AI (bổ sung 11/10/2026, HTE-361→HTE-362)
- DỮ KIỆN: 17 review khóa AI marketing (Unica: Master 28+ AI Tools, GenAI cho dân văn phòng, SEO AI; KT.city/reviewkhoahoc.net: Edit Video AI 2026…). 9/17 kể áp dụng AI vào việc ("tự làm ảnh/video AI, không cần thuê ngoài"; "cắt clip AI → 12 clip/tuần"; "có đơn sau 5 ngày"). **0/17 thất vọng. 0/17 nhắc tài nguyên miễn phí thay thế.**
- DỮ KIỆN (giới hạn): 6/17 nghi seeding; phần lớn review nằm trên trang affiliate/landing bán hàng của NCC. Mẫu sạch (không nghi seeding): 11 review — 5/11 kể áp dụng được, 0/11 thất vọng.
- DỮ KIỆN (phản bác trong cùng mẫu): KT-003 (khóa FAC): nội dung "hầu như e đã tự mò trên web" — 1 trong chỉ 2/54 review nhắc alternative miễn phí (HTE-362).
- SUY LUẬN: đây là tín hiệu dương YẾU cho vế "nhu cầu đào tạo AI" — lần đầu có review trả tiền (không phải testimonial NCC) kể áp dụng được. Nhưng độc lập thấp (seeding, trang bán hàng) khiến nó không đủ lật ngược phát hiện cũ: người có nhu cầu thật thì tự học miễn phí (HTE-205/206), và chính NCC AI thừa nhận bão hòa (HTE-215). Hai chiều cùng tồn tại: (a) một nhóm nhỏ trả tiền và hài lòng; (b) nhóm có nhu cầu thật thì tự học free; (c) NCC thừa nhận thị trường bão hòa.

### Bằng chứng từ mở rộng nguồn ngoài sàn (bổ sung 11/10/2026 — 130 voices, `extra_voices.csv`, HTE-365→HTE-378)
- DỮ KIỆN: 75 voices H3 ngoài sàn (W6: 51 bình luận YouTube video AI marketing qua Invidious API; W7: 9 review listing mở rộng; W8: 8 case; W4: 6 case; W3: 1 editorial NCC). TikTok (9 video, cả H2/H3): 0 bình luận đọc được — BLOCKED, cần live-browser (HTE-376).
- DỮ KIỆN (phân tầng mới, n=75): tầng 1=4, tầng 2=25, tầng 3=23, tầng 4=22.
- DỮ KIỆN (tầng 2 — GIÀU NHẤT, ủng hộ vế 1 H3): 24 bình luận YouTube hỏi cách dùng AI cho task marketing cụ thể — Claude quét TikTok research insight, AI tạo kịch bản giới thiệu sản phẩm, workflow video UGC/review sản phẩm, chạy Facebook Ads, Sora/Shopee affiliate; nhiều case gặp lỗi khi tự làm (voice không nhất quán, ghép cảnh không mượt, lỗi tạo tài khoản Sora) (HTE-365).
- DỮ KIỆN (tầng 3 — HAI CHIỀU): nhiều người hỏi mua/đăng ký khóa AI (pre-order 1.999.000đ, khóa 1:1, hội viên 50k, xin tư vấn) — NHƯNG phản bác cũng mạnh: tool quảng cáo "free" nhưng tính phí (Monica, Sider), cáo buộc khóa dạy AI "lùa gà" (được đồng tình), chê nội dung "95% cảm tính" (HTE-365). Thêm 1 nguồn so sánh độc lập tương đối: nhipai so sánh 6 khóa AI trên Unica (HTE-374) — chính là bài từng bị QA flag ở HTE-363 vì thiếu URL; nay đã xác định URL cụ thể (nhipai.com/khoa-hoc-ai-unica-2026/) và đối chiếu nguyên văn thành công.
- DỮ KIỆN (tầng 4 — ĐÔNG NHƯNG RỖNG VỀ ĐỘC LẬP): 22 items nhưng ~0 case độc lập đã xác nhận trả tiền và review: 9 review W7 KHÔNG xác nhận đã trả tiền (chỉ kể đã học/áp dụng, NCC tự đăng); 7 case W8 do NCC đăng/trên trang bán khóa; 3 case W4 testimonial NCC/affiliate; YouTube chỉ 1 tự nhận trả tiền (hội viên kênh 50k — KHÔNG phải khóa học) + 2 PHẢN BÁC chất lượng nội dung dạy. **Không tìm thấy case độc lập nào review sau khi trả tiền khóa AI marketing** (HTE-365, HTE-368, HTE-372, HTE-374, HTE-378).
- SUY LUẬN: vế 1 H3 (nhu cầu AI gắn task cụ thể) được củng cố mạnh thêm — tầng 2 giờ là tầng giàu evidence nhất với 25 voices đa số độc lập. Vế 2 (tạo nhu cầu đào tạo trả phí) vẫn thiếu bằng chứng độc lập: tầng 4 đông về số lượng nhưng rỗng về độc lập; tầng 3 cho thấy ý định mua tồn tại song song với cáo buộc "lùa gà". **SỐ LƯỢNG LỚN KHÔNG TỰ ĐỘNG THÀNH BẰNG CHỨNG MẠNH** — kết luận vẫn đánh trọng số theo độc lập và chất lượng nguồn.

### Kết luận H3: **ĐƯỢC HỖ TRỢ MỘT PHẦN** (giữ nguyên, bổ sung chiều dương yếu)
- DỮ KIỆN ủng hộ vế 1: nhu cầu AI gắn với nhiệm vụ marketing cụ thể là có thật (2 case độc lập + số liệu dùng AI 94,2% + nay thêm 9/17 review khóa AI kể áp dụng được).
- DỮ KIỆN phản bác/làm yếu vế 2: người có nhu cầu thật thì tự học miễn phí (HTE-205/206); review khóa AI dương tính nhưng độc lập thấp (6/17 nghi seeding); NCC AI thừa nhận bão hòa + học viên "không áp dụng được" (HTE-215); tầng tìm/so sánh khóa độc lập vẫn gần như trống.
- SUY LUẬN: **không được quy "quan tâm AI tăng" thành "nhu cầu mua khóa AI tăng"**. Tín hiệu mua tồn tại nhưng nhỏ, nhiễu seeding, và song song với luồng tự học miễn phí mạnh hơn. Đây vẫn là lỗi suy luận nhảy mà bộ nghiên cứu trước đã cảnh báo.

---

## Ghi chú phương pháp & giới hạn chung

1. **HTE-005 đã loại** khỏi `evidence.csv` theo QA: quote không tồn tại trên nguồn + trang là advertorial bán khóa.
2. **HTE-203, HTE-214**: quote chưa đối chiếu được (trang/TikTok chặn) — giữ trong file với nhãn FLAG, không dùng cho kết luận.
3. **Khoảng trống nền tảng**: Facebook group nghề ("Tâm Sự Con Sen"…) và LinkedIn post cá nhân bị tường đăng nhập — toàn bộ thảo luận nghề nghiệp sâu nhất nằm ngoài tầm với. Mẫu hiện tại lệch về blog/báo/NCC.
4. **Không có khảo sát công khai** nào đo trực tiếp khó khăn ngân sách/KPI/tối ưu/agency của marketer VN, cũng không có khảo sát nào so sánh lớp có GV vs tự học (R4, mục 5).
5. Mọi tỷ lệ trong file (ví dụ "5/10 case phản bác H2", "9/54 review nhắc giảng viên") chỉ mô tả mẫu thuận tiện đã thu thập, **không phải tỷ lệ thị trường**. Vòng review-mining 11/10/2026: 54 review/4 sàn, 19/54 nghi seeding (đã gắn nhãn từng dòng trong `reviews_mining.csv`); các tỷ lệ tổng hợp luôn kèm mẫu số và ghi rõ có/không loại seeding.
6. Giới hạn cấu trúc của nguồn review sàn: Kyna/Edumall gần như không có review text công khai ở cấp khóa học (HTE-358); review text Unica nằm sau JS; app Kyna hiện tại là Kyna English (ngoài phạm vi). Đây là giới hạn nguồn, không phải khoảng trống có thể đào thêm bằng text fetch.
7. **Vòng mở rộng ngoài sàn 11/10/2026 (130 voices, HTE-365→HTE-378): số lượng lớn KHÔNG tự động thành bằng chứng mạnh.** Mỗi H đạt 100+ items theo yêu cầu, nhưng kết luận trong file này vẫn đánh trọng số theo mức độc lập và chất lượng nguồn, không theo số lượng: ~1/3 voices H2 nghi seeding hoặc do NCC tự đăng; tầng 4 của H3 đông (22 items) nhưng ~0 case độc lập đã xác nhận trả tiền. YouTube (mảng review khóa học) và TikTok: 0 bình luận đọc được — BLOCKED toàn bộ ở tầng bình luận, cần live-browser có đăng nhập; danh sách video ưu tiên đã lưu trong HTE-375/HTE-376. Facebook công khai: 0 case độc lập (HTE-369/HTE-370) — tab reviews và nội dung post sau tường đăng nhập.
