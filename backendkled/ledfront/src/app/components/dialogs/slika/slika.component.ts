import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

declare var $: any
@Component({
  selector: 'app-slika',
  templateUrl: './slika.component.html',
  styleUrls: ['./slika.component.css']
})
export class SlikaComponent implements OnInit {

  public ruta = "http://localhost:3000/gallery/image/"
  constructor(
    public dialogRef: MatDialogRef<SlikaComponent>
  ) { }

  slika: string;

  close(){
    this.dialogRef.close()
  }

  ngOnInit(): void {
    if (window.innerWidth < 769) {
      this.dialogRef.updateSize('100vw');
    }
  }

  getImage() {
    return this.ruta + this.slika;
  }
}
