import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ArtikalService } from '../../servisi/artikal.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-addart',
  templateUrl: './addart.component.html',
  styleUrls: ['./addart.component.css']
})
export class AddartComponent implements OnInit {


  slika: File = null;

 

  srcSlika: string;

  pokazi = false;
  artikal = this.fb.group({
    nazivArtikla: ['', [Validators.required]],
    sifraArtikla: ['', [Validators.required]],
    cenaArtikla: [,[Validators.required]],
    kategorija: ['', [Validators.required]],
    vrstaProizvoda: ['', [Validators.required]],
    srcSlika: [''],
    jacina: [''],
    tipGrla: [''],
    izborSvetla: [''],
    bojaSvetla: [''],
    napon: [''],
    boja: [''],
    materijal: [''],
    dimenzije: [''],
    stepenZastite: [''],
  
    akcija: [false],
    popust: [0]
  });
  constructor(private fb: FormBuilder, private artiService: ArtikalService, private _snackBar: MatSnackBar) { }
 

  ngOnInit(): void {
    document.querySelector('body').scrollTo(0, 0)
  }
  resetForm() {
    this.artikal.reset;
  }
  onImageAdded(event) {

    this.slika = event.target.files[0];
    
    this.srcSlika = this.slika.name;
  }

  add() {
    if (this.artikal.valid) {
      
   
      this.pokazi = true;
      this.artiService.addArtikal(this.artikal,this.slika).subscribe(
        res=>{
          this.pokazi=false;
          this._snackBar.open('Uspešno dodat artikal', 'Close', { duration: 2500 });
      },
      error=>{
        this.pokazi=false;
        this._snackBar.open('Greska', 'Close', { duration: 2500 });

      }
      
      );

    } else {
      
      this._snackBar.open('Greska', 'Close', { duration: 2500 });
    }

  }

}
