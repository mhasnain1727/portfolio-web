import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editMode = false;
  imagePreview: string = ''; // base64 string

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const data = JSON.parse(sessionStorage.getItem('auth_token') || '{}');
    const user = data?.claim;
    
    this.imagePreview = user.photo || 'assets/user-default.png';

    this.profileForm = this.fb.group({
      fullName: [user.name || '', Validators.required],
      email: [{ value: user.email || '', disabled: true }, [Validators.required, Validators.email]],
      phone: [user.phone || '', Validators.required],
      userType: [{ value: user.userType || '', disabled: true }, Validators.required],
      password: ['', [Validators.minLength(6)]],
      image: [user.image || '']
    });

    this.profileForm.disable();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.profileForm.enable();
      this.profileForm.get('email')?.disable();
      this.profileForm.get('userType')?.disable();
    } else {
      this.profileForm.disable();
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.profileForm.patchValue({ image: this.imagePreview });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.getRawValue();
      console.log('Updated profile:', updatedUser);

      this.editMode = false;
      this.profileForm.disable();

      const val = this.profileForm.value;

      let reqBody = {
        email: val?.email,
        fullName: val?.fullName,
        phone: val?.phone,
        photo: val?.image,
        password: val?.password ? val?.password : null
      }

      this.updateUser(reqBody);
    } else {
      this.snackBar.open('OOPs!... Someting went wrong', 'Close', {
        duration: 3000, // in ms
        panelClass: ['success-snackbar'], // Optional custom style
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  updateUser(reqBody: any) {
    this.authService
      .updateUser(reqBody)
      .pipe(first())
      .subscribe({
        next: (res) => {

          if (res.msg == 'Profile updated successfully') {
            this.snackBar.open(res.msg, 'Close', {
              duration: 3000, // in ms
              panelClass: ['success-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });

            sessionStorage.setItem('user', JSON.stringify(res?.user));

            // this.router.navigate(['user/profile']);
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
}
