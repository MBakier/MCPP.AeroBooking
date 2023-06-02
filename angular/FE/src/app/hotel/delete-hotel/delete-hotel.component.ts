import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogData } from 'app/models/deleteDialogData.model';

@Component({
  selector: 'app-delete-hotel',
  templateUrl: './delete-hotel.component.html',
  styleUrls: ['./delete-hotel.component.css']
})
export class DeleteHotelComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) { }

  ngOnInit(): void {
  }
}
