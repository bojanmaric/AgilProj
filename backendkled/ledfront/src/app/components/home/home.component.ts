import { Component, OnInit, Inject } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ArtikalService } from '../../servisi/artikal.service'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servisi/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikal } from 'src/app/model/Artikal';
import { MatDialog } from '@angular/material/dialog';
import{EditArtDialogComponent} from '../dialogs/edit-art-dialog/edit-art-dialog.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carouselImg: Array<string> = ['../../../assets/home/pozadina4.jpg', '../../../assets/home/pozadina5.jpg', '../../../assets/home/slika4.jpg'];

  public putanja = "http://localhost:3000/artikal/image/";


  showSpiner = false;
  artikli: Array<Artikal>;
  akcijski: Array<Artikal>;
  p: any;
  constructor(config: NgbCarouselConfig,
    private artiService: ArtikalService,
    private router: Router,
    private logiService: LoginService,
    private snacBar: MatSnackBar,
    public dialog:MatDialog) {

    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;

  }
  ngOnInit(): void {
    this.loadData();

  }

  loadData() {
    this.artiService.getAllArtikle().subscribe(res => {

      this.artikli = res['artikli'];

    },
      error => {
        this.snacBar.open("greska", "OK")
      });

  }
  getImage(art) {

    return this.putanja + art;
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
      boja:art.boja, materijal:art.materijal, dimenzije:art.dimenzije, stepenZastite:art.stepenZastite, akcija:art.akcija, popust:art.popust}})
      
      dialogRef.afterClosed().subscribe(result=>{
        if(result==1){
          this.loadData();
        }
      })
    }


}
