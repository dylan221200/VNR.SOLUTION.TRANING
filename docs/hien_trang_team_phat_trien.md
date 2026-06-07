# Hiện trạng team phát triển và mục tiêu cần đạt

## 1. Mục đích tài liệu

Tài liệu này dùng để trình bày hiện trạng vận hành của team phát triển trong quá trình delivery FEAT/US trong Sprint. Nội dung tập trung làm rõ các khó khăn đang gặp, nguyên nhân ảnh hưởng đến chất lượng và tiến độ, đồng thời xác định các mục tiêu cần đạt để cải thiện quy trình làm việc.

Tài liệu có thể được dùng trong các buổi Planning, Review, Retrospective hoặc khi thống nhất working agreement giữa PO, BA, PD, EM/Scrum Master, SE, QC và CI/CD.

## 2. Hiện trạng tổng quan

Team đang xử lý FEAT/US theo luồng gồm nhiều vai trò tham gia: PO tiếp nhận và phân rã yêu cầu, BA phân tích nghiệp vụ, PD thiết kế UI/UX, EM/SE review và implement, QC kiểm thử, CI/CD build và deploy.

Tuy nhiên, quá trình delivery vẫn còn phụ thuộc nhiều vào chất lượng handoff giữa các vai trò. Khi yêu cầu đầu vào, spec, UI detail, test scope hoặc bug report chưa đủ rõ, các bước sau phải tự suy đoán, hỏi lại hoặc làm lại. Điều này làm tăng thời gian xử lý, tăng bug, tăng rework và làm giảm khả năng dự đoán tiến độ trong Sprint.

AI đã bắt đầu được sử dụng để hỗ trợ một số bước như tóm tắt yêu cầu, phân tích nghiệp vụ, tạo AC, viết testcase, hỗ trợ code, phân tích log hoặc chuẩn hóa bug report. Tuy nhiên, mức độ sử dụng AI chưa đồng nhất giữa các thành viên và chưa phải bước nào cũng có template, checklist hoặc workflow chuẩn.

## 3. Khó khăn hiện tại

### 3.1. Khó khăn ở khâu tiếp nhận và phân rã yêu cầu

- Yêu cầu đầu vào có thể chưa rõ problem, goal, scope, priority hoặc dependency.
- FEAT/US có thể chưa được phân rã đủ nhỏ để xử lý hiệu quả trong Sprint.
- Scope sơ bộ chưa rõ làm BA, SE và QC khó đánh giá phạm vi ảnh hưởng.
- Dependency nghiệp vụ hoặc kỹ thuật có thể được phát hiện muộn.

### 3.2. Khó khăn ở khâu phân tích nghiệp vụ

- Spec có thể thiếu business flow, business rule, data, exception hoặc edge cases.
- AC có thể chưa đủ rõ theo Given/When/Then.
- Một số tình huống nghiệp vụ chưa được mô tả đủ chi tiết, khiến SE và QC phải hỏi lại hoặc tự suy luận.
- Feedback sau review có thể chưa được cập nhật đầy đủ vào tài liệu.

### 3.3. Khó khăn ở khâu thiết kế UI/UX

- UI detail có thể thiếu state như default, loading, empty, error, success.
- Validation, message hoặc rule hiển thị chưa được mô tả rõ.
- Mapping giữa UI và AC chưa đầy đủ, khiến việc implement và test dễ lệch kỳ vọng.
- BA và PD chưa luôn review chéo đủ kỹ để đảm bảo thiết kế đúng nghiệp vụ.

### 3.4. Khó khăn ở khâu review và implement

- US có thể chưa đạt Definition of Ready nhưng vẫn được đưa vào implement.
- Review US đôi khi chưa có đủ sự tham gia của SE và QC từ sớm.
- SE có thể phải xử lý các điểm chưa rõ trong lúc code, làm tăng thời gian trao đổi và rework.
- Self-test hoặc tài liệu kỹ thuật có thể chưa được cập nhật đầy đủ trước khi bàn giao QC.

### 3.5. Khó khăn ở khâu kiểm thử và xử lý bug

- Testcase có thể chưa cover đủ positive case, negative case, business rule, validation, permission, integration và edge cases.
- QC có thể tham gia muộn nên test scope chưa được xác định sớm từ Review US.
- Bug report có thể thiếu step, expected result, actual result, evidence, severity, environment hoặc owner xử lý.
- Vòng lặp fix bug và retest kéo dài nếu bug chưa được review nguyên nhân và phạm vi ảnh hưởng.

### 3.6. Khó khăn ở khâu CI/CD và đóng US

- Pipeline, deploy, smoke test hoặc rollback plan chưa phải lúc nào cũng được kiểm soát rõ.
- Log lỗi có thể chưa được phân tích kịp thời.
- US có thể được đóng khi tài liệu, test result hoặc xác nhận nghiệp vụ chưa đầy đủ.
- Definition of Done chưa được kiểm tra nhất quán ở mọi US.

### 3.7. Khó khăn trong việc sử dụng AI

