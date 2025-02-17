import { Component, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
import GLOBE from 'vanta/dist/vanta.globe.min';
import NET from 'vanta/dist/vanta.net.min';
import TOPOLOGY from 'vanta/dist/vanta.topology.min';
import FOG from 'vanta/dist/vanta.fog.min';
import DOTS from 'vanta/dist/vanta.dots.min';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  aboutSubmenuOpen = false;

  private vantaEffect: any;
  private vantaEffect1: any;
  public contactForm: FormGroup;
  public isMenuOpen = false;
  
  public isAboutMenuOpen = false;

  // projects = [
  //   { icon: 'assets/icons/portfolio.png', title: 'Project One', description: 'Description of Project One.' },
  //   { icon: 'assets/icons/project2.png', title: 'Project Two', description: 'Description of Project Two.' },
  //   { icon: 'assets/icons/project3.png', title: 'Project Three', description: 'Description of Project Three.' },
  //   { icon: 'assets/icons/project4.png', title: 'Project Four', description: 'Description of Project Four.' }
  // ];

  experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'People Tech Group Pvt. Ltd.',
      location: 'Hyderabad, Telangana, India',
      duration: 'Jan 2024 - Present',
      icon: 'code',
      responsibilities: [
        'Developed interactive UI with Angular and Material.',
        'Optimized website performance and improved loading speed.',
        'Collaborated with backend team for API integration.'
      ]
    },
    {
      title: 'Senior Software Engineer',
      company: 'Spotflock Technologies Pvt. Ltd.',
      location: 'Hyderabad, Telangana, India',
      duration: 'Oct 2022 - Jan 2024',
      icon: 'code',
      responsibilities: [
        'Managed source control repositories with Git including branching strategies and pull requests.',
        'Developed and maintained front-end web applications using HTML, CSS, JavaScript, Angular.',
        'Performed debugging and troubleshooting tasks across multiple browsers and devices.',
        'Provided technical support during post-deployment stages including bug fixing and maintenance tasks.',
        'Designed, developed and implemented Android and iOS applications with ionic.'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'Vinove Software & Services',
      location: 'Noida, Uttar Pradesh, India',
      duration: 'Jan 2022 - Sept 2022',
      icon: 'code',
      responsibilities: [
        'Integrated existing software into new or modified systems or operating environments.',
        'Optimized code for better performance, scalability, reliability, security and maintainability.',
        'Maintained version control repositories such as Git and GitHub which helped us track changes made in our source code over time.',
        'Designed and implemented various web-based applications for clients.',
      ]
    },
    {
      title: 'Science and Engineering Research Intern', 
      company: 'Science and Engineering Research Board (SERB)',
      location: ' IIT Bhilai, Chhattisgarh, India',
      duration: 'Aug 2021 - Oct 2021',
      icon: 'code',
      responsibilities: [
        'Worked as an Intern under the project “On Parameterized Complexity of Various Graph Coloring Problems”',
      ]
    }
  ];

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      alert('Message sent successfully!');
      this.contactForm.reset();
    }
  }

  ngAfterViewInit(): void {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // this.vantaEffect = WAVES({
    //   el: this.elementRef.nativeElement.querySelector('.projects-section'),
    //   mouseControls: false,
    //   touchControls: false,
    //   gyroControls: false,
    //   minHeight: 200.00,
    //   minWidth: 200.00,
    //   scale: 1.00,
    //   scaleMobile: 1.00,
    //   color: 0x2b2b2e,
    //   shininess: 0.00,
    //   waveHeight: 3.00,
    //   waveSpeed: 0.5,
    //   zoom: 0.35,
    //   THREE
    // });


    this.vantaEffect = NET({
      el: this.elementRef.nativeElement.querySelector('.home-section'),
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3fbeff,
      // color: 0xffffff,
      // backgroundColor: 0xffffff,
      backgroundColor: 0x3f51b5,
      // backgroundColor: 0x00008b,
      THREE
    });

    // this.vantaEffect1 = DOTS({
    //   el: this.elementRef.nativeElement.querySelector('.projects-section'),
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200.00,
    //   minWidth: 200.00,
    //   scale: 1.00,
    //   scaleMobile: 1.00,
    //   THREE
    // });

    this.vantaEffect1 = CLOUDS({
      el: this.elementRef.nativeElement.querySelector('.contact-section'),
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      skyColor: 0x111212,
      cloudColor: 0x1f2121,
      cloudShadowColor: 0x0,
      speed: 0.50,
      THREE
    });

    // this.vantaEffect = TOPOLOGY({
    //   el: this.elementRef.nativeElement.querySelector('.home-section'),
    //   mouseControls: false,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 100.00,
    //   minWidth: 100.00,
    //   scale: 1.00,
    //   scaleMobile: 1.00,
    //   color: 0x295fd4,
    //   backgroundColor: 0x31a1a,
    //   THREE,
    // });

    // this.vantaEffect = FOG({
    //   el: this.elementRef.nativeElement.querySelector('.home-section'),
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200.00,
    //   minWidth: 200.00,
    //   highlightColor: 0xffffff,
    //   midtoneColor: 0xa4d2ed,
    //   lowlightColor: 0xa68cf,
    //   baseColor: 0xffffff,
    //   blurFactor: 0.22,
    //   speed: 1.80,
    //   zoom: 1.40,
    //   THREE,
    // });

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
    if (this.vantaEffect1) {
      this.vantaEffect1.destroy();
    }
  }

  // Scroll to the section based on the section ID
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: 'smooth'
      });
    }
  }

  toggleAboutSubmenu(): void {
    this.aboutSubmenuOpen = !this.aboutSubmenuOpen;
  }

  onClickHome() {
    this.router.navigate(['/info']);
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

  openLinks(url: string): void {
    window.open(url);
  }

  onClickKnowMore(val: string) {
    this.snackBar.open('More information will be available soon!', 'Close', {
      duration: 5000,
    });
  }

  onClickResume(){
    this.snackBar.open('Resume will be available soon!', 'Close', {
      duration: 5000,
    });
  }

  toggleMenu() {
    this.isAboutMenuOpen = false;
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'auto'; // Restore scrolling when menu closes
    }
  }

  toggleAboutMenu() {
    this.isAboutMenuOpen = !this.isAboutMenuOpen;
  }
}

