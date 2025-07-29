import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/common/token.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signinForm: FormGroup;
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(){
    // sessionStorage.clear();
    if(sessionStorage.getItem('auth_token')){
      this.authService.refreshAccessToken().subscribe({
        next: ()=>{},
        error: ()=>{}
      });
    }
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const val = this.signinForm.value;

      const reqBody = {
        email: val?.email,
        password: val?.password
      }

      this.signInUser(reqBody);
    } else {
      this.snackBar.open('Please enter email and password!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.signinForm.markAllAsTouched();
    }
  }

  signInUser(reqBody: any) {
    this.authService
      .loginUser(reqBody)
      .pipe(first())
      .subscribe({
        next: (res) => {

          if (res.msg == 'Login successful') {
            this.tokenService.authenticate(res);
            // sessionStorage.setItem('auth_token', JSON.stringify(res?.accessToken));
      
            this.snackBar.open(res.msg, 'Close', {
              duration: 3000, // in ms
              panelClass: ['success-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });

            if(res?.user?.userType === 'student') {
              this.router.navigate(['/user/dashboard'])
            }else if(res?.user?.userType === 'teacher') {
              this.router.navigate(['/user/dashboard'])
            }else if(res?.user?.userType === 'admin') {
              this.router.navigate(['/admin/dashboard'])
            }
          } else {
            this.snackBar.open(res.msg, 'Close', {
              duration: 3000, // in ms
              panelClass: ['warn-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        },
        error: (err) => {
          this.snackBar.open(err?.errors?.[0], 'Close', {
            duration: 3000, // in ms
            panelClass: ['error-snackbar'], // Optional custom style
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

        },
      });
  }


  goBack() {
    this.location.back();
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  updateErrorMessage() {
    const emailControl = this.signinForm.get('email');
    if (emailControl?.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (emailControl?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}

