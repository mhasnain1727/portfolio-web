import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


const routes: Routes = [
  { path: 'info', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: '**', redirectTo: 'info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }