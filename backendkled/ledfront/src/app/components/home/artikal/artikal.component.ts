import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArtikalService } from 'src/app/servisi/artikal.service';
import { Artikal } from 'src/app/model/Artikal';
import { find } from 'rxjs/operators';
import { error } from 'protractor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-artikal',
  templateUrl: './artikal.component.html',
  styleUrls: ['./artikal.component.css']
})
/* @Pipe({name: 'round'}) */
export class ArtikalComponent implements OnInit {

  constructor(private route: ActivatedRoute, private artiService: ArtikalService, private snackBar:MatSnackBar) { }

  public putanja = "http://localhost:3000/artikal/image/";

  artikal: Artikal;
  id: any
  kolicina=0;
  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.artiService.getArtikalbyId(this.id).subscribe(
        res => {
          console.log(res)
          this.artikal = res['artikal']
        }
      );
    })


    console.log(this.artikal)
    //this.artikal=this.artiService.dataChange()


  }

  plus(){
    this.kolicina++
  }
  minus(){
    if((this.kolicina-1)>0){
        this.kolicina--
    }
  }
  addShop(art){
    this.artiService.addShop(art,this.kolicina);
    this.snackBar.open('Uspesno dodato','Uredu',{duration:500})

  }

  

  getImage(art){
    return this.putanja+art.srcSlika
  }

}
