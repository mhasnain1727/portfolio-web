import { Component } from '@angular/core';

@Component({
  selector: 'app-inner-page-layout',
  templateUrl: './inner-page-layout.component.html',
  styleUrls: ['./inner-page-layout.component.scss']
})
export class InnerPageLayoutComponent {

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  
}

