import { Component, OnInit } from '@angular/core';
import { Katalog } from 'src/app/model/Katalog';
import { KatalogService } from 'src/app/servisi/katalog.service';
import { LoginService } from 'src/app/servisi/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-katalozi',
  templateUrl: './katalozi.component.html',
  styleUrls: ['./katalozi.component.css']
})
export class KataloziComponent implements OnInit {

  constructor(private katalogService:KatalogService, private loggingService:LoginService, private snackBar:MatSnackBar) { }

  
  public ruta = "http://localhost:3000/katalog/image/"
  katalozi:Array<Katalog[]>=new Array<Katalog[]>()
  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    this.katalogService.getKataloge().subscribe(
      res=>{
        this.katalozi=res['katalozi']
      }
    )

  }
  

  getImage(kat){
    return this.ruta+kat
  }

  brisiKatalog(katalog){
    this.katalogService.brisiKataloga(katalog._id,katalog.srcSlika).subscribe(
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

}
