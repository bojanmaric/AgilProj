import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArtikalService } from 'src/app/servisi/artikal.service';
import { Artikal } from 'src/app/model/Artikal';
import { find } from 'rxjs/operators';
import { error } from 'protractor';

@Component({
  selector: 'app-artikal',
  templateUrl: './artikal.component.html',
  styleUrls: ['./artikal.component.css']
})
export class ArtikalComponent implements OnInit {

  constructor(private route: ActivatedRoute, private artiService: ArtikalService) { }

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
    this.kolicina--
  }


  getImage(art){
    return this.putanja+art.srcSlika
  }

}
