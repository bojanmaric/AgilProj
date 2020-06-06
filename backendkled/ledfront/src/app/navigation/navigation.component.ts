import { Component, OnInit, OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as $ from 'jquery';
import { LoginService } from '../servisi/login.service';
import { Router } from '@angular/router';
import { ArtikalService } from '../servisi/artikal.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ulogovan = false;
  searchText: string;
  countShop=this.artiservice.shopArtikli.length;

  dropd: boolean = false;

  ngOnInit(){
    this.artiservice.getCount().subscribe( data=>{
      this.countShop=data;
    })
  
  }
  panelOpenState = false;
  constructor(private breakpointObserver: BreakpointObserver, private logingService: LoginService, private router: Router, private artiservice:ArtikalService) {
     
  }

  search() {

    if (this.searchText != null) {
      this.router.navigate(['/search/', this.searchText])
      this.searchText = null;
    }

  }
  logout() {
    this.logingService.logout();

  }
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }
  

}
