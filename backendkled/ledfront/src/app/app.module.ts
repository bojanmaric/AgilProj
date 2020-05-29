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
    EditArtDialogComponent
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
  },AuthGuard,LoginService,ArtikalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
