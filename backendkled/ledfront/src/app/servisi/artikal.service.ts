import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Artikal } from '../model/Artikal';
import { Observable, BehaviorSubject } from 'rxjs';
import { ArtShop } from '../model/ArtShop';
import { map, find } from 'rxjs/operators';
import { __values } from 'tslib';
import { Router, Data } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ArtikalService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  ruta: string = 'http://localhost:3000/artikal';
  dataChange: BehaviorSubject<Artikal[]> = new BehaviorSubject<Artikal[]>([]);
  artikal: Artikal;
  shopart: ArtShop;
  countArtShop: BehaviorSubject<number>;
  shopArtikli: Array<ArtShop> = new Array<ArtShop>();


  constructor(private httpClient: HttpClient, private router: Router) {
    this.countArtShop = new BehaviorSubject<number>(0);
  }

  //vracanje svih proizvoda iz baze
  public getAllArtikle(): Observable<Artikal[]> {
    this.httpClient.get<Artikal[]>(this.ruta + '/getAll').subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);

      });
     
    return this.dataChange.asObservable();
  }

  public getArtikalbyId(id) {

    return this.httpClient.get(this.ruta + '/getArt/' + id)

  }

  //vraca trenutno stanje proizvoda u korpi
  public shop() {

    return this.shopArtikli;

  }

  //vraca artikle ucitane
  public getArt(kategorija, vrstaProizvoda) {

    if (this.dataChange.getValue().length == 0) {
      this.router.navigateByUrl('/')
    }

   /*  const data:Data={
      kategorija:kategorija,
      vrstaProizvoda:vrstaProizvoda
    } */

    if (kategorija != '' && vrstaProizvoda === '') {
     // return this.httpClient.get<Artikal[]>(this.ruta+'/kategorijaVrsta',data)
      return this.dataChange.value['artikli'].filter((kat) => kat.kategorija === kategorija);
    } else if (kategorija != '' && vrstaProizvoda != '') {
      return this.dataChange.value['artikli'].filter((kat) => kat.kategorija === kategorija && kat.vrstaProizvoda === vrstaProizvoda);
    } else {
      return this.dataChange.value['artikli'];
    }
   // return this.httpClient.get<Artikal[]>(this.ruta+'/kategorijaVrsta',vrstaProizvoda)
    //.subscribe(
   /*     data=>{
          data['artikli']
       } */
    // )


  }

  //dodavanje proizvoda
  public addShop(art, kol) {

    this.shopart =
    {
      nazivArtikla: art.nazivArtikla,
      sifraArtikla: art.sifraArtikla,
      cenaArtikla: art.cenaArtikla,
      srcSlika: art.srcSlika,
      kolicina: kol,
      ukupno: art.cenaArtikla
    }
    var nalazi = false;
    for (var i in this.shopArtikli) {
      if (this.shopart.sifraArtikla === this.shopArtikli[i].sifraArtikla) {
        this.shopArtikli[i].kolicina = this.shopArtikli[i].kolicina + this.shopart.kolicina;
        this.shopArtikli[i].ukupno = this.shopArtikli[i].cenaArtikla * this.shopArtikli[i].kolicina;
        console.log(this.shopArtikli[i].ukupno)
        nalazi = true;
      }
    }
    if (!nalazi) {
      this.shopArtikli.push(this.shopart);
      this.countArtShop.next(this.shopArtikli.length);
      //localStorage.setItem('shopArtikli',this.shopArtikli.values)
    }

  }


  //brise iz korpe
  public deleteShop(artsh): Observable<boolean> {

    const uspesno: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    this.shopArtikli.forEach((item, index) => {
      if (item === artsh) {
        this.shopArtikli.splice(index, 1);
        this.countArtShop.next(this.shopArtikli.length);
        uspesno.next(true);
        return uspesno.asObservable();
      }
    });
    return uspesno.asObservable();
  }

  public brisiShop(){
    this.shopArtikli=[];
    this.countArtShop.next(this.shopArtikli.length);

  }

  //vraca broj proizvoda u korpi
  getCount(): Observable<number> {
    return this.countArtShop.asObservable();
  }

  //dodavanje artikla u bazu
  public addArtikal(artikal, file) {
    console.log(artikal, file);
    var body = JSON.stringify(artikal.value);
    const fData: FormData = new FormData();
    fData.append('artikal', body);
    fData.append('file', file, file.name);
    return this.httpClient.post(this.ruta + '/addArtikal', fData);
  }

  //pretraga proizvoda po nazivu
  public searchArt(search: string) {

    return this.httpClient.get(this.ruta + '/searchArt/' + search);

  }

  //abdejtuje proizvode
  public updateArtikal(id, artikal) {

    return this.httpClient.put(this.ruta + '/' + id, artikal);
  }

  //brise proizvode
  public deleteArtikal(id, ima) {

    this.brisi(ima).subscribe();
    return this.httpClient.delete(this.ruta + '/' + id);
  }

  //brise sliku od obrisanog proizvoda
  brisi(image) {
    return this.httpClient.delete(this.ruta + '/brisi/' + image);

  }
  public akcijskiArt() {
    return this.httpClient.get<Artikal>(this.ruta + '/akcija')
  }


}
