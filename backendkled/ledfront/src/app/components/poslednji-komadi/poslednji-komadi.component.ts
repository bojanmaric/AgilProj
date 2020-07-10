import { Component, OnInit } from '@angular/core';
import { ArtikalService } from 'src/app/servisi/artikal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/servisi/login.service';
import { Observable } from 'rxjs';
import { Artikal } from 'src/app/model/Artikal';
import { MatDialog } from '@angular/material/dialog';
import { EditArtDialogComponent } from '../dialogs/edit-art-dialog/edit-art-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poslednji-komadi',
  templateUrl: './poslednji-komadi.component.html',
  styleUrls: ['./poslednji-komadi.component.css']
})
export class PoslednjiKomadiComponent implements OnInit {

  artikli:Array<Artikal>;
  
  public putanja = "http://localhost:3000/artikal/image/";
  p: any;
  ulogovan = false;
  itemPerPage = 20;

  constructor(private artiService:ArtikalService,private snackBar:MatSnackBar,
    public dialog: MatDialog,  private router: Router,
     private logiService:LoginService) { }

  ngOnInit(): void {
    this.ulogovan = this.logiService.isLogged();
   this.loadData();
  }
  loadData(){
    this.artiService.getPoslednje().subscribe(
      res=>{
        this.artikli=res['artikli']
      },err=>{
        this.snackBar.open('Doslo je do greske na serveru','Uredu',{duration:1500})
      }
    )
  }
  
  getImage(art) {
    return this.putanja + art;
  }
  
  changePerPage(br) {
    this.itemPerPage = br;
  }
  

  deleteArt(art) {
   

    this.artiService.deleteArtikal(art._id, art.srcSlika).subscribe(
      res => {
       
        if (res['success']) {
          this.loadData();
          this.snackBar.open("Uspesno ste obrisali", "Uredu", { duration: 2000 });
        } else {
          this.snackBar.open("Greska prilikom brisanja", "Uredu", { duration: 2000 })
        }

      }, error => {
        this.snackBar.open("Serverska greska", "Uredu", { duration: 2000 })
       
      }
    )
  }
  editArt(art) {
    console.log(art)
    const dialogRef = this.dialog.open(EditArtDialogComponent, {
      height: '70vh', data: {
        id: art._id, nazivArtikla: art.nazivArtikla,
        sifraArtikla: art.sifraArtikla, cenaArtikla: art.cenaArtikla, kategorija: art.kategorija, vrstaProizvoda: art.vrstaProizvoda,
        jacina: art.jacina, tipGrla: art.tipGrla, izborSvetla: art.izborSvetla, bojaSvetla: art.bojaSvetla, napon: art.napon,
        boja: art.boja, materijal: art.materijal, dimenzije: art.dimenzije,poslednji:art.poslednji, stepenZastite: art.stepenZastite, akcija: art.akcija, popust: art.popust
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    })
  }
  openArtikal(art) {
    this.router.navigate(['/artikal/' + art._id]);
  }

  addShop(art) {
    this.artiService.addShop(art, 1);
    this.snackBar.open('Uspesno dodato', 'Uredu', { duration: 500 })
  }
}
