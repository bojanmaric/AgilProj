import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servisi/login.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private logiService:LoginService) { }

  user:User;
  ngOnInit(): void {
    this.loadUser()
  }

  loadUser(){
    this.user=this.logiService.getUser();
    console.log(this.user)
    
  }
}
