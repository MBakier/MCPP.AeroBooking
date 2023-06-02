import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotelService } from 'app/services/hotel.service';
import { DeleteHotelComponent } from './delete-hotel/delete-hotel.component';
import { DeleteDialogData } from 'app/models/deleteDialogData.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelList } from 'app/models/Hotels/hotelList.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit{

  hotels: HotelList[] = [];
  showSpinner: boolean = true;

  constructor(
    private hotelSvc: HotelService,
    public dialogSvc: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.loadHotels();
  }

    deleteHotel(id: number, name: string): void {

    const dialogRef = this.dialogSvc.open(DeleteHotelComponent, {
      data: {
        name: name,
      } as DeleteDialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe({

      next: (answer: Boolean) => {

        if (answer) {

          this.showSpinner = true;

          this.hotelSvc.deleteHotel(id).subscribe({
            next: () => {
              this.loadHotels();
            },
            error: (e: HttpErrorResponse) => {
              alert(e.message);
              console.log(e);
            }
          });
        }
      }
    });
  }

  //#region Privates

  private loadHotels(): void {

    this.hotelSvc.getHotels().subscribe({
      next: (hotelsFromApi) => {
        this.hotels = hotelsFromApi;
        this.showSpinner = false;
      },
      error: (e: HttpErrorResponse) => {
        console.log(`Error ${e}`);
      }
    });
  }

  //#endregion

}
