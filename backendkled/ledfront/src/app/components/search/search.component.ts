import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArtikalService } from 'src/app/servisi/artikal.service';
import { Observable } from 'rxjs';
import { filter, find } from 'rxjs/operators'
import { Artikal } from 'src/app/model/Artikal';
import { LoginService } from 'src/app/servisi/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import{EditArtDialogComponent} from '../dialogs/edit-art-dialog/edit-art-dialog.component'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: ActivatedRoute,private route:Router, private artiService: ArtikalService,private logiService: LoginService,
    private snacBar: MatSnackBar,
    public dialog:MatDialog) { }

  searchText: string;

  public putanja = "http://localhost:3000/artikal/image/";


  showSpiner = false;
  artika: Artikal;
  artsear: Array<Artikal>=new Array<Artikal>();
  prazan=false;
  len:number;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.searchText = params.get('searchText');
      this.loadData();
    })
  }

  loadData() {

    this.artiService.searchArt(this.searchText).subscribe(
      res => {
        if (res['success']) {
          this.artsear = res['artikli'];
          if(this.artsear.length==0){
            this.prazan=true;
          }else{
            this.prazan=false;
          }
        }
      }, error => {
      }
    );
   
  }
  

  addShop(art){
    this.artiService.addShop(art,1);
 }

  getImage(art) {

    return this.putanja + art;
  }

  
  openArtikal(art){

    this.route.navigate(['/artikal/'+art._id]);


  }


  deleteArt(art) {
    this.showSpiner = true;

    this.artiService.deleteArtikal(art._id, art.srcSlika).subscribe(
      res => {
        this.showSpiner = false;
        if (res['success']) {
          this.loadData();
          this.snacBar.open("Uspesno ste obrisali", "Uredu", { duration: 2000 });


        } else {
          this.snacBar.open("Greska prilikom brisanja", "Uredu", { duration: 2000 })

        }

      }, error => {
        this.snacBar.open("Serverska greska", "Uredu", { duration: 2000 })
        this.showSpiner = false;
      }
    )
  }
  editArt(art) {
    console.log(art)
     const dialogRef= this.dialog.open(EditArtDialogComponent,{ height:'70vh',data:{id:art._id,nazivArtikla:art.nazivArtikla,
      sifraArtikla: art.sifraArtikla, cenaArtikla:art.cenaArtikla, kategorija:art.kategorija, vrstaProizvoda:art.vrstaProizvoda, 
      jacina:art.jacina, tipGrla:art.tipGrla, izborSvetla: art.izborSvetla, bojaSvetla:art.bojaSvetla,napon:art.napon, 
      boja:art.boja, materijal:art.materijal, dimenzije:art.dimenzije, stepenZastite:art.stepenZastite, poslednji:art.poslednji,akcija:art.akcija, popust:art.popust}})
      
      dialogRef.afterClosed().subscribe(result=>{
        if(result==1){
          this.loadData();
        }
      })
    }
    ulogovanIn() {
      if (this.logiService.isLogged()) {
        return true;
      }
      return false;
    }


}
