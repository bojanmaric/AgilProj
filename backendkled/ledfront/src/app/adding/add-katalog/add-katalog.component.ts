import { Component, OnInit } from '@angular/core';
import { KatalogService } from 'src/app/servisi/katalog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-katalog',
  templateUrl: './add-katalog.component.html',
  styleUrls: ['./add-katalog.component.css']
})
export class AddKatalogComponent implements OnInit {

  nazivKataloga:string;
  slika:File=null;
  constructor(private katalogService:KatalogService,public snackBar:MatSnackBar) { }

  link:string;
  ngOnInit(): void {
  }
  onImageAdded(event){
    this.slika=event.target.files[0]
  }

  add(){
    if(this.slika!=null){
      this.katalogService.addKatalog(this.slika,this.nazivKataloga,this.link).subscribe(
        res=>{
          if(res['success']===true){
            this.snackBar.open('Uspesno ste dodali katalog','Uredu',{duration:1500});
          }else{
            this.snackBar.open('Doslo je do greske na serveru','Uredu',{duration:1500});
        
          }
        },error=>{

          this.snackBar.open('Doslo je do greske na serveru','Uredu',{duration:1500});

        }
      )
    }else{
      this.snackBar.open('Niste izabrali sliku','Uredu',{duration:1500});

    }

  }
  reset(){
    this.slika=null;
    this.nazivKataloga='';
    this.link=''
  }
}
