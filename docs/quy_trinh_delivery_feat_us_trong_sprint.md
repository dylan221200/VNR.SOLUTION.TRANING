# Quy trình Delivery FEAT/US trong 1 Sprint

## 1. Mục đích

Tài liệu này mô tả quy trình tổng thể để team xử lý một FEAT/US trong Sprint, từ lúc PO tiếp nhận yêu cầu, BA phân tích nghiệp vụ, PD thiết kế UI/UX, EM/SE review và implement, QC kiểm thử, đến CI/CD deploy và hoàn tất US.

Quy trình này được dùng như **working agreement** cho team, giúp:

- Chuẩn hóa cách tiếp nhận, phân tích, thiết kế, phát triển, kiểm thử và deploy FEAT/US.
- Làm rõ trách nhiệm của từng vai trò trong Sprint.
- Giảm rủi ro US chưa rõ nhưng vẫn đưa vào implement.
- Tăng chất lượng đầu ra của BA, PD, SE, QC.
- Giảm bug, giảm rework và tăng khả năng dự đoán tiến độ.

---

## 2. Phạm vi áp dụng

Áp dụng cho các FEAT/US/Task được xử lý trong Sprint, bao gồm:

- New feature.
- Modify feature.
- Bug hoặc defect cần xử lý theo Sprint.
- Các hạng mục cần có phân tích nghiệp vụ, thiết kế UI/UX, implement, test và deploy.

---

## 3. Vai trò và trách nhiệm

| Vai trò | Trách nhiệm chính |
|---|---|
| PO | Tiếp nhận yêu cầu, đánh giá giá trị, phân rã FEAT/US, xác định priority và scope nghiệp vụ. |
| BA | Phân tích nghiệp vụ, lập prototype nếu cần, hoàn thiện tài liệu spec, AC và business rule. |
| PD | Thiết kế UI/UX, bàn giao UI detail, phối hợp với BA để đảm bảo thiết kế đúng nghiệp vụ. |
| EM / Scrum Master | Điều phối quy trình, thiết lập working agreement, theo dõi blocker, kiểm soát DoR/DoD, hỗ trợ team cải tiến sau Sprint. |
| SE | Review US về mặt kỹ thuật, breakdown task, implement, self-test, review/fix bug. |
| QC | Review testability của US, viết testcase, kiểm thử, raise bug, retest và xác nhận chất lượng. |
| CI/CD | Build, kiểm tra pipeline, deploy đúng môi trường, hỗ trợ rollback nếu phát sinh lỗi. |

---

## 4. Vai trò EM kiêm Scrum Master

Trong quy trình này, **EM kiêm nhiệm vai trò Scrum Master**. EM không chỉ quản lý kỹ thuật mà còn chịu trách nhiệm giúp team vận hành ổn định theo quy trình đã thống nhất.

### 4.1. Mục tiêu cần đạt

EM giúp team có quy trình làm việc rõ ràng, minh bạch trạng thái, giảm blocker, giảm rework và cải tiến liên tục sau mỗi Sprint.

### 4.2. Định nghĩa đạt

Được xem là đạt khi:

- Team hiểu rõ quy trình và trách nhiệm của từng vai trò.
- US trước khi implement đạt Definition of Ready.
- US trước khi đóng đạt Definition of Done.
- Blocker được phát hiện và xử lý sớm.
- Bug/rework giảm dần qua các Sprint.
- Có action cải tiến cụ thể sau Sprint Retro.

### 4.3. Giải pháp đề xuất

- Thiết lập working agreement cho team.
- Facilitate Planning, Daily, Review, Retro.
- Theo dõi flow xử lý US và blocker.
- Kiểm tra việc tuân thủ DoR/DoD.
- Tổng hợp vấn đề phát sinh và đề xuất cải tiến quy trình.

---

## 5. Quy trình tổng thể

