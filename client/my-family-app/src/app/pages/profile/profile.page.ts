/**
 * @file profile.page.ts
 * @description This file contains the ProfilePage component which handles displaying and managing the user's profile.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ProfileData } from "../../models/profile-data";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { Router, RouterLink } from "@angular/router";
import { ProfileService } from '../../services/profile.service';
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FooterNavigationComponent, RouterLink]
})
export class ProfilePage implements OnInit, OnDestroy {
  /**
   * The profile data of the user.
   */
  profileData!: ProfileData;

  /**
   * Subject to handle the unsubscription of observables.
   */
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private profileService: ProfileService
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Fetches the profile data of the user.
   */
  ngOnInit() {
    this.profileService.getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.profileData = profile;
      });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Completes the destroy$ subject to unsubscribe from observables.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Navigates to the edit profile page.
   */
  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  /**
   * Handles the upload photo action.
   */
  uploadPhoto() {
    console.log('Upload photo clicked');
  }

  /**
   * Handles the share profile action.
   */
  shareProfile() {
    console.log('Share profile clicked');
  }

  /**
   * Logs the user out after confirming the action.
   */
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
