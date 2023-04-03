import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HotelComponent } from './hotel/hotel.component';
import { BookingComponent } from './booking/booking.component';
import { RoomComponent } from './room/room.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DeleteCustomerComponent } from './customer/delete-customer/delete-customer.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AddEditBookingComponent } from './booking/add-edit-booking/add-edit-booking.component';
import { BookingDetailsComponent } from './booking/booking-details/booking-details.component';
import { AddEditRoomComponent } from './room/add-edit-room/add-edit-room.component';
import { RoomDetailsComponent } from './room/room-details/room-details.component';
import { DeleteRoomComponent } from './room/delete-room/delete-room.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    HomeComponent,
    HotelComponent,
    BookingComponent,
    RoomComponent,
    CustomerDetailsComponent,
    NotFoundComponent,
    DeleteCustomerComponent,
    AddEditCustomerComponent,
    AddEditBookingComponent,
    BookingDetailsComponent,
    AddEditRoomComponent,
    RoomDetailsComponent,
    DeleteRoomComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