| Bước | Hoạt động | Vai trò chính | Đầu ra |
|---:|---|---|---|
| 1 | Tiếp nhận yêu cầu, đánh giá và phân rã FEAT/US | PO | FEAT/US có mục tiêu, phạm vi, priority sơ bộ |
| 2 | Bàn giao FEAT/US cho BA | PO, BA | BA hiểu yêu cầu đầu vào |
| 3 | Phân tích nghiệp vụ | BA | Business flow, rule, data, logic nghiệp vụ |
| 4 | Lập prototype | BA | Prototype hoặc mô phỏng luồng nghiệp vụ nếu cần |
| 5 | Hoàn thiện tài liệu `spec.md` | BA | Spec nghiệp vụ đầy đủ, có AC và rule |
| 6 | Thiết kế UI/UX | PD | UI/UX design theo nghiệp vụ |
| 7 | Bàn giao UI `ui-detail.md` | PD, BA | Tài liệu UI đủ để SE implement và QC test |
| 8 | Review sản phẩm | BA, PD, QC, EM/SE nếu cần | Kết luận đạt/chưa đạt cho đầu ra BA/PD |
| 9 | Lưu trữ tri thức | BA, PD | Tài liệu được lưu đúng nơi, dễ truy vết |
| 10 | Review US | BA, EM/SE, QC | US đạt/chưa đạt Definition of Ready |
| 11 | Implement | SE | Code đáp ứng scope và AC |
| 12 | Viết Testcases | QC | Testcase theo AC, business rule và edge cases |
| 13 | Auto Test / Test | QC, CI nếu có | Kết quả test pass/fail |
| 14 | Raise Bug | QC | Bug có step, expected, actual, evidence |
| 15 | Review Bug | EM/SE, QC | Bug được xác nhận, phân loại và giao owner |
| 16 | Fix Bug | SE | Bug được fix và bàn giao retest |
| 17 | CI/CD | CI/CD, SE, QC | Build/deploy pass, smoke test nếu cần |
| 18 | Hoàn tất US trong Sprint | PO/BA, EM/SE, QC | US đạt Definition of Done |

---

## 6. Luồng xử lý chi tiết

### 6.1. Intake và phân rã FEAT/US

PO tiếp nhận yêu cầu, đánh giá giá trị nghiệp vụ, xác định mục tiêu, phạm vi và priority. Sau đó PO phân rã FEAT thành các US đủ nhỏ để BA có thể phân tích chi tiết.

**Đầu vào:**

- Yêu cầu nghiệp vụ.
- Mục tiêu sản phẩm.
- Priority hoặc định hướng release.

**Đầu ra:**

- FEAT/US đã được phân rã.
- Scope sơ bộ.
- Priority sơ bộ.
- Dependency sơ bộ nếu có.

---

### 6.2. Phân tích nghiệp vụ và hoàn thiện spec

BA nhận FEAT/US từ PO, làm rõ nghiệp vụ, phân tích business flow, rule, dữ liệu liên quan, exception và acceptance criteria.

Spec cần có tối thiểu:

- Description.
- Business goal.
- Business flow.
- Business rule.
- Data/input/output nếu có.
- Acceptance Criteria theo Given/When/Then.
- Exception/edge cases nếu có.
- Prototype nếu cần.

---

### 6.3. Thiết kế UI/UX và bàn giao UI

PD nhận tài liệu từ BA để thiết kế UI/UX. BA và PD cần phối hợp để đảm bảo thiết kế thể hiện đúng nghiệp vụ, đúng trạng thái và đúng rule.

UI detail cần có tối thiểu:

- Danh sách màn hình.
- Các state chính: default, loading, empty, error, success.
- Validation.
- Message hiển thị.
- Mapping giữa UI và AC.
- Responsive hoặc rule hiển thị nếu cần.

---

### 6.4. Review sản phẩm

Review sản phẩm là bước kiểm soát chất lượng đầu ra của BA/PD trước khi chuyển sang Review US.

#### Trường hợp đạt

- Tài liệu nghiệp vụ rõ.
- UI/UX rõ.
- Feedback đã được xử lý.
- Có thể chuyển sang Review US.

#### Trường hợp chưa đạt

- Trả lại BA/PD để bổ sung.
- Cập nhật lại spec hoặc UI detail.
- Review lại sau khi chỉnh sửa.

---

### 6.5. Review US

Review US nhằm xác nhận US đã đủ rõ để SE implement và QC chuẩn bị test.

#### Trường hợp US OK

- US đạt Definition of Ready.
- SE hiểu scope, approach và dependency.
- QC hiểu test scope.
- Có thể đưa vào implement.

#### Trường hợp US chưa OK

- Trả lại BA/PO/PD để bổ sung thông tin.
- Không đưa vào implement nếu còn blocker lớn hoặc chưa rõ AC.

---

### 6.6. Implement

SE thực hiện breakdown task, implement theo scope đã thống nhất, tự kiểm tra trước khi bàn giao QC.

Yêu cầu tối thiểu:

- Code đúng AC.
- Code chạy được trên môi trường dev/test.
- Có self-test.
- Không còn lỗi obvious.
- Cập nhật tài liệu kỹ thuật nếu cần.

---

### 6.7. Viết testcase và kiểm thử

QC viết testcase dựa trên AC, business rule, UI detail và các edge cases.

Testcase cần cover:

- Positive cases.
- Negative cases.
- Business rule.
- Validation.
- Permission nếu có.
- Integration nếu có.
- Edge cases quan trọng.

---

