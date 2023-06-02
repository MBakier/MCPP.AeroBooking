import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lookup } from 'app/models/lookup.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { HotelList } from 'app/models/Hotels/hotelList.model';
import { HotelDetails } from 'app/models/Hotels/hotelDetails.model';
import { Hotel } from 'app/models/Hotels/hotel.model';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  apiUrl = `${environment.apiUrl}/Hotels`;

  constructor(private http: HttpClient) { }

  getHotels(): Observable<HotelList[]> {

    return this.http.get<HotelList[]>(`${this.apiUrl}/GetHotels`);
  }

  getHotel(id: number): Observable<HotelDetails> {

    return this.http.get<HotelDetails>(`${this.apiUrl}/GetHotel/${id}`);
  }

  createHotel(hotel: Hotel): Observable<Hotel> {

    return this.http.post<Hotel>(`${this.apiUrl}/CreateHotel`, hotel)
  }

  getEditHotel(id: number): Observable<Hotel> {

    return this.http.get<Hotel>(`${this.apiUrl}/GetEditHotel/${id}`);
  }

  editHotel(id: number, hotel: Hotel): Observable<any> {

    return this.http.put<Hotel>(`${this.apiUrl}/EditHotel/${id}`, hotel)
  }

  deleteHotel(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/DeleteHotel/${id}`)
  }

  getHotelLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.apiUrl}/GetLookup`);
  }
}
