import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  displayedColumns: string[] = ['name', 'userType', 'email', 'phone', 'ipaddress', 'createdAt', 'updatedAt'];
  dataSource = new MatTableDataSource<any>([]);
  searchKey = '';
  // reqPayload: any = {};
  selectedUserType: string = 'all';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const data = JSON.parse(sessionStorage.getItem('auth_token')!);
    // this.reqPayload = {
    //   email: data?.claim?.email
    // }
    this.getRegisteredUsers(this.selectedUserType);
  }

  getRegisteredUsers(userType: string) {
    this.authService
      .getUsersByType(userType)
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res?.users?.length > 0) {
            this.dataSource.data = res?.users;
          } else {
            this.dataSource.data = [];
            this.snackBar.open('No Such User Registered', 'Close', {
              duration: 3000, // in ms
              panelClass: ['warn-snackbar'], // Optional custom style
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
          this.dataSource.paginator = this.paginator;
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

  clearFilter() {
    this.searchKey = '';
    this.applyFilter();
  }

  onUserTypeChange(){
    console.log('Selected User Type:', this.selectedUserType);
    this.getRegisteredUsers(this.selectedUserType);
  }
}
