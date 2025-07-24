import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-description-dialog',
  templateUrl: './project-description-dialog.component.html',
  styleUrls: ['./project-description-dialog.component.scss']
})
export class ProjectDescriptionDialogComponent {

  title: any = null;
  description: any = null;

  constructor(
    public dialogRef: MatDialogRef<ProjectDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecting the data
  ) {}

  ngOnInit(){
    if(this.data.code == 'p1'){
      this.title = 'MICADA Haryana Website';
      this.description = `
        • Spearheaded the front-end development efforts for the MICADA Haryana Website, a pivotal government project designed to empower Haryana farmers by providing access to various benefits and resources.<br>
        • Utilized Angular to architect and implement a highly responsive and user-friendly interface, ensuring seamless access to critical agricultural information.<br>
        • Successfully integrated advanced functionalities, including<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o Geo-fencing and Live Location Tracking: Implemented geolocation services to enable JE and XEN to perform valid and realtime inspection on field.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o Camera Access Functionality: Developed a feature that allowed users to capture and upload images directly from their devices, facilitating efficient documentation and reporting from field.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o Multi-level User Authentication: Designed and implemented a robust authentication system with varying access levels to cater to different stakeholders, such as farmers, government officials, and vendors.<br><br>
        • Contributed to the overall growth of the website's user base and engagement through effective front-end developmentstrategies.<br>
        • Conducted thorough testing and debugging to optimize website performance and resolve any issues.`;
    }else if(this.data.code == 'p2'){
      this.title = 'DLF Golf Tee Time Website | Android App | iOS App';
      this.description = `
        • Contributed to the development of the DLF Golf Course Website.<br>
        • Played a pivotal role in the development of the DLF Golf Course Website's mobile app for both Android and iOS platforms using ionic and capacitor.<br>
        • Led the design and implementation of the mobile app, focusing on delivering an exceptional user experience for golf enthusiasts and members of the DLF Golf Course.<br>
        • Designed and developed a feature for users to book tee slots efficiently, streamlining the booking process for golfers.<br>
        • Implemented functionality to manage various conditions related to the golf course, ensuring a seamless and enjoyable golfing experience`;
    }else if(this.data.code == 'p3'){
      this.title = 'Pittsburg Public Safety Supply Website';
      this.description = `
        • Front-end development efforts for the Pittsburgh Public Safety Supply Website, a platform specializing in providing goods. It is one of the largest public safety equipment and uniform suppliers’ platform.<br>
        • Developed and maintained the user interface using Angular and Ionic, ensuring an intuitive and responsive design.<br>
        • Implemented various user-centric features and functionalities to enhance the user experience.<br>
        • Collaborated closely with the design and back-end development teams to ensure seamless integration of front-end components.`;
    }else if(this.data.code == 'p4'){
      this.title = 'Bharat Survey Website | Android App';
      this.description = `
        • Led the design and development of the Survey Application Website as well as android app focusing on the front-end aspects using angular and ionic.<br>
        • Led the development of a comprehensive survey application to facilitate data collection and analysis on behalf of the Haryana Electricity Regulatory Commission (HERC), a government agency.<br>
        • Implemented user authentication, registration, and role-based access control.<br>
        • Designed interactive dashboards for survey creators to monitor and analyze data.<br>
        • Integrated geofencing functionality to restrict surveys to specific geographic regions`;
    }else if(this.data.code == 'p5'){
      this.title = 'Personal project using Angular';
      this.description = `
        • Developed many projects like Alumni Management System, small games app, Notebook app etc.<br> 
        • Also worked on live project of ecommerce website and also on admin portal of that website.`;
    }else if(this.data.code == 'p6'){
      this.title = 'SQL : Data Cleaning using SQL & COVID Data Exploration using SQL';
      this.description = `
        • Took data from Max Roser, Hannah Ritchie, Esteban Ortiz-Ospina and Joe Hasell (2020) - "Coronavirus Pandemic (COVID-19)". <br> 
        • Published online at OurWorldInData.org and performed some data exploration on it. <br> 
        • Used CTEs, Temp Tables, Joins, Views among other SQL functions. <br> 
        • Wrote the actual script in SQL and created the visualizations in Tableau.`;
    }else if(this.data.code == 'p7'){
      this.title = 'JNMC Hospital Cum Trauma Center Website';
      this.description = `
        • Developed a website for Jawaharlal Medical College Hospital AMU. <br>
        • Develop as website to register a user for OPD. <br>
        • Also user can register for trauma center in case of emergency situation to reduce the registration time once patience reached the hospital. <br>
        • This all about is also a part of dissertation and minor and major project of my graduation exam.<br>`
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
