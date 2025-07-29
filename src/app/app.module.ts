import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TokenService } from './services/common/token.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectDescriptionDialogComponent } from './components/home/project-description-dialog/project-description-dialog.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { JwtInterceptor } from './Interceptor/jwt.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MatListModule } from '@angular/material/list';
import { InnerPageLayoutComponent } from './components/inner-page-layout/inner-page-layout.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorInterceptor } from './Interceptor/error.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { ActiveSessionsComponent } from './components/active-sessions/active-sessions.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingPageComponent,
    ProjectDescriptionDialogComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    SidemenuComponent,
    TopbarComponent,
    InnerPageLayoutComponent,
    UnauthorizedComponent,
    ProfileComponent,
    UsersListComponent,
    ActiveSessionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatListModule ,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
