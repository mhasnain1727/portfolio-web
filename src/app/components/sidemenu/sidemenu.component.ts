import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  @Input() collapsed = false;

  userData: any;
  
  ngOnInit(){
    const data = JSON.parse(sessionStorage.getItem('auth_token')!);
    this.userData = data.claim;
  }
}
