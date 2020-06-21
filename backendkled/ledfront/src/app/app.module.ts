import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddartComponent } from './adding/addart/addart.component';
import { AddgalleryComponent } from './adding/addgallery/addgallery.component';
import { AddslideComponent } from './adding/addslide/addslide.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginService} from './servisi/login.service'
import {ArtikalService} from './servisi/artikal.service'
import { AuthInterceptor } from './auth/auth.interceptor';
import { FormsModule } from '@angular/forms';
import {MaterialModule}from './material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditArtDialogComponent } from './components/dialogs/edit-art-dialog/edit-art-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { ShopingComponent } from './components/shoping/shoping.component';
import { ArtCategoriComponent } from './components/art-categori/art-categori.component';
import { EmailsComponent } from './components/emails/emails.component';
import {EmailsService}from './servisi/emails.service';
import { ShopComponent } from './components/dialogs/shop/shop.component';
import { GalleryService } from './servisi/gallery.service';
import { GalerijaComponent } from './components/galerija/galerija.component';
import { ArtikalComponent } from './components/home/artikal/artikal.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { InboxComponent } from './admin/inbox/inbox.component';
import { PorudzbineComponent } from './admin/porudzbine/porudzbine.component';
import { AkcijaComponent } from './components/akcija/akcija.component';
import { AOS }from 'aos';
import { KataloziComponent } from './components/katalozi/katalozi.component';
import { AddKatalogComponent } from './adding/add-katalog/add-katalog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    AddartComponent,
    AddgalleryComponent,
    AddslideComponent,
    LoginComponent,
    RegistrationComponent,
    EditArtDialogComponent,
    SearchComponent,
    ShopingComponent,
    ArtCategoriComponent,
    EmailsComponent,
    ShopComponent,
    GalerijaComponent,
    ArtikalComponent,
    ProfileComponent,
    InboxComponent,
    PorudzbineComponent,
    AkcijaComponent,
    KataloziComponent,
    AddKatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    NgxPaginationModule
  
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, 
    useClass:AuthInterceptor,
    multi:true
  },AuthGuard,LoginService,ArtikalService, EmailsService, GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
