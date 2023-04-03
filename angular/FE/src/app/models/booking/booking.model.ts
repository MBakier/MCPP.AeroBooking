export interface Booking {
  id: number;
  bookingStart: Date;
  bookingEnd: Date;
  numberOfAdults: number;
  numberOfChildren: number;
  HotelId: number;
  RoomId: number;
  customerId: number;
}
