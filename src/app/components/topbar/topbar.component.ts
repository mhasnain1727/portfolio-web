import { Component, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  userData: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    const data = JSON.parse(sessionStorage.getItem('auth_token')!);
    this.userData = data.claim;
  }

  goToProfile() {
    if (this.userData?.userType === 'student') {
      this.router.navigate(['/user/profile'])
    } else if (this.userData?.userType === 'teacher') {
      this.router.navigate(['/user/profile'])
    } else if (this.userData?.userType === 'admin') {
      this.router.navigate(['/admin/profile'])
    }
  }

  logout() {
    // Clear session
    sessionStorage.clear();
    localStorage.clear();
    this.authService.autoLogout()
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          if (res.msg == 'Logged out successfully') {
            this.router.navigate(['/signin']);
          } else {
            this.snackBar.open(res.msg, 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        },
        error: (err) => {
          this.snackBar.open(err.msg, 'Close', {
            duration: 3000,
            panelClass: ['warn-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      })
  }
}
