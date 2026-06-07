import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  Code2,
  GitBranch,
  Layers3,
  LayoutDashboard,
  ListChecks,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  TestTube2,
  UsersRound,
} from "lucide-react";
import React from "react";
import { useMemo, useState } from "react";

const flowDiagram = "/Images/FlowDiagram.png";
const sequenceDiagram = "/Images/SequenceDiagram_6_step.png";

const steps = [
  {
    id: "01",
    title: "Tiếp nhận và phân rã FEAT/US",
    owner: "PO",
    ai: "AI M2",
    icon: Layers3,
    summary:
      "Làm rõ problem, goal, scope, priority, dependency và tách FEAT/US đủ nhỏ để đưa vào Sprint.",
    output: "FEAT/US có mục tiêu, phạm vi, độ ưu tiên và owner rõ ràng.",
    confirm: "PO",
  },
  {
    id: "02",
    title: "Phân tích nghiệp vụ và hoàn thiện spec",
    owner: "BA",
    ai: "AI M2",
    icon: SearchCheck,
    summary:
      "Phân tích flow, rule, data, exception, edge case và hoàn thiện spec với AC rõ ràng.",
    output: "spec.md có description, business rule, flow, data, AC Given/When/Then và edge cases.",
    confirm: "BA, PO khi cần",
  },
  {
    id: "03",
    title: "Thiết kế UI/UX và bàn giao UI detail",
    owner: "PD, BA",
    ai: "AI M1-M2",
    icon: LayoutDashboard,
    summary:
      "Map UI với AC, state, validation, message, empty/loading/error và chuẩn hóa handoff cho SE/QC.",
    output: "UI/UX design và ui-detail.md đủ để implement và test.",
    confirm: "PD, BA",
  },
  {
    id: "04",
    title: "Review Ready và implement",
    owner: "EM, SE, QC",
    ai: "AI M1-M2",
    icon: Code2,
    summary:
      "Review theo Definition of Ready, breakdown task, implement, self-test và review code.",
    output: "US đạt Ready; code đáp ứng scope và AC, self-test pass.",
    confirm: "EM, SE reviewer",
  },
  {
    id: "05",
    title: "Viết testcase, test và xử lý bug",
    owner: "QC, SE, EM",
    ai: "AI M1-M2",
    icon: TestTube2,
    summary:
      "Viết testcase theo AC/rule, test, raise bug đủ evidence, fix và retest đến khi pass.",
    output: "Testcase, test result, bug report nếu có, bug đã fix và retest pass.",
    confirm: "QC, EM/SE",
  },
  {
    id: "06",
    title: "DevOps, deploy và đóng US",
    owner: "DevOps, EM, QC, PO/BA",
    ai: "AI M1-M2",
    icon: Rocket,
    summary:
      "Build, test, deploy đúng môi trường, kiểm tra log, smoke test và xác nhận Definition of Done.",
    output: "Build/deploy pass, smoke test pass nếu có, US đạt Definition of Done.",
    confirm: "EM, QC, PO/BA khi cần",
  },
];

const painGroups = [
  ["Đầu vào chưa rõ", "Problem, goal, scope, priority hoặc dependency chưa đủ chắc nhưng vẫn đi tiếp."],
  ["Spec thiếu chiều sâu", "Business flow, rule, data, exception, AC và edge cases chưa được mô tả đầy đủ."],
  ["UI detail chưa đủ", "Thiếu state, validation, message hoặc mapping giữa UI và AC."],
  ["Ready review muộn", "SE và QC tham gia chưa đủ sớm, khiến blocker lộ ra trong lúc code."],
  ["Bug loop kéo dài", "Bug report thiếu step, expected, actual, evidence hoặc chưa review phạm vi ảnh hưởng."],
  ["AI chưa đồng nhất", "Team dùng prompt cá nhân, thiếu template, checklist và chuẩn xác nhận đầu ra."],
];

