import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  aboutSubmenuOpen = false;

  constructor(  
  ){}

  ngOnInit(){}

  // Scroll to the section based on the section ID
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleAboutSubmenu(): void {
    this.aboutSubmenuOpen = !this.aboutSubmenuOpen;
  }
  

}
