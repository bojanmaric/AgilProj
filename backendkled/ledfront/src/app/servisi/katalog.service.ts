import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Katalog } from '../model/Katalog';

@Injectable({
  providedIn: 'root'
})
export class KatalogService {

  public ruta='http://localhost:3000/katalog';


  katalozi:BehaviorSubject<Katalog[]>=new BehaviorSubject<Katalog[]>([]);

  constructor(private http:HttpClient) { }

  getKataloge():Observable<Katalog[]>{
    this.http.get<Katalog[]>(this.ruta).subscribe(data=>{
      this.katalozi.next(data);
    })
    return this.katalozi.asObservable();
  }

  addKatalog(slika,nazivKataloga,link){
    const fdata:FormData=new FormData();
    fdata.append('file',slika,slika.name);
    fdata.append('nazivKataloga',nazivKataloga);
    fdata.append('link',link)

    return this.http.post(this.ruta+'/add',fdata)
  }
  brisiKataloga(id,katalog){

    this.delKatalog(katalog)
    return  this.http.delete(this.ruta+'/delete/'+id)
  }
  delKatalog(image){
    this.http.delete(this.ruta+'/brisi/'+image).subscribe()
  }

}
