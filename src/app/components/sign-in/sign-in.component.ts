import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


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
    private authService: AuthService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
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
    console.log(reqBody)
    this.authService
      .loginUser(reqBody)
      .pipe(first())
      .subscribe({
        next: (res) => {

          if (res.msg == 'Login successful') {
            sessionStorage.setItem('user', res?.user);
            sessionStorage.setItem('token', res?.accessToken);
            this.snackBar.open(res.msg, 'Close', {
              duration: 3000, // in ms
              panelClass: ['success-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
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
          this.snackBar.open(err?.errors[0], 'Close', {
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

