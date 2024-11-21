// src/app/pages/profile/profile.page.ts
import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ProfileData } from "../../models/profile-data";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { Router, RouterLink } from "@angular/router";
import { ProfileService } from '../../services/profile.service';
import {Subject} from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FooterNavigationComponent, RouterLink]
})
export class ProfilePage implements OnInit, OnDestroy {
  profileData!: ProfileData;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.profileData = profile;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  uploadPhoto() {
    console.log('Upload photo clicked');
  }

  shareProfile() {
    console.log('Share profile clicked');
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.router.navigate(['/welcome-page']);
          }
        }
      ]
    });

    await alert.present();
  }
}
