import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddartComponent } from './adding/addart/addart.component';
import { AddgalleryComponent } from './adding/addgallery/addgallery.component';
import { AddslideComponent } from './adding/addslide/addslide.component';
import { LoginComponent } from './components/login/login.component';

import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { from } from 'rxjs';
import { SearchComponent } from './components/search/search.component';
import { ShopingComponent } from './components/shoping/shoping.component';
import { ArtCategoriComponent } from './components/art-categori/art-categori.component'
import { EmailsComponent } from './components/emails/emails.component';
import { GalerijaComponent } from './components/galerija/galerija.component';
import { ArtikalComponent } from './components/home/artikal/artikal.component';
import { PorudzbineComponent } from './admin/porudzbine/porudzbine.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { InboxComponent } from './admin/inbox/inbox.component';
import { AkcijaComponent } from './components/akcija/akcija.component';
import { KataloziComponent } from './components/katalozi/katalozi.component';
import { AddKatalogComponent } from './adding/add-katalog/add-katalog.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addGallery', component: AddgalleryComponent, canActivate: [AuthGuard] },
  { path: 'addArtical', component: AddartComponent, canActivate: [AuthGuard] },
  { path: 'katalozi', component: KataloziComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'search/:searchText', component: SearchComponent },
  { path: 'shopping', component: ShopingComponent },
  { path: 'categori', component: ArtCategoriComponent },
  { path: 'email', component: EmailsComponent },
  { path: 'galerija', component: GalerijaComponent },
  { path: 'artikal/:id', component: ArtikalComponent },
  { path: 'porudzbenice', component: PorudzbineComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
  { path: 'akcija', component: AkcijaComponent },
  { path: 'addKatalog', component: AddKatalogComponent, canActivate: [AuthGuard]  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
