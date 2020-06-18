import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import {User}from'../model/User';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authToken:any;
 private user:User;

  noAuthHeader={headers:new HttpHeaders({'NoAuth':'True'}) };
  ruta:string='http://localhost:3000/users';
  constructor(private http:HttpClient) { }

  registerUser(user:User){

    return this.http.post(this.ruta+'/register',user,this.noAuthHeader);

  }

  loginUser(user){
    return this.http.post(this.ruta+'/login',user,this.noAuthHeader );
  }
  storeUserData(token:string) {
    localStorage.setItem('token', token);

  }
  getToken(){
    return localStorage.getItem('token');
  }

  isLogged() {
    var userPayload=this.getUserPayload();
    if(userPayload){
      return userPayload.exp>Date.now()/1000;
    }
    else{
      return false;
    }
  }
  getUserPayload(){
    var token=this.getToken();
    if(token){
      var userPayload=atob(token.split('.')[1])
      return JSON.parse(userPayload);
    }
    else
      return null;


  }
  getUser():User{
    return JSON.parse(localStorage.getItem('user'))
  }
 
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
  }

}
