import { Room } from "../Rooms/room.model";


export interface HotelDetails {
name: any;
  id: number;
  HotelName: string;
  address: string;
  rating: number;
  rooms: Room[];
}
