import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'app/models/Rooms/room.model';
import { RoomDetails } from 'app/models/Rooms/roomDetails.model';
import { RoomService } from 'app/services/room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit{

  roomId!: number;
  room!: RoomDetails;

  constructor(
    private roomSvc: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.loadRoom();
  }

  loadRoom() {
    this.roomId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  
    if (this.roomId) {
      this.roomSvc.getRoom(this.roomId).subscribe({
        next: (roomFromApi: RoomDetails) => {
          this.room = roomFromApi;
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.message);
          this.router.navigate(['/not-found']);
        }
      });
    }
  }
}
