import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoomService } from 'app/services/room.service';
import { DeleteRoomComponent } from './delete-room/delete-room.component';
import { DeleteDialogData } from 'app/models/deleteDialogData.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from 'app/models/Rooms/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{

  rooms!: Room[];
  showSpinner: boolean = true;

  constructor(
    private roomSvc: RoomService,
    private dialogSvc: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadRooms();
  }
   
  deleteRoom(id: number, name: string): void {

    const dialogRef = this.dialogSvc.open(DeleteRoomComponent, {
      data: {
        name: name
      } as DeleteDialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe({

      next: (answer: Boolean) => {

        if (answer) {

          this.showSpinner = true;

          this.roomSvc.deleteRoom(id).subscribe({
            next: () => {
              this.loadRooms();
            },
            error: (err: HttpErrorResponse) => {
              alert(err.message);
              console.log(err);
            }
          });
        }
      }
    });
  }

  private loadRooms(): void {

    this.roomSvc.getRooms().subscribe({
      next: (roomsFromApi) => {
        this.rooms = roomsFromApi;
        this.showSpinner = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.message);
      }
    });
  }


}
