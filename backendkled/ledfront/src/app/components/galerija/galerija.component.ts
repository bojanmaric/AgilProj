import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/servisi/gallery.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { error } from 'protractor';

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css']
})
export class GalerijaComponent implements OnInit {

  constructor(private galeriService:GalleryService, private snackBar:MatSnackBar) { }

  galleryImg:Array<string[]>;
  public ruta = "http://localhost:3000/gallery/image/"

  ngOnInit(): void {
   this.galeriService.getImagesGallery().subscribe(
     res=>{

      
        this.galleryImg=res['slika'];
     

     },err=>{
        this.snackBar.open('Doslo je do greske','Uredu', {duration:2000})
     }
   );
    console.log(this.galleryImg)
  }





  getImage(gal){
    return this.ruta+gal
  }

}
