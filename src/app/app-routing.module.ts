import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InnerPageLayoutComponent } from './components/inner-page-layout/inner-page-layout.component';
import { authGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: 'info', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  // { path: 'dashboard', component: DashboardComponent },

  // {
  //   path: 'user',
  //   component: InnerPageLayoutComponent,
  //   canActivate: [authGuard],
  //   children: [
  //     {  path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //     { path: 'dashboard', component: DashboardComponent },
  //   ]
  // },
  {
    path: 'user',
    component: InnerPageLayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['teacher', 'student'] },
    children: [
      {  path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {  
        path: 'dashboard', 
        component: DashboardComponent,
      },
      {  
        path: 'profile', 
        component: ProfileComponent,
      },
    ]
    // children: [
    //   {
    //     path: 'dashboard',
    //     loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    //     canActivate: [authGuard],
    //     data: { roles: ['teacher', 'student'] }
    //   },
    //   {
    //     path: 'admin',
    //     loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    //     canActivate: [authGuard],
    //     data: { roles: ['admin'] }
    //   }
    // ]
  },
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: '**', redirectTo: 'info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }