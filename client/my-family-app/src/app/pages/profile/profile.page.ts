import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfileData } from "../../models/profile-data";
import {FooterNavigationComponent} from "../../components/shared/footer-navigation/footer-navigation.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FooterNavigationComponent]
})
export class ProfilePage implements OnInit {
  profileData: ProfileData = {
    id: '1',
    firstName: 'Alejandro',
    lastName: 'Quintanilla',
    dateOfBirth: '03.10.1997',
    age: 25,
    address: '206 Myrtle Drive Pottsville, Ar',
    spouse: '',
    children: [''],
    parents: {
      mother: 'Alejandra Quintanilla',
      father: 'Daniel Quintanilla'
    },
    siblings: ['Fernando Quintanilla', 'Gabriela Quintanilla']
  };

  constructor() {}

  ngOnInit() {}

  onSearch(event: any) {
    console.log('Search query:', event.target.value);
  }

  editProfile() {
    console.log('Edit profile clicked');
  }

  uploadPhoto() {
    console.log('Upload photo clicked');
  }

  shareProfile() {
    console.log('Share profile clicked');
  }
}
