import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogData } from 'app/models/deleteDialogData.model';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.css']
})
export class DeleteRoomComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) { }

  ngOnInit(): void {
  }
  
}
