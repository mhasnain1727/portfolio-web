import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  aboutSubmenuOpen = false;

  constructor(  
    private router: Router
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
  
  onClickHome(){
    this.router.navigate(['/info']);
  }

}