const goals = [
  "Chuẩn hóa quy trình delivery FEAT/US thành 6 bước dễ theo dõi.",
  "Làm rõ trách nhiệm, đầu ra và người xác nhận ở từng bước.",
  "Không đưa US vào implement khi chưa đạt Definition of Ready.",
  "Không đóng US khi chưa đạt Definition of Done.",
  "Giảm bug, giảm rework và tăng khả năng dự đoán tiến độ Sprint.",
  "Minh bạch mức AI M0-M3, nhưng giữ người phụ trách là người xác nhận cuối cùng.",
];

const ready = [
  "Description, goal và scope rõ ràng.",
  "AC có Given/When/Then.",
  "Business rule và dependency đã được làm rõ.",
  "UI/UX sẵn sàng nếu có màn hình.",
  "SE hiểu hướng implement và QC hiểu hướng test.",
  "Estimate được và không còn blocker lớn.",
];

const done = [
  "Code hoàn thành, merge và CI/build pass.",
  "Self-test pass và testcase pass.",
  "Bug critical/high đã xử lý hoặc có quyết định rõ từ PO/EM.",
  "Deploy thành công lên môi trường yêu cầu.",
  "Smoke test pass nếu có deploy.",
  "Tài liệu hoặc tri thức liên quan đã được cập nhật.",
];

const aiLevels = [
  ["M0", "Chưa dùng AI", "Con người thực hiện thủ công 100%."],
  ["M1", "AI hỗ trợ thủ công", "Dùng prompt riêng lẻ để hỏi, gợi ý, review hoặc viết nháp."],
  ["M2", "AI theo template/workflow", "Dùng template, checklist, prompt chuẩn, agent hoặc workflow để tạo đầu ra nhất quán."],
  ["M3", "Tự động hóa gần như hoàn toàn", "Hệ thống tự chạy theo điều kiện định sẵn, con người giám sát và phê duyệt."],
];

const automationRows = [
  {
    goal: "Chuẩn hóa tiếp nhận FEAT/US",
    automation:
      "AI đọc yêu cầu đầu vào, phát hiện thiếu problem, goal, scope, priority, dependency và đề xuất câu hỏi làm rõ theo template.",
    output: "Draft FEAT/US, danh sách thông tin thiếu, đề xuất phân rã US.",
    control: "PO xác nhận scope, priority và quyết định đưa vào backlog/Sprint.",
  },
  {
    goal: "Đảm bảo Definition of Ready",
    automation:
      "AI đối chiếu US với checklist DoR trước khi implement, tự đánh dấu hạng mục đạt/chưa đạt và nêu blocker.",
    output: "Báo cáo Ready/Not Ready, checklist DoR, danh sách việc cần bổ sung.",
    control: "EM/SE/QC review và quyết định US có được implement hay không.",
  },
  {
    goal: "Giảm thiếu AC, rule và edge case",
    automation:
      "AI phân tích spec, business flow và UI để gợi ý AC Given/When/Then, business rule, exception và edge case còn thiếu.",
    output: "Draft spec.md, AC bổ sung, rule/edge case cần xác nhận.",
    control: "BA và PO xác nhận tính đúng nghiệp vụ.",
  },
  {
    goal: "Giảm suy đoán khi thiết kế và implement",
    automation:
      "AI map AC sang UI state, validation, message, data field, permission và technical task.",
    output: "Draft ui-detail.md, checklist UI state, gợi ý task breakdown cho SE.",
    control: "PD/BA xác nhận UI; SE xác nhận hướng implement.",
  },
  {
    goal: "Tăng chất lượng code và giảm rework",
    automation:
      "AI hỗ trợ sinh task kỹ thuật, review code theo AC, phát hiện thiếu self-test, thiếu validation hoặc sai rule trước khi bàn giao QC.",
    output: "Review note, self-test checklist, gợi ý fix trước khi merge.",
    control: "SE reviewer và EM xác nhận code đủ điều kiện bàn giao.",
  },
  {
    goal: "Tăng độ phủ kiểm thử",
    automation:
      "AI sinh testcase từ AC/rule/UI state, phân loại positive/negative/permission/integration/edge case và phát hiện testcase thiếu.",
    output: "Testcase draft, test scope, checklist coverage.",
    control: "QC xác nhận testcase chính thức và kết quả test.",
  },
  {
    goal: "Rút ngắn vòng lặp bug/retest",
    automation:
      "AI chuẩn hóa bug report, gợi ý severity, phân tích nguyên nhân khả dĩ, phạm vi ảnh hưởng và testcase cần retest.",
    output: "Bug report đầy đủ, impact note, retest checklist.",
    control: "EM/SE/QC xác nhận severity, root cause và kết quả retest.",
  },
  {
    goal: "Kiểm soát deploy và đóng US",
    automation:
      "AI tổng hợp trạng thái DevOps, test result, bug còn mở, smoke test và DoD để gợi ý có thể đóng US hay chưa.",
    output: "Báo cáo DoD, release note ngắn, danh sách điều kiện chưa đạt.",
    control: "EM/QC/PO/BA xác nhận Done và quyết định đóng US.",
  },
  {
    goal: "Cải tiến sau Sprint",
    automation:
      "AI tổng hợp blocker, bug pattern, rework, hạng mục DoR/DoD hay bị fail và đề xuất cải tiến workflow/template.",
    output: "Sprint improvement note, action item, đề xuất cập nhật checklist/prompt.",
    control: "EM/Scrum Master chọn action item đưa vào cải tiến quy trình.",
  },
];

