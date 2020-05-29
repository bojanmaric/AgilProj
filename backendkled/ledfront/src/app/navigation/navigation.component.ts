import { Component, OnInit, OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as $ from 'jquery';
import{LoginService}from '../servisi/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent  {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ulogovan=false;
  countShop:number=0;
  droptext: string = "keyboard_arrow_right";
  dropd: boolean=false;
 
   // var target = event.target || event.srcElement || event.currentTarget;

   panelOpenState = false;
  constructor(private breakpointObserver: BreakpointObserver, private logingService:LoginService) {
    
  }
  logout(){
    this.logingService.logout();
  
  }
  ulogovanIn(){
    if(this.logingService.isLogged()){
      return true;
    }
    return false;
  }

}
