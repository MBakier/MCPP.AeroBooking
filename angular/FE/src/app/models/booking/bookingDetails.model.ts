export interface BookingDetails {
  id: number;
  customerFullName: string;
  HotelName: string;
  RoomNumber: number;
  numberOfDays: number;
  numberOfAdults: number;
  numberOfChildren: number;
  totalPrice: number;
  bookingStart: Date;
  bookingEnd: Date;
}
