import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  ruta:string='http://localhost:3000/users';
  rutaPorudz:string='http://localhost:3000/porudzbina';

  constructor(private http:HttpClient) { }



  public sendMail(mail){
    return this.http.post(this.ruta+'/email',mail)
  }

  public sendPoruddzbina(porudzbina){
   
    return this.http.post(this.rutaPorudz+'/shop', porudzbina)

  }


}
