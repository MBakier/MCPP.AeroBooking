import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelDetails } from 'app/models/Hotels/hotelDetails.model';
import { HotelService } from 'app/services/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit{

  hotelId!: number;
  hotel!: HotelDetails;


  constructor(
    private hotelSvc: HotelService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    
    this.loadHotel();
  }

  loadHotel() {
    
    this.hotelId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.hotelId) {
      
      this.hotelSvc.getHotel(this.hotelId).subscribe({
        next: (hotelFromApi: HotelDetails) => {
          this.hotel = hotelFromApi;
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.message);
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

}
