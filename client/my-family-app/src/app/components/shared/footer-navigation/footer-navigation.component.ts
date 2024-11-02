import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  styleUrls: ['./footer-navigation.component.scss'],
  imports: [
    IonicModule,
    RouterLink
  ],
  standalone: true
})
export class FooterNavigationComponent  implements OnInit {
  selectedTab: string = 'home'; // Default selected tab

  selectTab(tabName: string) {
    this.selectedTab = tabName;
    // You can add additional logic here when tabs are selected
    console.log('Selected tab:', tabName);
  }

  constructor() { }

  ngOnInit() {}

}
