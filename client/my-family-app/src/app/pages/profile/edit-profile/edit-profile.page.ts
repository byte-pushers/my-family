// src/app/pages/edit-profile/edit-profile.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { FooterNavigationComponent } from '../../../components/shared/footer-navigation/footer-navigation.component';
import { ProfileService } from '../../../services/profile.service';
import {ProfileData} from "../../../models/profile-data";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FooterNavigationComponent, RouterLink]
})
export class EditProfilePage implements OnInit {
  profileForm: FormGroup;
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

  ngOnInit() {
    // Populate form with current profile data
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

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        // Update the profile service with the new image
        this.profileService.updateProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      try {
        // Update only the changed fields
        const formValue = this.profileForm.value;
        const updatedProfile: Partial<ProfileData> = {};

        // Compare and only include changed values
        const currentProfile = this.profileService.getCurrentProfile();

        // Type-safe way to check for changes
        const keys = Object.keys(formValue) as Array<keyof ProfileData>;
        for (const key of keys) {
          if (formValue[key] !== undefined &&
            formValue[key] !== null &&
            formValue[key] !== '' &&
            formValue[key] !== currentProfile[key]) {
            updatedProfile[key] = formValue[key];
          }
        }

        // Update profile if there are changes
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

  updatePassword() {
    const { currentPassword, newPassword, confirmPassword } = this.profileForm.value;
    if (newPassword !== confirmPassword) {
      // Show error message
      return;
    }
    // Implement password update logic
    console.log('Password update:', { currentPassword, newPassword });
  }
}
