import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from 'app/models/Rooms/room.model';
import { Lookup } from 'app/models/lookup.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiUrl = `${environment.apiUrl}/Rooms`;

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {

    return this.http.get<Room[]>(`${this.apiUrl}/GetRooms`);
  }

  getRoomLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.apiUrl}/GetLookup`);
  }

  getRoom(id: number): Observable<Room> {

    return this.http.get<Room>(`${this.apiUrl}/GetRoom/${id}`);
  }

  createRoom(room: Room): Observable<Room> {

    return this.http.post<Room>(`${this.apiUrl}/CreateRoom`, room)
  }

  editRoom(id: number, room: Room): Observable<any> {

    return this.http.put<Room>(`${this.apiUrl}/EditRoom/${id}`, room)
  }

  deleteRoom(id: number): Observable<any> {

    return this.http.delete<Room>(`${this.apiUrl}/DeleteRoom/${id}`)
  }

}