const automationPrinciples = [
  ["Trigger rõ ràng", "AI chỉ chạy khi có sự kiện cụ thể như tạo US, cập nhật spec, chuyển Ready, tạo PR, tạo bug, DevOps hoàn tất hoặc chuẩn bị đóng US."],
  ["Template hóa đầu ra", "Kết quả AI phải đi vào tài liệu hoặc checklist chuẩn như spec.md, ui-detail.md, DoR checklist, testcase, bug report, self-test checklist hoặc DoD checklist."],
  ["Có trạng thái kiểm soát", "Kết quả nên thể hiện Đạt, Chưa đạt, Thiếu thông tin hoặc Cần người xác nhận thay vì chỉ mô tả chung."],
  ["Human-in-the-loop", "AI có thể draft, review, đối chiếu và gợi ý quyết định, nhưng PO/BA/PD/EM/SE/QC vẫn xác nhận cuối cùng theo vai trò."],
  ["Tự động hóa tăng dần", "Bắt đầu từ AI M1, chuẩn hóa thành AI M2 bằng template/workflow, sau đó mới nâng lên AI M3 với trigger tự động và dashboard giám sát."],
];

const presentationFiles = [
  {
    file: "s1.txt",
    href: "/presents/s1.txt",
    title: "Mở đầu và tổng quan 6 bước",
    related: "Tổng quan, hiện trạng team, 6 bước delivery",
    summary:
      "Dùng để giới thiệu đây là quy trình hiện tại được sắp xếp lại cho dễ nhìn, dễ hiểu và dễ kiểm soát hơn.",
    bullets: [
      "Nêu bối cảnh nhiều vai trò cùng tham gia: PO, BA, PD, EM/Scrum Master, SE, QC và DevOps.",
      "Giải thích vấn đề handoff chưa rõ làm tăng hỏi lại, suy đoán, lỗi và rework.",
      "Đi qua 6 bước từ tiếp nhận yêu cầu đến deploy và xác nhận hoàn tất.",
      "Nhấn mạnh AI là công cụ hỗ trợ, người phụ trách vẫn review và chịu trách nhiệm cuối cùng.",
    ],
  },
  {
    file: "s2.txt",
    href: "/presents/s2.txt",
    title: "Đi sâu 3 bước cuối",
    related: "Review Ready, testing, DevOps và đóng US",
    summary:
      "Dùng cho phần giải thích sâu hơn về kiểm soát chất lượng trước khi code, khi test và trước khi đóng US.",
    bullets: [
      "Review Ready giúp tránh bắt đầu code khi yêu cầu còn mơ hồ hoặc thiếu tiêu chí hoàn thành.",
      "Testing cần bao phủ luồng đúng, luồng sai, dữ liệu, phân quyền, thông báo lỗi và edge case.",
      "Bug report phải rõ step, expected, actual, evidence, environment và mức ảnh hưởng.",
      "DevOps/deploy cần log, smoke test, bằng chứng hoàn tất và xác nhận DoD trước khi đóng US.",
    ],
  },
];

