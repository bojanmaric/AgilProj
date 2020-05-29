import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Artikal} from '../model/Artikal';
import{Observable, BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArtikalService {
  noAuthHeader={headers:new HttpHeaders({'NoAuth':'True'}) };
  ruta:string='http://localhost:3000/artikal';

  dataChange:BehaviorSubject<Artikal[]>=new BehaviorSubject<Artikal[]>([]);

  artikal:Artikal;
  constructor(private httpClient:HttpClient) { }

  public getAllArtikle():Observable<Artikal[]>{
    this.httpClient.get<Artikal[]>(this.ruta+'/getAll').subscribe(data=>{
      this.dataChange.next(data);
    },
    (error:HttpErrorResponse)=>{
      console.log(error.name+' '+error.message);
      
    });
    return this.dataChange.asObservable();
  }

  public addArtikal(artikal, file){
    console.log(artikal, file);
    var body=JSON.stringify( artikal.value);
    const fData:FormData=new  FormData();
    fData.append('artikal',body);
    fData.append('file',file,file.name);
    return this.httpClient.post(this.ruta+'/addArtikal', fData);
  }

  public updateArtikal(id,artikal){
    console.log(id,artikal)

     return this.httpClient.put(this.ruta+'/'+id,artikal);
  }
  public deleteArtikal(id,ima){
    this.brisi(ima).subscribe();
    return this.httpClient.delete(this.ruta+'/'+id);
  }
  brisi(image){
    return this.httpClient.delete(this.ruta+'/brisi/' + image);

  }


}
