import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  @Input() collapsed = false;

  userData: any;
  sidebarMenu: any[] = [];

  ngOnInit() {
    const data = JSON.parse(sessionStorage.getItem('auth_token')!);
    this.userData = data.claim;

    this.setupSidebar(this.userData?.userType);
  }

  setupSidebar(userType: string): void {
    if (userType === 'student') {
      this.sidebarMenu = [
        {
          heading: 'Student Panel',
          links: [
            { label: 'Dashboard', path: '/user/dashboard' },
            { label: 'Profile', path: '/user/profile' },
            { label: 'Active Sessions', path: '/user/active-sessions' },
            { label: 'My Courses' }
          ]
        }
      ];
    } else if (userType === 'teacher') {
      this.sidebarMenu = [
        {
          heading: 'Teacher Panel',
          links: [
            { label: 'Dashboard', path: '/user/dashboard' },
            { label: 'Profile', path: '/user/profile' },
            { label: 'Active Sessions', path: '/user/active-sessions' },
            { label: 'Assignments', path: '/user/assignments' }
          ]
        }
      ];
    }else if (userType === 'admin') {
      this.sidebarMenu = [
        {
          heading: 'Admin Panel',
          links: [
            { label: 'Dashboard', path: '/admin/dashboard' },
            { label: 'Profile', path: '/admin/profile' },
            { label: 'Active Sessions', path: '/admin/active-sessions' },
            { label: 'Registered Users', path: '/admin/users' }
          ]
        }
      ];
    } else {
      this.sidebarMenu = [
        {
          heading: 'General',
          links: [
            { label: 'Home', path: '/user/dashboard' },
            { label: 'Contact', path: '/user/contact' }
          ]
        }
      ];
    }
  }
}
