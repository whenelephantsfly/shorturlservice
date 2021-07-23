import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUrlsComponent } from './all-urls/all-urls.component';
import { ConvertUrlComponent } from './convert-url/convert-url.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: ConvertUrlComponent},
  {path: 'allUrls', component: AllUrlsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
