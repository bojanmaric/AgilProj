import { Component, OnInit } from '@angular/core';
import { Artikal } from 'src/app/model/Artikal';
import { ArtikalService } from 'src/app/servisi/artikal.service';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { find, map } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/servisi/login.service';
import { EditArtDialogComponent } from '../dialogs/edit-art-dialog/edit-art-dialog.component';
import { partitionArray } from '@angular/compiler/src/util';

//import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-art-categori',
  templateUrl: './art-categori.component.html',
  styleUrls: ['./art-categori.component.css']
})
export class ArtCategoriComponent implements OnInit {

  kategorija: any;
  vrsta: any;
  p: any;
  artikliSort: Array<Artikal> = new Array<Artikal>();
  artikli: Array<Artikal> = new Array<Artikal>();
  pun=true;
  itemPerPage = 20;

  public putanja = "http://localhost:3000/artikal/image/";

  constructor(private route: ActivatedRoute,private router:Router, private artiService: ArtikalService, private logingService: LoginService,
    private snacBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(){
   // this.router.onSameUrlNavigation = 'reload';

    this.router.events.pipe(
      filter((event:RouterEvent)=>event instanceof NavigationEnd)
    ).subscribe(()=>{

      this.route.queryParams.subscribe(params => {
        this.kategorija = params['categori'];
        this.vrsta = params['vrsta'];
  
      });
      
      this.loadData(this.kategorija,this.vrsta);
    });
    
    this.route.queryParams.subscribe(params => {
      this.kategorija = params['categori'];
      this.vrsta = params['vrsta'];

    });
    
    this.loadData(this.kategorija,this.vrsta);
    

  }

  
  openArtikal(art){

    this.router.navigate(['/artikal/'+art._id]);


  }
  changePerPage(br) {
    this.itemPerPage = br;
  }

  
  deleteArt(art) {
 
    this.artiService.deleteArtikal(art._id, art.srcSlika).subscribe(
      res => {
        
        if (res['success']) {
          this.loadData(this.kategorija, this.vrsta);
          this.snacBar.open("Uspesno ste obrisali", "Uredu", { duration: 2000 });


        } else {
          this.snacBar.open("Greska prilikom brisanja", "Uredu", { duration: 2000 })

        }

      }, error => {
        this.snacBar.open("Serverska greska", "Uredu", { duration: 2000 })
       
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
        boja: art.boja, materijal: art.materijal, dimenzije: art.dimenzije, poslednji:art.poslednji,stepenZastite: art.stepenZastite, akcija: art.akcija, popust: art.popust
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData(this.kategorija, this.vrsta);
      }
    })
  }

  addShop(art){
     this.artiService.addShop(art,1);
    this.snacBar.open('Uspesno dodato','Uredu',{duration:500})

  }


  getImage(art) {

    return this.putanja + art;
  }

  loadData(kat, vr) {

   this.artikli= this.artiService.getArt(kat, vr);
   if(this.artikli.length>0){
     this.pun=true;
   }
   else{
     this.pun=false;
   }
     
   
  }

  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }
}
