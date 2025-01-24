import { Component, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import GLOBE from 'vanta/dist/vanta.globe.min';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  private vantaEffect: any;

  constructor(
    private elementRef: ElementRef, 
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    // this.vantaEffect = NET({
    //   el: this.elementRef.nativeElement.querySelector('.vanta-container'),
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200.0,
    //   minWidth: 200.0,
    //   scale: 1.0,
    //   scaleMobile: 1.0,
    //   color: 0x3fbeff,
    //   // backgroundColor: 0xffffff,
    //   // backgroundColor: 0x3f51b5,
    //   THREE
    // });

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    this.vantaEffect = GLOBE({
      el: this.elementRef.nativeElement.querySelector('.vanta-container'), 
      mouseControls: false,
      touchControls: false,
      gyroControls: isMobile,
      minHeight: 100.0,
      minWidth: 100.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3fbeff, // blue color
      backgroundColor: 0x000000, // black color for better contrast
      points: 20.0, // increase the number of connecting points
      maxDistance: 5.0, // increase the maximum distance for connections
      spacing: 10.0, // decrease the spacing between points
      THREE,
    });
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }

  onClickViewJourney(): void {
    this.router.navigate(['/home']);
  }
}

