import { Component, OnInit } from '@angular/core';
import { ArtikalService } from 'src/app/servisi/artikal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikal } from 'src/app/model/Artikal';
import { ArtShop } from 'src/app/model/ArtShop';
import { EmailsService } from 'src/app/servisi/emails.service';
import { MatDialog } from '@angular/material/dialog';
import { ShopComponent } from '../dialogs/shop/shop.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  public ruta="http://localhost:3000/artikal/image/"
  constructor(private artiSrvice:ArtikalService, 
    private dialog:MatDialog,private snackBar:MatSnackBar, private emailService:EmailsService, private router:Router) { }

  artikli:Array<ArtShop>=new Array<ArtShop>();
  ima=0;
  ngOnInit(): void {
    this.loaddata(); 
  }
  loaddata(){
      this.artikli=this.artiSrvice.shop();
      this.ima=this.artikli.length;
  }
  brisiShop(art){

    this.artiSrvice.deleteShop(art).subscribe(
      res=>{
        if(res){
          this.loaddata();
          this.snackBar.open('Obrisano','Uredu',{duration:2500})
        }else{
          this.snackBar.open('Greska','Uredu',{duration:2500})
        }
      }
    )
  }
  shopArtikle(){
    
    const dialogRef=this.dialog.open(ShopComponent,{height:'70vh',width:'80vw'})

  }

  brisiPorudz(){
    this.artiSrvice.brisiShop();
    this.router.navigate(['/'])
    
  }
  getImage(art){
    return this.ruta+art;
  }



}
