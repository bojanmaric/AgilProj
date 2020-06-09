import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Poruka } from '../model/Poruka';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shop } from '../model/Shop';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  ruta:string='http://localhost:3000/users';
  rutaPorudz:string='http://localhost:3000/porudzbina';


  poruke:BehaviorSubject<Poruka[]>=new BehaviorSubject<Poruka[]>([]);
  porudzbine:BehaviorSubject<Shop[]>=new BehaviorSubject<Shop[]>([]);


  constructor(private http:HttpClient) { }



  public sendMail(mail){
    return this.http.post(this.ruta+'/email',mail)
  }

  public sendPoruddzbina(porudzbina){
   
    return this.http.post(this.rutaPorudz+'/shop', porudzbina)

  }
  public getPoruke():Observable<Poruka[]>{

    this.http.get<Poruka[]>(this.ruta+'/poruke').subscribe(
      data=>{
        this.poruke.next(data)
      }
    )
    return this.poruke.asObservable();


  }
/*   public porukaNum():number{
    var poruk:Array<Poruka[]>= new Array<Poruka[]>();
    poruk=this.poruke.value['poruke'];
    console.log(poruk.length)
    return poruk.length;
  }
  public porudzbinaNum():number{
    var porudz:Array<Shop[]>= new Array<Shop[]>()
    porudz=this.porudzbine.value['porudzbenice']
    console.log(porudz.length)
    return porudz.length;
  }
 */
  public getPorukaByID(id){
    return this.http.get(this.ruta+'/poruke/'+id)
  }
   
  public getPorudzbine():Observable<Shop[]>{

    this.http.get<Shop[]>(this.rutaPorudz+'/shop').subscribe(
      data=>{
        this.porudzbine.next(data);
      }
    )

    return this.porudzbine.asObservable();

  }

  public getPorudzbinaByID(id){
    return this.http.get(this.rutaPorudz+'/shop/'+id)
  }
  public brisiPoruku(id){

    return this.http.delete(this.ruta+'/deletePoruku/'+id);

  }
  public brisiPorudzbinu(id){
    return this.http.delete(this.rutaPorudz+'/deletePorudzbinu/'+id);
  }

  


}
