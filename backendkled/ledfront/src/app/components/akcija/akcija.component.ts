import { Component, OnInit } from '@angular/core';
import { ArtikalService } from 'src/app/servisi/artikal.service';
import { Router } from '@angular/router';
import { Artikal } from 'src/app/model/Artikal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/servisi/login.service';

@Component({
  selector: 'app-akcija',
  templateUrl: './akcija.component.html',
  styleUrls: ['./akcija.component.css']
})
export class AkcijaComponent implements OnInit {

  constructor(private arikalService:ArtikalService,private router:Router, private snacBar:MatSnackBar,private loginService:LoginService) { }

  public putanja = "http://localhost:3000/artikal/image/";

  itemPerPage = 20;
  p:any;
  artikli:Array<Artikal[]>;
  ngOnInit(): void {
    this.arikalService.akcijskiArt().subscribe(
      res=>{
        this.artikli=res['artikli'];
      },
      err=>{
        console.log(err)
      }
    )
  }
  getImage(art) {

    return this.putanja + art;
  }
  openArtikal(art){
    this.router.navigate(['/artikal/'+art._id]);
  }
  
  changePerPage(br) {
    this.itemPerPage = br;
  }

  addShop(art){
    this.arikalService.addShop(art,1);
    this.snacBar.open('Uspesno dodato','Uredu',{duration:500})

 }
 
 ulogovanIn() {
  if (this.loginService.isLogged()) {
    return true;
  }
  return false;
}



}
