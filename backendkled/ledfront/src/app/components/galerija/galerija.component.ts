import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/servisi/gallery.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { LoginService } from 'src/app/servisi/login.service';

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css']
})
export class GalerijaComponent implements OnInit {

  constructor(private galeriService:GalleryService, private snackBar:MatSnackBar,private loggingService:LoginService) { }

  galleryImg:Array<string[]>;
  public ruta = "http://localhost:3000/gallery/image/"

  ngOnInit(): void {
  
   this.loadData()
  }

loadData(){
  this.galeriService.getImagesGallery().subscribe(
    res=>{
       this.galleryImg=res['slika'];
    },err=>{
       this.snackBar.open('Doslo je do greske','Uredu', {duration:2000})
    }
  );
}
brisiSliku(gal){
  this.galeriService.brisiSliku(gal._id,gal.srcSlika).subscribe(
    res=>{
      if(res['success']===true){
        this.loadData();
      this.snackBar.open("Uspesno obrisano",'Uredu',{duration:1500});

      }
    },err=>{
      this.snackBar.open("greska",'Uredu',{duration:1500});
    }
  )

}
ulogovanIn() {
  if (this.loggingService.isLogged()) {
    return true;
  }
  return false;
}


  getImage(gal){
    return this.ruta+gal
  }

}
