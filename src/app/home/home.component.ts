import { Component, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
import GLOBE from 'vanta/dist/vanta.globe.min';
import NET from 'vanta/dist/vanta.net.min';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  aboutSubmenuOpen = false;

  private vantaEffect: any;

  constructor(
    private elementRef: ElementRef,
    private router: Router
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // this.vantaEffect = WAVES({
    //   el: this.elementRef.nativeElement.querySelector('.home-section'),
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 100.0,
    //   minWidth: 100.0,
    //   scale: 1.0,
    //   scaleMobile: 1.0,
    //   shininess: 29.0,
    //   waveHeight: 12.5,
    //   waveSpeed: 0.55,
    //   zoom: 0.76,
    //   color: 0x3fbeff,
    //   backgroundColor: 0x000000,
    //   THREE
    // });


    this.vantaEffect = NET({
      el: this.elementRef.nativeElement.querySelector('.home-section'),
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3fbeff,
      // backgroundColor: 0xffffff,
      // backgroundColor: 0x3f51b5,
      THREE
    });



    // this.vantaEffect = GLOBE({
    //   el: this.elementRef.nativeElement.querySelector('.home-section'), 
    //   mouseControls: false,
    //   touchControls: false,
    //   gyroControls: isMobile,
    //   minHeight: 100.0,
    //   minWidth: 100.0,
    //   scale: 1.0,
    //   scaleMobile: 1.0,
    //   color: 0x3fbeff, // blue color
    //   backgroundColor: 0x000000, // black color for better contrast
    //   points: 20.0, // increase the number of connecting points
    //   maxDistance: 5.0, // increase the maximum distance for connections
    //   spacing: 10.0, // decrease the spacing between points
    //   size: 0.8,
    //   THREE,
    // });
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }

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

  onClickHome() {
    this.router.navigate(['/info']);
  }

}
