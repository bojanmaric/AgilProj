import { Component, OnInit } from '@angular/core';


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailsService } from 'src/app/servisi/emails.service';
import { ArtikalService } from 'src/app/servisi/artikal.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ArtShop } from 'src/app/model/ArtShop';




@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public ruta = "http://localhost:3000/artikal/image/";

  showSpiner = false;
  constructor(private emailService: EmailsService, private artiService: ArtikalService,
    public dialogRef: MatDialogRef<ShopComponent>,
    private fb: FormBuilder, private snackBar: MatSnackBar) { }

  artikli: Array<ArtShop> = new Array<ArtShop>();
  art: FormArray = new FormArray([]);
  ngOnInit(): void {
    this.artikli = this.artiService.shop();
    //this.punjenjeArt()
  }

  kupacPodaci = this.fb.group({
    imeKupca: ['', [Validators.required]],
    adresaKupca: ['', [Validators.required]],
    kontaktKupca: ['', [Validators.required]],
    emailKupca: ['', [Validators.email]],

    datum: [Date.now()],
    artikli: this.fb.array([

    ], [Validators.required])
  })
  artikliAdd() {

    return this.fb.group({
      nazivArtikla: [''],
      cenaArtikla: [],
      kolicina: [],
      ukupno: []
    })
  }
  punjenjeArt() {
    const artikli = <FormArray>this.kupacPodaci.get('artikli');

    for (var i in this.artikli) {

      var arti = this.fb.group({

        nazivArtikla: [this.artikli[i].nazivArtikla],
        cenaArtikla: [this.artikli[i].cenaArtikla],
        kolicina: [this.artikli[i].kolicina],
        ukupno: [this.artikli[i].ukupno]
      })

      artikli.push(arti)
    }


  }


  shop() {

    this.punjenjeArt();


    if (this.kupacPodaci.valid) {

      this.showSpiner = true;

      this.emailService.sendPoruddzbina(this.kupacPodaci.value).subscribe(
        res => {
          this.showSpiner = false;

          if (res['success'] === true) {
            this.snackBar.open('Uspesno ste poslali zahtev', 'Uredu', { duration: 3000 })
            this.dialogRef.close();
          } else {
            this.snackBar.open('Greska prilikom slanja porudzbine', 'Uredu', { duration: 3000 })
          }
        }, error => {
          this.showSpiner = false;

          this.snackBar.open('Greska prilikom slanja porudzbine na serveru', 'Uredu', { duration: 3000 })
        }
      )
    }
    else {
      this.snackBar.open('Niste uneli neophodna polja', 'Uredu', { duration: 2000 })
    }
  }

  getImage(art) {
    return this.ruta + art;
  }

}
