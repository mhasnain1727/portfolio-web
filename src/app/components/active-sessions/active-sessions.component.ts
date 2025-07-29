import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-active-sessions',
  templateUrl: './active-sessions.component.html',
  styleUrls: ['./active-sessions.component.scss']
})
export class ActiveSessionsComponent {

  displayedColumns: string[] = ['ipAddress', 'device', 'createdAt', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  searchKey = '';
  reqPayload: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const data = JSON.parse(sessionStorage.getItem('auth_token')!);
    this.reqPayload = {
      email: data?.claim?.email
    }
    this.getAllActiveSessions();
    this.getAllStudentUsers();
  }

  getAllActiveSessions() {
    this.authService
      .allActiveSessions(this.reqPayload)
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res.msg == "Success" && res.sessions.length > 0) {
            this.dataSource.data = res.sessions;
            this.dataSource.paginator = this.paginator;
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

  getAllStudentUsers() {
    this.authService
      .getUsersByType('student')
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res?.users?.length > 0) {
            console.log(res?.users);
            // this.dataSource.data = res.sessions;
            // this.dataSource.paginator = this.paginator;
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

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }



  clearFilter() {
    this.searchKey = '';
    this.applyFilter();
  }

  logoutSession(sessionIndex: number) {
    this.authService.revokeSession(sessionIndex)
      .pipe(first())
      .subscribe({
        next: (val: any) => {
          if (val.msg == "Session revoked") {
            this.snackBar.open(val.msg, 'Close', {
              duration: 3000, // in ms
              panelClass: ['success-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else {
            this.snackBar.open(val.msg, 'Close', {
              duration: 3000, // in ms
              panelClass: ['warn-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
          this.getAllActiveSessions(); // reload after logout
        },
        error: (err: any) => {
          this.snackBar.open(err?.errors?.[0], 'Close', {
            duration: 3000, // in ms
            panelClass: ['error-snackbar'], // Optional custom style
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
  }
}
