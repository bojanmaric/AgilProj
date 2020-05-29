import { Component, OnInit,Inject } from '@angular/core';
import {ArtikalService}from '../../../servisi/artikal.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-art-dialog',
  templateUrl: './edit-art-dialog.component.html',
  styleUrls: ['./edit-art-dialog.component.css']
})
export class EditArtDialogComponent implements OnInit {

  constructor(public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<EditArtDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public artiService:ArtikalService) { }

    //id:string;
  ngOnInit(): void {
    console.log(this.data)
  }

  public update():void{
    this.artiService.updateArtikal(this.data.id, this.data).subscribe();
    this.snackBar.open("Uspešno modifikovan proizvodjac: ", "U redu", { duration: 2500 });
  }

  public cancel():void{
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", { duration: 1000 });
  }
}
