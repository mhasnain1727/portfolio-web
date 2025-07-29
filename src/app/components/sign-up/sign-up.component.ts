
import { Component, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage = signal('');
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      userType: ['student', Validators.required],
      image: [null],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: this.passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['notMatching']) {
        // Return if another validator has already found an error on the confirmPassword
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ notMatching: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    };
  }

  // passwordMatchValidator(form: FormGroup) {
  //   return form.get('password')!.value === form.get('confirmPassword')!.value
  //     ? null : { mismatch: true };
  // }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.signupForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let val = this.signupForm.value;

      // const hashedPassword = bcrypt.hashSync(val?.password, 10);
      // const hashedConfirmPassword = bcrypt.hashSync(val?.confirmPassword, 10);

      const reqBody = {
        name: val?.fullName,
        phone: val?.phone,
        email: val?.email,
        photo: val?.image,
        userType: val?.userType,
        password: val?.password,
        confirmPassword: val?.confirmPassword
      }

      this.signupUser(reqBody);

    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  signupUser(reqBody: any) {
    this.authService
      .registerUser(reqBody)
      .pipe(first())
      .subscribe({
        next: (res) => {

          if (res.msg == 'User successfully registered') {
            this.snackBar.open(res.msg, 'Close', {
              duration: 3000, // in ms
              panelClass: ['success-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });

            this.router.navigate(['/signin']);
            // this.messageService.add({
            //   severity: 'success',
            //   summary: 'Success Message',
            //   detail: 'Details submitted successfully.',
            // });
          } else {
            this.snackBar.open(res.msg, 'Close', {
              duration: 3000, // in ms
              panelClass: ['warn-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            // this.messageService.add({
            //   severity: 'info',
            //   summary: 'Info Message',
            //   detail: res,
            // });
          }
        },
        error: (err) => {
          this.snackBar.open(err?.errors[0], 'Close', {
              duration: 3000, // in ms
              panelClass: ['error-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error Message',
          //   detail: err,
          // });

        },
      });
  }

  updateErrorMessage() {
    const emailControl = this.signupForm.get('email');
    if (emailControl?.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (emailControl?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }


}
