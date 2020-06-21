import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-slika',
  templateUrl: './slika.component.html',
  styleUrls: ['./slika.component.css']
})
export class SlikaComponent implements OnInit {

  public ruta = "http://localhost:3000/gallery/image/"
  constructor(
    public dialogRef:MatDialogRef<SlikaComponent>
  ) { }

  slika:string;


  ngOnInit(): void {
  }

  getImage(){
    return this.ruta+this.slika;
  }
}