- Mức độ sử dụng AI chưa đồng đều giữa các thành viên.
- Một số bước dùng AI theo prompt cá nhân, chưa có template hoặc workflow chuẩn.
- Đầu ra của AI có thể thiếu, sai hoặc lệch ngữ cảnh nếu không được review kỹ.
- Chưa có cách thể hiện rõ bước nào đang dùng AI mức 0, 1, 2 hoặc 3.
- Chưa có cơ chế thống nhất để đo AI giúp giảm thời gian, giảm bug hoặc giảm rework đến mức nào.

## 4. Tác động đến team

- Tăng thời gian làm rõ yêu cầu trong Sprint.
- Tăng rủi ro implement sai scope hoặc sai business rule.
- Tăng bug do thiếu AC, thiếu UI detail hoặc thiếu test scope.
- Tăng vòng lặp feedback, fix bug và retest.
- Giảm khả năng dự đoán tiến độ hoàn thành US.
- Làm team khó đánh giá chính xác chất lượng đầu ra của từng bước.
- Làm việc sử dụng AI chưa tạo được hiệu quả ổn định trên toàn team.

## 5. Mục tiêu cần đạt

### 5.1. Mục tiêu về quy trình

- Chuẩn hóa quy trình delivery FEAT/US trong Sprint thành các bước rõ ràng, dễ theo dõi.
- Làm rõ trách nhiệm và đầu ra của từng vai trò trong từng bước.
- Thiết lập working agreement để team vận hành thống nhất.
- Đảm bảo blocker được phát hiện sớm và có owner xử lý rõ ràng.
- Cải tiến liên tục sau mỗi Sprint dựa trên vấn đề thực tế.

### 5.2. Mục tiêu về chất lượng đầu vào

- FEAT/US có problem, goal, scope, priority và dependency rõ trước khi bàn giao.
- FEAT/US được phân rã đủ nhỏ để có thể hoàn tất trong Sprint.
- Spec nghiệp vụ có đủ description, business flow, business rule, data, AC và edge cases.
- UI detail có đủ screen, state, validation, message và mapping với AC.

### 5.3. Mục tiêu về Definition of Ready

- Không đưa US vào implement nếu chưa đạt Definition of Ready.
- SE hiểu rõ scope, approach và dependency trước khi code.
- QC hiểu rõ test scope trước khi viết testcase.
- Estimate được thực hiện trên cơ sở thông tin đủ rõ.
- Các blocker lớn được xử lý trước khi bắt đầu implement.

### 5.4. Mục tiêu về implement và kiểm thử

- Code đáp ứng đúng scope và AC đã thống nhất.
- SE self-test trước khi bàn giao QC.
- Testcase cover đủ AC, business rule, positive case, negative case và edge cases quan trọng.
- Bug report có đầy đủ step, expected result, actual result, evidence, severity, environment và owner xử lý.
- Giảm vòng lặp fix/retest bằng cách review bug rõ nguyên nhân và phạm vi ảnh hưởng.

### 5.5. Mục tiêu về Definition of Done

- Không đóng US nếu chưa đạt Definition of Done.
- Code đã merge, CI pass, test pass và deploy đúng môi trường yêu cầu.
- Smoke test pass nếu có deploy.
- Bug critical/high đã xử lý hoặc có quyết định rõ ràng từ PO/EM.
- Tài liệu và tri thức liên quan đã được cập nhật.
- BA/PO xác nhận khi cần xác nhận nghiệp vụ.

### 5.6. Mục tiêu về sử dụng AI

- Minh bạch mức độ sử dụng AI trong từng bước của quy trình.
- Chuẩn hóa prompt, checklist, template hoặc agent/workflow cho các bước có thể dùng AI hiệu quả.
- Dùng AI để hỗ trợ tóm tắt yêu cầu, phân tích nghiệp vụ, tạo AC, review checklist, viết testcase, hỗ trợ code, phân tích log và chuẩn hóa bug report.
- Đảm bảo mọi đầu ra do AI hỗ trợ tạo ra đều được người phụ trách review và xác nhận.
- Từng bước đánh giá hiệu quả AI dựa trên giảm thời gian xử lý, giảm bug, giảm rework và tăng chất lượng đầu ra.

## 6. Trạng thái kỳ vọng sau cải tiến

- Team có một quy trình delivery rõ ràng, thống nhất và dễ kiểm soát.
- Mỗi FEAT/US có đầu vào, đầu ra, owner và tiêu chí xác nhận rõ ràng.
- US chỉ vào implement khi đủ Ready và chỉ được đóng khi đủ Done.
- BA, PD, SE và QC giảm phải suy đoán trong quá trình làm việc.
- Bug và rework giảm dần qua các Sprint.
- EM/Scrum Master có đủ thông tin để theo dõi blocker, kiểm soát flow và điều phối cải tiến.
- AI được sử dụng có kiểm soát, có chuẩn chung và có người chịu trách nhiệm cuối cùng cho đầu ra.
