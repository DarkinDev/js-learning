// Bai 1
const phuongtrangHotel = {
  name: "Khách Sạn Phương Trang",
  address: "53 Lê Vĩnh Hoà, P.Phú Thọ Hoà, Q.Tân Phú",
  rating: 4.1,
  rooms: [
    {
      roomNumber: 101,
      type: "Deluxe",
      price: 200.0,
      isAvailable: false,
    },
    {
      roomNumber: 102,
      type: "Standard",
      price: 100.0,
      isAvailable: false,
    },
    {
      roomNumber: 201,
      type: "Luxury",
      price: 400.0,
      isAvailable: true,
    },
  ],
};

// Bai 2
const rooms = phuongtrangHotel.rooms;

// for (let x = 0; x < rooms.length; x++) {
//   if (rooms[x].isAvailable === true && rooms[x].type === "Luxury") {
//     console.log(rooms[x]);
//   }
// }

// Bai 3
// rooms[3] = {
//   roomNumber: 301,
//   type: "Luxury",
//   price: 200.0,
//   isAvailable: true,
// };

// phuongtrangHotel["phoneNumber"] = "0869157139";

// // Bai 4
// rooms[0].price = 300;

// // Bai 5
// delete rooms[1];

// Bonus
function getAvailableRooms() {
  for (let x = 0; x < rooms.length; x++) {
    if (rooms[x].isAvailable === true) {
      return rooms[x];
    }
  }
}

// console.log(rooms);
// console.log(phuongtrangHotel);
console.log(getAvailableRooms());
