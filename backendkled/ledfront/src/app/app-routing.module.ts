import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {AddartComponent} from './adding/addart/addart.component';
import {AddgalleryComponent} from './adding/addgallery/addgallery.component';
import {AddslideComponent} from './adding/addslide/addslide.component';
import{LoginComponent} from './components/login/login.component';

import{RegistrationComponent}from './components/registration/registration.component';
import{AuthGuard} from './auth/auth.guard';
import { from } from 'rxjs';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'addGallery', component:AddgalleryComponent},/* canActivate:[AuthGuard]*/ 
  {path:'addArtical', component:AddartComponent},
  {path:'addSlide', component:AddslideComponent},
  {path:'login', component:LoginComponent},
  {path:'registration', component:RegistrationComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration : 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
