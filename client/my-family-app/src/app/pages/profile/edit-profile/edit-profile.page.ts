/**
 * @file edit-profile.page.ts
 * @description This file contains the EditProfilePage component which handles editing and updating the user's profile.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterNavigationComponent } from '../../../components/shared/footer-navigation/footer-navigation.component';
import { ProfileService } from '../../../services/profile.service';
import { ProfileData } from "../../../models/profile-data";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FooterNavigationComponent, RouterLink]
})
export class EditProfilePage implements OnInit {
  /**
   * Form group for the profile form.
   */
  profileForm: FormGroup;

  /**
   * The selected image for the profile.
   */
  selectedImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      nickName: [''],
      dateOfBirth: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0)]],
      email: [''],
      phone: ['', [Validators.pattern('^\\(?([0-9]{3})\\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$')]],
      address: ['', [Validators.required]],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  /**
   * Lifecycle hook called after data-bound properties of a directive are initialized.
   * Populates the form with current profile data.
   */
  ngOnInit() {
    const currentProfile = this.profileService.getCurrentProfile();
    this.profileForm.patchValue({
      firstName: currentProfile.firstName,
      middleName: currentProfile.middleName,
      lastName: currentProfile.lastName,
      nickName: currentProfile.nickName,
      dateOfBirth: currentProfile.dateOfBirth,
      age: currentProfile.age,
      email: currentProfile.email,
      phone: currentProfile.phone,
      address: currentProfile.address
    });
  }

  /**
   * Handles the image upload event.
   * @param {any} event - The event object containing the uploaded file.
   */
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.profileService.updateProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Handles the form submission.
   */
  async onSubmit() {
    if (this.profileForm.valid) {
      try {
        const formValue = this.profileForm.value;
        const updatedProfile: Partial<ProfileData> = {};
        const currentProfile = this.profileService.getCurrentProfile();
        const keys = Object.keys(formValue) as Array<keyof ProfileData>;
        for (const key of keys) {
          if (formValue[key] !== undefined &&
            formValue[key] !== null &&
            formValue[key] !== '' &&
            formValue[key] !== currentProfile[key]) {
            updatedProfile[key] = formValue[key];
          }
        }
        if (Object.keys(updatedProfile).length > 0) {
          this.profileService.updateProfile(updatedProfile);
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Profile updated successfully',
            buttons: ['OK']
          });
          await alert.present();
        }
        this.router.navigate(['/profile']);
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'There was an error updating your profile',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      Object.keys(this.profileForm.controls).forEach(key => {
        const control = this.profileForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  /**
   * Handles the password update.
   */
  updatePassword() {
    const { currentPassword, newPassword, confirmPassword } = this.profileForm.value;
    if (newPassword !== confirmPassword) {
      return;
    }
    console.log('Password update:', { currentPassword, newPassword });
  }
}