### 6.8. Bug loop

Nếu test fail, QC raise bug. EM/SE review bug để xác nhận nguyên nhân, phạm vi ảnh hưởng và owner xử lý. SE fix bug, sau đó QC retest. Vòng lặp tiếp tục đến khi pass.

Bug hợp lệ cần có:

- Title rõ ràng.
- Steps to reproduce.
- Actual result.
- Expected result.
- Evidence: ảnh, video, log hoặc data nếu có.
- Severity/Priority.
- Environment.
- Owner xử lý.

---

### 6.9. CI/CD và hoàn tất US

Khi US đã pass test, code được build/deploy qua pipeline CI/CD theo môi trường yêu cầu.

CI/CD cần đảm bảo:

- Pipeline pass.
- Deploy đúng môi trường.
- Có log kiểm tra.
- Có smoke test nếu cần.
- Có rollback plan với release quan trọng.

---

## 7. Mục tiêu, định nghĩa đạt và giải pháp đề xuất theo nhóm bước

| Nhóm bước | Mục tiêu cần đạt | Định nghĩa đạt | Giải pháp đề xuất |
|---|---|---|---|
| 1–2 | FEAT/US rõ mục tiêu, phạm vi và ưu tiên trước khi bàn giao | Có goal, scope, priority, dependency sơ bộ và owner rõ ràng | PO dùng checklist intake; EM hỗ trợ kiểm tra rủi ro scope/dependency tổng quan |
| 3–5 | Spec nghiệp vụ đủ rõ để PO/PD/SE/QC hiểu thống nhất | Có description, business rule, flow, data, AC Given/When/Then, edge cases nếu có | Chuẩn hóa `spec.md`; dùng checklist review nghiệp vụ |
| 6–7 | UI/UX đủ rõ để SE implement và QC test không phải suy đoán | Có screen, state, validation, message, empty/loading/error, mapping với AC | Dùng `ui-detail.md`; checklist design handoff; BA/PD review chéo |
| 8–9 | Đầu ra BA/PD được review và có thể truy vết | Review có kết luận; feedback đã cập nhật; tài liệu lưu đúng nơi | EM điều phối review; thống nhất nơi lưu trữ và checklist review |
| 10 | US đạt Ready trước khi implement | SE hiểu scope/approach/dependency; QC hiểu test scope; estimate được; không còn blocker lớn | Review US theo checklist DoR; EM/SE/QC cùng xác nhận |
| 11 | Code đáp ứng đúng scope và AC | Code chạy được, self-test pass, không lỗi obvious, tài liệu kỹ thuật cập nhật nếu cần | SE breakdown task, self-review, tuân thủ convention |
| 12–13 | Kiểm thử đủ phạm vi và phản ánh đúng chất lượng US | Testcase cover AC, business rule, positive/negative, edge cases; report rõ pass/fail | QC tham gia Review US sớm; viết testcase theo checklist coverage |
| 14–16 | Bug rõ nguyên nhân, xử lý đúng và giảm vòng lặp fix/retest | Bug có step, actual/expected, evidence, severity, owner; fix xong retest pass | Dùng bug template; EM/SE review bug; QC retest theo testcase |
| 17 | Deploy nhanh, ổn định và kiểm soát rủi ro | Pipeline pass, deploy đúng môi trường, có log, smoke test, rollback plan | Chuẩn hóa CI/CD; tách CI và CD; smoke test sau deploy |

---

## 8. Definition of Ready

US được xem là **Ready** khi thỏa các tiêu chí sau:

- Description rõ ràng.
- Mục tiêu nghiệp vụ rõ.
- Scope rõ: new, modify hoặc bug.
- AC có Given/When/Then.
- Business Rule đầy đủ.
- UI/UX sẵn sàng nếu có màn hình.
- Dependency rõ: API, data, service, bên thứ ba, quyền, config nếu có.
- SE hiểu được hướng implement.
- QC hiểu được hướng test.
- Estimate được.
- Không còn blocker lớn.

Nếu chưa đạt các tiêu chí trên, US chưa nên đưa vào implement.

---

## 9. Definition of Done

US được xem là **Done** khi thỏa các tiêu chí sau:

- Code đã hoàn thành và merge.
- Build/CI pass.
- Self-test pass.
- Testcase pass.
- Bug critical/high đã xử lý hoặc có quyết định rõ ràng từ PO/EM.
- Deploy thành công lên môi trường yêu cầu.
- Smoke test pass nếu có deploy.
- BA/PO xác nhận nếu cần.
- Tài liệu hoặc tri thức đã cập nhật.

---

## 10. Checklist theo vai trò

### 10.1. PO Checklist

