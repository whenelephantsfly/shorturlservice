import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUrlsComponent } from './all-urls/all-urls.component';
import { ConvertUrlComponent } from './convert-url/convert-url.component';
import { LoginComponent } from './login/login.component';
import { SharedUrlsComponent } from './shared-urls/shared-urls.component';

import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: ConvertUrlComponent},
  {path: 'shared', component: SharedUrlsComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
