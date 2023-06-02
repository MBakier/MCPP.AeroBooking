import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'app/enums/pageMode.enum';
import { Room } from 'app/models/Rooms/room.model';
import { RoomService } from 'app/services/room.service';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.css']
})
export class AddEditRoomComponent implements OnInit{

  roomId?: number;
  room: Room = new Room();
  roomForm!: FormGroup;
  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor(
    private roomSvc: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setRoomId();
    this.setPageMode();

    this.buildForm();

    if (this.pageMode == PageMode.Edit) {
      this.loadRoom();
    }
  }

  submitForm() {
    if (this.roomForm.valid) {
      if (this.pageMode == PageMode.Create) {
        this.roomSvc.createRoom(this.roomForm.value).subscribe({
          next: (roomFromApi) => {
            this.router.navigate(['/rooms']);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            alert(err);
          },
        });
      } else {
        this.roomSvc.editRoom(this.roomId!, this.roomForm.value).subscribe({
          next: () => {
            this.router.navigate(['/rooms']);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            alert(err.message);
          },
        });
      }
    }
  }

    //#region Private Methods

    private buildForm() {
      this.roomForm = this.fb.group({
        id: [0],
        name: ['', Validators.required],
        address: ['', Validators.required],
        price: ['', Validators.required],
      });
    }
  
    private setRoomId(): void {
      this.roomId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  
    private setPageMode(): void {
      if (this.roomId) {
        this.pageMode = PageMode.Edit;
      }
    }
  
    private loadRoom() {
      this.roomSvc.getRoom(this.roomId!).subscribe({
        next: (roomFromApi) => {
          this.room = roomFromApi;
          this.roomForm.patchValue(roomFromApi);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          alert(err);
        },
      });
    }
  
    //#endregion

}
