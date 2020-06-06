import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { GalleryService } from 'src/app/servisi/gallery.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addgallery',
  templateUrl: './addgallery.component.html',
  styleUrls: ['./addgallery.component.css']
})
export class AddgalleryComponent implements OnInit {

  constructor(private galService:GalleryService, private snackBar:MatSnackBar) { }

slika:File=null;
//srcSlike:string;
  public ruta='http://localhost:3000/porudzbina'
  ngOnInit(): void {
  }

  onImageAdded(event){
    this.slika=event.target.files[0]
  }

  add(){
    if(this.slika!=null){
      console.log(this.slika);
      this.galService.addGallery(this.slika).subscribe(
        res=>{
          if(res['success']===true){
            this.snackBar.open('Uspesno ste dodali sliku','Uredu',{duration:1500});
          }else{
            this.snackBar.open('Doslo je do greske na serveru','Uredu',{duration:1500});

          }

        },error=>{

          this.snackBar.open('Doslo je do greske na serveru','Uredu',{duration:1500});

        }
      )
    }
    else{
      this.snackBar.open('Niste izabrali sliku','Uredu',{duration:1500});

    }
  }


}
