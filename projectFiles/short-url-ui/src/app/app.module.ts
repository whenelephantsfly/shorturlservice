import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConvertUrlComponent } from './convert-url/convert-url.component';
import { AllUrlsComponent } from './all-urls/all-urls.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUrlsComponent } from './shared-urls/shared-urls.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConvertUrlComponent,
    AllUrlsComponent,
    SignupComponent,
    SharedUrlsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
