import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'app/enums/pageMode.enum';
import { Hotel } from 'app/models/Hotels/hotel.model';
import { Lookup } from 'app/models/lookup.model';
import { HotelService } from 'app/services/hotel.service';
import { RoomService } from 'app/services/room.service';

@Component({
  selector: 'app-add-edit-hotel',
  templateUrl: './add-edit-hotel.component.html',
  styleUrls: ['./add-edit-hotel.component.css']
})
export class AddEditHotelComponent implements OnInit{

  hotel!: Hotel;
  hotelId?: number;
  hotelForm!: FormGroup;
  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;
  roomsLookup: Lookup[] = [];

  hotelNameExists: boolean = false;
  hotelNameExistsMessage: string = 'Hotel name already exists';

  constructor(
    private hotelSvc: HotelService,
    private roomSvc: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
   ) { }

  ngOnInit(): void {
    
    this.setHotelId();
    this.setPageMode();

    this.buildForm();
    
    this.loadRoomsLookup();

    if (this.pageMode == PageMode.Edit) {

      this.loadHotel();
    }
  }

  submitForm(): void {

    if (this.hotelForm.valid) {
  
      if (this.pageMode == PageMode.Create) {
  
        this.hotelSvc.createHotel(this.hotelForm.value).subscribe({
  
        next: () => {
          this.router.navigate(['/hotels']);
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.error);
        }
      });
    }
    else {
  
      this.hotelSvc.editHotel(this.hotelId!, this.hotelForm.value).subscribe({
  
        next: () => {
          this.router.navigate(['/hotels']);
        },
          error: (e: HttpErrorResponse) => {
  
           console.log(`Error: ${e}`);
          }
        });
      }
    }
  }

  //#region Private

  private loadHotel() {

    this.hotelSvc.getEditHotel(this.hotelId!).subscribe({
      next: (hotelFromApi: Hotel) => {
        this.hotel = hotelFromApi;
        this.hotelForm.patchValue(hotelFromApi);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private setHotelId() {

    this.hotelId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  private setPageMode() {

    if (this.hotelId) {

      this.pageMode = PageMode.Edit
    }
  }

  private buildForm() {

    this.hotelForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      address: ['', Validators.required],
      rating: ['', Validators.required],
      roomIds: [[]],
      images: []
    });
  }

  private loadRoomsLookup(): void {

    this.roomSvc.getRoomLookup().subscribe({
      next: (roomLookupFromApi) => {
        this.roomsLookup = roomLookupFromApi;
      }
    });
  }
}