import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from 'app/models/booking/booking.model';
import { BookingDetails } from 'app/models/booking/bookingDetails.model';
import { BookingList } from 'app/models/booking/bookingList.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiUrl = `${environment.apiUrl}/Bookings`;

  constructor(private http: HttpClient) { }

  getBookings(): Observable<BookingList[]> {

    return this.http.get<BookingList[]>(`${this.apiUrl}/GetBookings`);
  }

  getBooking(id: number): Observable<BookingDetails> {

    return this.http.get<BookingDetails>(`${this.apiUrl}/GetBooking/${id}`);
  }

  createBooking(booking: Booking): Observable<any> {

    return this.http.post<Booking>(`${this.apiUrl}/CreateBooking`, booking);
  }

  getEditBooking(id: number): Observable<Booking> {

    return this.http.get<Booking>(`${this.apiUrl}/GetEditBooking/${id}`);
  }

  editBooking(id: number, booking: Booking): Observable<any> {

    return this.http.put<Booking>(`${this.apiUrl}/EditBooking/${id}`, booking);
  }

  deleteBooking(id: number): Observable<any> {

    return this.http.delete<Booking>(`${this.apiUrl}/DeleteBooking/${id}`);
  }
  
  getBookingPrice(roomId: number, bookingStart: string, bookingEnd: string): Observable<number> {

    return this.http.get<number>(`${this.apiUrl}/GetBookingPrice?roomId=${roomId}&bookingStart=${bookingStart}&bookingEnd=${bookingEnd}`);
  }
}
