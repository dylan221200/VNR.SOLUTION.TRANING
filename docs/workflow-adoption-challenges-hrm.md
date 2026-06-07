# Khó khăn Khi Áp Dụng VNR Workflow Cho Hệ Thống HRM Hiện Tại

## Mục tiêu

Tài liệu này tổng hợp các khó khăn thực tế khi áp dụng workflow:

`Specify -> Clarify -> Plan -> Tasks -> Implement`

cho hệ thống HRM hiện tại, đặc biệt trong bối cảnh AI agent phải tự hiểu yêu cầu business và ánh xạ sang đúng source code, database, stored procedure, API, UI component và luồng xử lý liên quan.

## Khó khăn 1: Mapping từ mô tả business sang đúng source code rất khó

### Mô tả vấn đề

Yêu cầu business trong HRM thường được mô tả theo ngôn ngữ người dùng cuối hoặc ngôn ngữ vận hành nghiệp vụ, ví dụ:

- "Thêm field `Mô tả` của loại khoá học lên grid hiển thị tại màn hình khoá học"
- "Hiển thị lại người duyệt ở tab đã xác nhận"
- "Fix filter phòng ban ở popup đào tạo"

Các mô tả này thường không chỉ ra:

- màn hình nào là màn hình thật trong code
- grid nào là grid cần sửa
- dữ liệu lấy từ entity/bảng/SP nào
- field business tương ứng với property/database column nào
- dữ liệu hiện đang bind ở FE hay BE
- luồng đang chạy ở Angular mới hay legacy MVC

Với kiểu mô tả này, AI có thể:

- tìm đúng nhưng chi phí tìm hiểu rất cao
- tìm ra nhiều màn hình tương tự nhau và chọn nhầm
- tìm được UI nhưng không tìm được SP/backend liên quan
- suy luận sai field mapping giữa tên business và tên kỹ thuật
- sửa đúng chỗ hiển thị nhưng sai nguồn dữ liệu

### Ví dụ cụ thể

Yêu cầu:

`Thêm field "Mô tả" của loại khoá học lên grid hiển thị tại màn hình khoá học`

AI phải tự giải quyết hàng loạt câu hỏi ngầm:

- "màn hình khoá học" là màn nào trong nhiều màn đào tạo?
- grid đang dùng ở Angular hay MVC?
- "loại khoá học" map sang entity nào?
- field "Mô tả" là `Description`, `Note`, `CourseTypeDescription`, hay text ở bảng khác?
- dữ liệu grid lấy từ SP, API projection, hay facade transform?
- nếu field chưa có trong DTO thì phải sửa ở lớp nào trước?

Nếu không có context bổ sung, AI có thể mất nhiều thời gian để tìm hiểu, hoặc đưa ra plan/task không đúng phạm vi.

## Kết luận

Khó khăn lớn nhất không nằm ở việc workflow thiếu phase, mà nằm ở chỗ hệ thống HRM hiện tại có độ phức tạp legacy cao, terminology không đồng nhất, và traceability từ business request sang source code còn yếu.

Do đó, nếu không giải quyết bài toán mapping từ yêu cầu business sang đúng source trước, thì các phase `Specify`, `Clarify`, `Plan`, `Tasks` rất dễ tạo ra tài liệu hợp lý về hình thức nhưng chưa đủ chính xác để implement an toàn và hiệu quả.
