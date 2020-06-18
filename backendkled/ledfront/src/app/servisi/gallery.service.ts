import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http:HttpClient) { }


  public ruta='http://localhost:3000/gallery';
 
  slikeGal:BehaviorSubject<string[]>=new BehaviorSubject<string[]>([]);

  getImagesGallery():Observable<string[]>{

    this.http.get<string[]>(this.ruta).subscribe(data=>{
      this.slikeGal.next(data);
    });
    return this.slikeGal.asObservable();
  }

  addGallery(slika){

    const fdata:FormData=new FormData();
    fdata.append('file', slika,slika.name);
    return this.http.post(this.ruta+'/add',fdata)

  }
  brisiSliku(id,slika){
    this.delSliku(slika).subscribe()
    return this.http.delete(this.ruta+'/delete/'+id);
  }

  delSliku(image){
    return this.http.delete(this.ruta+'/brisi/'+image)

  }



}
