import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { HotelDetailsComponent } from './hotel/hotel-details/hotel-details.component';
import { HotelComponent } from './hotel/hotel.component';
import { AddEditHotelComponent } from './hotel/add-edit-hotel/add-edit-hotel.component';
import { RoomComponent } from './room/room.component';
import { RoomDetailsComponent } from './room/room-details/room-details.component';
import { AddEditRoomComponent } from './room/add-edit-room/add-edit-room.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailsComponent } from './booking/booking-details/booking-details.component';
import { AddEditBookingComponent } from './booking/add-edit-booking/add-edit-booking.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  
  {path:"customer", component: CustomerComponent},
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/details/:id', component: CustomerDetailsComponent },
  { path: 'customers/create', component: AddEditCustomerComponent },
  { path: 'customers/edit/:id', component: AddEditCustomerComponent },

  { path: 'hotels', component: HotelComponent },
  { path: 'hotels/details/:id', component: HotelDetailsComponent },
  { path: 'hotels/create', component: AddEditHotelComponent },
  { path: 'hotels/edit/:id', component: AddEditHotelComponent },

  { path: 'rooms', component: RoomComponent },
  { path: 'rooms/details/:id', component: RoomDetailsComponent },
  { path: 'rooms/create', component: AddEditRoomComponent },
  { path: 'rooms/edit/:id', component: AddEditRoomComponent },

  { path: 'bookings', component: BookingComponent },
  { path: 'bookings/details/:id', component: BookingDetailsComponent },
  { path: 'bookings/create', component: AddEditBookingComponent },
  { path: 'bookings/edit/:id', component: AddEditBookingComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