const presentationFlow = [
  {
    source: "s1.txt",
    step: "01",
    title: "Mở đầu buổi trình bày",
    related: "Hero / Tổng quan",
    say:
      "Hôm nay tôi trình bày ngắn gọn cách team đang xử lý một yêu cầu trong Sprint, từ lúc nhận yêu cầu đến khi hoàn tất.",
    points: [
      "Đây không phải quy trình mới, mà là quy trình hiện tại được sắp xếp lại thành 6 bước.",
      "Mục tiêu là giúp mọi người dễ nhìn, dễ hiểu và dễ kiểm soát hơn.",
      "Người nghe cần nắm được mỗi bước làm gì, ai chịu trách nhiệm và đầu ra cần có là gì.",
    ],
  },
  {
    source: "s1.txt",
    step: "02",
    title: "Nêu hiện trạng và vấn đề",
    related: "Hiện trạng team",
    say:
      "Hiện tại nhiều vai trò cùng tham gia, nhưng chất lượng handoff giữa các bước chưa luôn đủ rõ.",
    points: [
      "Khi yêu cầu, spec, UI detail, test scope hoặc bug report chưa rõ, bước sau phải hỏi lại hoặc tự suy đoán.",
      "Hệ quả là tăng thời gian xử lý, tăng bug, tăng rework và khó dự đoán tiến độ.",
      "Ví dụ nên nêu: yêu cầu thiếu mục tiêu, spec thiếu tình huống, UI thiếu state, bug thiếu evidence.",
    ],
  },
  {
    source: "s1.txt",
    step: "03",
    title: "Giới thiệu 6 bước delivery",
    related: "Quy trình 6 bước",
    say:
      "Tài liệu này gom lại luồng delivery FEAT/US thành 6 bước từ tiếp nhận đến đóng US.",
    points: [
      "Bước 1: PO tiếp nhận, làm rõ problem, goal, scope, priority, dependency và phân rã yêu cầu.",
      "Bước 2: BA phân tích nghiệp vụ, rule, data, exception, edge case và AC.",
      "Bước 3: PD và BA làm rõ UI, state, validation, message, empty/loading/error.",
      "Bước 4: EM/SE/QC review Ready, nếu đủ rõ thì SE implement và self-test.",
      "Bước 5: QC test, raise bug rõ ràng, SE fix và QC retest.",
      "Bước 6: DevOps deploy, team kiểm tra lại và xác nhận đủ điều kiện Done.",
    ],
  },
  {
    source: "s1.txt",
    step: "04",
    title: "Giải thích vai trò của AI",
    related: "AI tự động hóa / Thang AI",
    say:
      "AI được dùng để hỗ trợ tăng tốc và chuẩn hóa đầu ra, nhưng không thay thế người phụ trách.",
    points: [
      "AI có thể tóm tắt yêu cầu, gợi ý AC, rà soát tài liệu, viết testcase, hỗ trợ code, phân tích lỗi và chuẩn hóa bug report.",
      "Mọi đầu ra AI tạo ra vẫn phải được người phụ trách review và xác nhận.",
      "Điểm cần nhấn mạnh: AI là lớp hỗ trợ quy trình, không phải người quyết định cuối cùng.",
    ],
  },
  {
    source: "s2.txt",
    step: "05",
    title: "Đi sâu bước 4: Review Ready trước khi code",
    related: "Definition of Ready / Bước 4",
    say:
      "Trước khi code, team cần kiểm tra yêu cầu đã đủ rõ hay chưa để tránh vừa làm vừa đoán.",
    points: [
      "Khó khăn: mục tiêu chưa rõ, scope còn mở, rule thiếu, UI chưa đủ state hoặc QC chưa rõ test scope.",
      "Mục tiêu: SE hiểu cần làm gì, QC hiểu cần test gì, BA/PO chốt nghiệp vụ, EM nắm blocker.",
      "AI có thể rà soát DoR, tóm tắt yêu cầu, gợi ý câu hỏi làm rõ và tạo danh sách rủi ro ban đầu.",
      "Quyết định cuối cùng vẫn thuộc BA, PO, SE, QC và EM/Scrum Master.",
    ],
  },
  {
    source: "s2.txt",
    step: "06",
    title: "Đi sâu bước 5: Testing và xử lý bug",
    related: "Bước 5 / Test coverage",
    say:
      "Testing cần xác nhận sản phẩm đúng với yêu cầu đã thống nhất, không chỉ kiểm tra luồng đúng.",
    points: [
      "QC cần cover luồng đúng, luồng sai, dữ liệu thiếu/không hợp lệ, phân quyền, message lỗi và edge case.",
      "Bug report phải có step, expected result, actual result, evidence, environment và mức ảnh hưởng.",
      "AI có thể sinh testcase từ AC/rule/UI state và phát hiện testcase còn thiếu.",
      "AI cũng hỗ trợ chuẩn hóa bug report và gợi ý phạm vi cần retest sau khi fix.",
    ],
  },
  {
    source: "s2.txt",
    step: "07",
    title: "Đi sâu bước 6: DevOps, deploy và đóng US",
    related: "Definition of Done / Bước 6",
    say:
      "US chỉ nên được đóng khi có đủ bằng chứng hoàn tất, không đóng theo cảm tính.",
    points: [
      "Khó khăn: deploy xong nhưng smoke test/log/test result/xác nhận nghiệp vụ chưa đủ rõ.",
      "Trước khi đóng cần xác nhận code xong, test đạt, deploy thành công, lỗi nghiêm trọng đã xử lý hoặc có quyết định rõ.",
      "AI có thể đọc log, tóm tắt lỗi sau deploy, cảnh báo bất thường và tạo checklist đóng US.",
      "Kết quả mong muốn là mỗi US khi đóng đều có cơ sở rõ ràng.",
    ],
  },
  {
    source: "s2.txt",
    step: "08",
    title: "Kết luận",
    related: "Mục tiêu / Nguyên tắc vận hành",
    say:
      "Tóm lại, mục tiêu là giảm hiểu nhầm, giảm lỗi phát hiện muộn, giảm rework và dùng AI có kiểm soát.",
    points: [
      "Không bắt đầu code khi yêu cầu chưa rõ.",
      "Không bàn giao khi chưa kiểm tra đủ.",
      "Không đóng US khi chưa có bằng chứng hoàn tất.",
      "Nếu làm tốt, team tăng độ tin cậy khi hoàn tất một yêu cầu trong Sprint.",
    ],
  },
];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [checklist, setChecklist] = useState("ready");
  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  const metrics = useMemo(
    () => [
      ["6", "bước delivery", "Từ tiếp nhận đến đóng US"],
      ["M2", "mức AI mục tiêu", "Template, checklist và workflow"],
      ["2", "cổng chất lượng", "Definition of Ready và Done"],
      ["7", "vai trò phối hợp", "PO, BA, PD, EM, SE, QC, DevOps"],
    ],
    []
  );

  return (
    <main>
      <nav className="topbar" aria-label="Điều hướng">
        <a href="#overview">Tổng quan</a>
        <a href="#automation">AI tự động hóa</a>
        <a href="#process">Quy trình</a>
        <a href="#current-state">Hiện trạng</a>
        <a href="#quality-gates">DoR / DoD</a>
        <a href="#presentations">Kịch bản</a>
      </nav>

      <section className="hero" id="overview">
        <div className="hero-copy">
          <span className="eyebrow"><GitBranch size={16} /> Sprint Delivery Playbook</span>
          <h1>Quy trình Delivery FEAT/US trong Sprint</h1>
          <p>
            Website này gom hai tài liệu quy trình và hiện trạng team thành một dashboard trực quan:
            nhìn được luồng 6 bước, vấn đề đang gặp, mục tiêu cải tiến, mức dùng AI và các cổng chất lượng cần kiểm soát.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#process">Xem 6 bước <ArrowRight size={18} /></a>
            <a className="secondary-link" href="#visuals">Xem Flow & Sequence</a>
          </div>
        </div>
        <div className="hero-visual">
          <img src={flowDiagram} alt="Flow diagram quy trình delivery 6 bước" />
        </div>
      </section>

      <section className="metric-grid" aria-label="Chỉ số tổng quan">
        {metrics.map(([value, label, caption]) => (
          <article className="metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <p>{caption}</p>
          </article>
        ))}
      </section>

      <section className="section automation-section" id="automation">
        <div className="section-heading compact">
          <span className="eyebrow"><Bot size={16} /> AI automation layer</span>
          <h2>AI tự động hóa theo mục tiêu, nhưng con người vẫn xác nhận cuối cùng</h2>
          <p>
            Theo tài liệu quy trình 6 bước, AI không thay thế một vai trò trong team. AI là lớp hỗ trợ
            có trigger đầu vào, hành động tự động, đầu ra chuẩn hóa và điểm kiểm soát rõ ràng.
          </p>
        </div>
        <div className="automation-grid">
          {automationRows.map((row, index) => (
            <article className="automation-card" key={row.goal}>
              <div className="automation-card-head">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{row.goal}</h3>
              </div>
              <p>{row.automation}</p>
              <div className="automation-meta">
                <div>
                  <b>Đầu ra AI</b>
                  <span>{row.output}</span>
                </div>
                <div>
                  <b>Kiểm soát</b>
                  <span>{row.control}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="principle-strip">
          {automationPrinciples.map(([title, desc]) => (
            <article key={title}>
              <CheckCircle2 size={18} />
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="process">
        <div className="section-heading">
          <span className="eyebrow"><ListChecks size={16} /> Quy trình đề xuất</span>
          <h2>6 bước delivery có owner, đầu ra và xác nhận rõ ràng</h2>
          <p>
            Nguyên tắc vận hành là AI hỗ trợ tăng tốc và chuẩn hóa đầu ra, nhưng không thay thế trách nhiệm của người phụ trách.
          </p>
        </div>
        <div className="process-board">
          <div className="step-rail" role="tablist" aria-label="Các bước quy trình">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  className={index === activeStep ? "step-tab active" : "step-tab"}
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  <Icon size={20} />
                  <span>{step.id}</span>
                  <b>{step.title}</b>
                </button>
              );
            })}
          </div>
          <article className="step-detail">
            <div className="step-detail-head">
              <div className="icon-badge"><CurrentIcon size={28} /></div>
              <div>
                <span>{current.id} / 06</span>
                <h3>{current.title}</h3>
              </div>
            </div>
            <p>{current.summary}</p>
            <dl>
              <div>
                <dt>Vai trò chính</dt>
                <dd>{current.owner}</dd>
              </div>
              <div>
                <dt>Đầu ra</dt>
                <dd>{current.output}</dd>
              </div>
              <div>
                <dt>Mức AI</dt>
                <dd>{current.ai}</dd>
              </div>
              <div>
                <dt>Người xác nhận</dt>
                <dd>{current.confirm}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section className="flow-strip" aria-label="Luồng xử lý">
        <div><span>FEAT/US</span><ArrowRight size={18} /></div>
        <div><span>Spec</span><ArrowRight size={18} /></div>
        <div><span>UI detail</span><ArrowRight size={18} /></div>
        <div><span>Ready review</span><ArrowRight size={18} /></div>
        <div><span>Implement & test</span><ArrowRight size={18} /></div>
        <div><span>Deploy & Done</span></div>
      </section>

      <section className="section" id="current-state">
        <div className="section-heading compact">
          <span className="eyebrow"><CircleAlert size={16} /> Hiện trạng team</span>
          <h2>Các điểm nghẽn chính đang làm tăng rework</h2>
          <p>
            Vấn đề không nằm ở một vai trò riêng lẻ mà nằm ở chất lượng handoff giữa các bước.
            Khi thông tin chưa đủ rõ, bước sau phải suy đoán, hỏi lại hoặc làm lại.
          </p>
        </div>
        <div className="pain-grid">
          {painGroups.map(([title, desc], index) => (
            <article className="pain-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section goals-panel">
        <div>
          <span className="eyebrow"><Target size={16} /> Mục tiêu cần đạt</span>
          <h2>Trạng thái kỳ vọng sau cải tiến</h2>
          <p>
            Team có một working agreement thống nhất: mỗi FEAT/US có đầu vào, đầu ra,
            owner và tiêu chí xác nhận rõ ràng trước khi chuyển bước.
          </p>
        </div>
        <ul className="goal-list">
          {goals.map((goal) => (
            <li key={goal}><CheckCircle2 size={18} /> {goal}</li>
          ))}
        </ul>
      </section>

      <section className="section two-columns" id="quality-gates">
        <div className="quality-card">
          <div className="segmented" role="tablist" aria-label="Chọn checklist">
            <button className={checklist === "ready" ? "active" : ""} onClick={() => setChecklist("ready")} type="button">
              <ClipboardCheck size={18} /> Ready
            </button>
            <button className={checklist === "done" ? "active" : ""} onClick={() => setChecklist("done")} type="button">
              <ShieldCheck size={18} /> Done
            </button>
          </div>
          <h2>{checklist === "ready" ? "Definition of Ready" : "Definition of Done"}</h2>
          <p>
            {checklist === "ready"
              ? "US chỉ nên vào implement khi đủ thông tin để SE code, QC test và EM kiểm soát blocker."
              : "US chỉ nên đóng khi code, test, deploy, bug và xác nhận nghiệp vụ đã đạt chuẩn thống nhất."}
          </p>
          <ul className="check-list">
            {(checklist === "ready" ? ready : done).map((item) => (
              <li key={item}><CheckCircle2 size={18} /> {item}</li>
            ))}
          </ul>
        </div>
        <div className="ai-card">
          <span className="eyebrow"><Bot size={16} /> AI usage scale</span>
          <h2>Thang mức độ sử dụng AI</h2>
          <div className="ai-levels">
            {aiLevels.map(([level, title, desc]) => (
              <article key={level}>
                <strong>{level}</strong>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section visuals" id="visuals">
        <div className="section-heading compact">
          <span className="eyebrow"><Sparkles size={16} /> Flow & Sequence</span>
          <h2>Sơ đồ tham khảo cập nhật</h2>
          <p>
            Website đang sử dụng hai resource ảnh mới: FlowDiagram.png cho luồng tổng thể
            và SequenceDiagram_6_step.png cho trình tự tương tác trong 6 bước.
          </p>
        </div>
        <div className="visual-grid">
          <figure>
            <img src={flowDiagram} alt="Flow diagram quy trình delivery FEAT/US" />
            <figcaption>FlowDiagram.png</figcaption>
          </figure>
          <figure>
            <img src={sequenceDiagram} alt="Sequence diagram quy trình 6 bước" />
            <figcaption>SequenceDiagram_6_step.png</figcaption>
          </figure>
        </div>
      </section>

      <section className="section presentation-section" id="presentations">
        <div className="section-heading compact">
          <span className="eyebrow"><ClipboardCheck size={16} /> Presentation notes</span>
          <h2>Kịch bản trình bày theo từng phần liên quan</h2>
          <p>
            Đây là talk track để nhìn vào là biết cần trình bày gì, nói theo thứ tự nào
            và đang liên kết với phần nào trên dashboard.
          </p>
        </div>
        <div className="talk-track">
          {presentationFlow.map((item) => (
            <article className="talk-card" key={item.step}>
              <div className="talk-index">{item.step}</div>
              <div className="talk-content">
                <div className="talk-meta">
                  <span>{item.source}</span>
                  <b>{item.related}</b>
                </div>
                <h3>{item.title}</h3>
                <blockquote>{item.say}</blockquote>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}><CheckCircle2 size={17} /> {point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="presentation-grid">
          {presentationFiles.map((item) => (
            <article className="presentation-card" key={item.file}>
              <div className="presentation-card-head">
                <span>{item.file}</span>
                <a href={item.href} target="_blank" rel="noreferrer">Mở file gốc</a>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="related-block">
                <b>Phần liên quan</b>
                <span>{item.related}</span>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}><CheckCircle2 size={17} /> {bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <UsersRound size={18} />
        <span>PO · BA · PD · EM/Scrum Master · SE · QC · DevOps cùng vận hành một quy trình minh bạch.</span>
      </footer>
    </main>
  );
}

export default App;