- [ ] Yêu cầu có problem/mục tiêu rõ ràng.
- [ ] FEAT/US được phân rã đủ nhỏ.
- [ ] Priority rõ.
- [ ] Scope sơ bộ rõ.
- [ ] Dependency/ràng buộc nghiệp vụ lớn đã được nêu.
- [ ] Bàn giao FEAT/US cho BA có đủ context.

### 10.2. BA Checklist

- [ ] Description rõ ràng.
- [ ] Business flow đầy đủ.
- [ ] Business rule đầy đủ.
- [ ] AC có Given/When/Then.
- [ ] Có exception/edge cases nếu cần.
- [ ] Có prototype nếu nghiệp vụ phức tạp.
- [ ] Spec đã cập nhật theo feedback review.

### 10.3. PD Checklist

- [ ] UI thể hiện đúng nghiệp vụ.
- [ ] Có đủ màn hình/state chính.
- [ ] Có validation/message.
- [ ] Có empty/loading/error state nếu cần.
- [ ] Có mapping UI với AC.
- [ ] UI detail đủ để SE implement và QC test.

### 10.4. EM / Scrum Master Checklist

- [ ] Team hiểu rõ quy trình và trách nhiệm.
- [ ] Blocker được theo dõi và xử lý.
- [ ] Review US có kết luận rõ.
- [ ] US vào implement đạt DoR.
- [ ] US hoàn tất đạt DoD.
- [ ] Có action cải tiến sau Sprint.

### 10.5. SE Checklist

- [ ] Đã hiểu scope và AC.
- [ ] Đã xác định dependency kỹ thuật.
- [ ] Đã breakdown task nếu cần.
- [ ] Code đúng convention.
- [ ] Self-test pass.
- [ ] Tài liệu kỹ thuật cập nhật nếu cần.
- [ ] Bug được fix và bàn giao QC retest.

### 10.6. QC Checklist

- [ ] Đã hiểu AC và business rule.
- [ ] Testcase cover positive/negative/edge cases.
- [ ] Test result rõ pass/fail.
- [ ] Bug có step, expected, actual, evidence.
- [ ] Bug đã được retest sau khi fix.
- [ ] Kết quả test phản ánh đúng chất lượng US.

---

## 11. Mermaid diagram tham khảo

```mermaid
sequenceDiagram
    participant PO
    participant BA
    participant PD
    participant EMSE as EM/SE
    participant QC
    participant CICD as CI/CD

    PO->>PO: Tiếp nhận yêu cầu, đánh giá, phân rã FEAT/US
    PO->>BA: Bàn giao FEAT/US
    BA->>BA: Phân tích nghiệp vụ
    BA->>BA: Lập prototype
    BA->>BA: Hoàn thiện spec.md
    BA->>PD: Bàn giao yêu cầu thiết kế UI/UX
    PD->>PD: Thiết kế UI/UX
    PD->>BA: Bàn giao ui-detail.md

    alt Review sản phẩm đạt
        BA->>QC: Chuyển đầu ra để tham gia review/test scope
        BA->>EMSE: Chuyển sang Review US
    else Review sản phẩm chưa đạt
        EMSE-->>BA: Feedback cập nhật spec
        EMSE-->>PD: Feedback cập nhật UI
    end

    BA->>BA: Lưu trữ tri thức

    alt US OK
        BA->>EMSE: Xác nhận US Ready
        EMSE->>EMSE: Implement
    else US chưa OK
        EMSE-->>BA: Yêu cầu bổ sung thông tin
        QC-->>BA: Bổ sung test scope/edge cases
    end

    QC->>QC: Viết Testcases
    QC->>QC: Auto Test / Test

    loop Lặp đến khi pass
        alt Test fail
            QC->>EMSE: Raise Bug
            EMSE->>EMSE: Review Bug
            EMSE->>EMSE: Fix Bug
            EMSE->>QC: Bàn giao retest
        else Test pass
            QC->>CICD: Xác nhận pass để deploy
        end
    end

    CICD->>CICD: Build/Deploy hệ thống
    CICD-->>PO: Hoàn tất US trong Sprint
```

---

## 12. Nguyên tắc vận hành

- Không đưa US vào implement nếu chưa đạt Definition of Ready.
- Không đóng US nếu chưa đạt Definition of Done.
- QC nên tham gia sớm từ Review US để xác định test scope.
- BA/PD phải cập nhật tài liệu sau feedback review.
- SE phải self-test trước khi bàn giao QC.
- Bug phải có đủ bằng chứng trước khi giao fix.
- EM/Scrum Master theo dõi blocker và cải tiến quy trình sau mỗi Sprint.
- CI/CD cần có log, kiểm tra môi trường và rollback plan với release quan trọng.
