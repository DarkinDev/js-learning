# 🏨 BÀI TẬP VỀ OBJECT: KHÁCH SẠN PHƯƠNG TRANG

## Mục tiêu:

Luyện tập sử dụng Object trong JavaScript thông qua việc quản lý thông tin của một khách sạn.

---

## 📝 Yêu cầu:

### 1. Tạo một object `phuongTrangHotel` có cấu trúc như sau:

- **Tên khách sạn**: `"Khách sạn Phương Trang"`
- **Địa chỉ**: `"123 Đường Hoa Hồng, Quận 1, TP.HCM"`
- **Số sao**: `4`
- **Danh sách phòng** (`rooms`): là một mảng các object, mỗi object đại diện cho một phòng và có các thuộc tính:
  - `roomNumber` (số phòng)
  - `type` (loại phòng: "Deluxe", "Standard", "Suite", ...)
  - `price` (giá tiền)
  - `isAvailable` (tình trạng phòng – true nếu còn trống, false nếu đã đặt)

---

### 2. Thực hiện các thao tác sau:

- ✅ a) Hiển thị tên khách sạn và địa chỉ.
- ✅ b) Duyệt qua danh sách phòng và in ra **các phòng còn trống** (`isAvailable === true`).
- ✅ c) Thêm một **phòng mới** vào danh sách.
- ✅ d) Cập nhật **giá phòng** của phòng có `roomNumber` là **101**.
- ✅ e) **Xoá** phòng có `roomNumber` là **103** (nếu có).

---

### 🔁 BONUS:

Viết một **hàm** có tên `getAvailableRooms()` nhận vào một object khách sạn và **trả về danh sách phòng còn trống**.

```js
function getAvailableRooms(hotel) {
  // TODO: return list of available rooms
}
```
