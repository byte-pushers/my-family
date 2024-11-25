import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; */ // will be used for api call later
import { DatePipe } from '@angular/common';
import { CreateAccountService } from "../../services/create-account.service";
import { CreateAccountRequestPayload } from "../../models/create-account-request.payload";
import { AccountInfoModel } from "../../models/account-info.model";
import { AddressModel } from "../../models/address.model"
import { PhoneNumberModel } from "../../models/phone-number.model";
import {create} from "ionicons/icons";
import {Router} from "@angular/router";
import { ToastController }  from "@ionic/angular";

/**
 * Component for handling the Create Account page.
 * Allows users to fill out a form with personal details, upload a profile image, and validate their inputs.
 */
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, DatePipe, ReactiveFormsModule, RouterModule],
})
export class CreateAccountPage implements OnInit {
  /** User's input for birthday as a string. */
  birthdayInput = '';

  /** Calculated user's age based on the birthday input. */
  userAge = 0;

  /** Reactive form for profile creation. */
  profileForm: FormGroup;

  /** Controls the visibility of the password input field. */
  showPassword = false;

  /** Indicates if the form submission is in progress. */
  loading = false;

  /** Indicates whether the form has been submitted. */
  submitted = false;

  /** Stores the selected image for profile preview. */
  selectedImage: string | ArrayBuffer | null = null;

  /** Stores the selected file object. */
  file: File | null = null;

  /**
   * Constructor to initialize the Create Account page.
   *
   * @param alertCtrl - Service for displaying alerts.
   * @param router - Router service for navigation.
   */
  constructor(
    public alertCtrl: AlertController,
    private router: Router
  ) {
    // Initialize the form group with default values and validators.
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      birthday: new FormControl(null, Validators.required),
      age: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(140)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
      ]),
    });
  }

  /**
   * Toggles the visibility of the password field.
   */
  toggleShow(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Validates the form and marks controls as touched if invalid.
   *
   * @returns `true` if the form is valid, otherwise `false`.
   */
  isValid(): boolean {
    this.submitted = true;
    if (this.profileForm.invalid) {
      for (const control in this.profileForm.controls) {
        if (this.profileForm.controls.hasOwnProperty(control)) {
          this.profileForm.controls[control].markAsTouched();
        }
      }
      return false;
    }
    return true;
  }

  /**
   * Calculates the user's age based on the provided birthday input.
   *
   * @param event - The input event containing the user's birthday.
   */
  calculateUserAge(event: Event): void {
    const userAgeInput = event.target as HTMLInputElement;
    const currentDate = new Date();
    const birthDate = new Date(userAgeInput.value);
    const differenceInMs = currentDate.getTime() - birthDate.getTime();
    const millisecondsInYear = 1000 * 3600 * 24 * 365.25;
    const ageInYears = Math.floor(differenceInMs / millisecondsInYear);
    console.log(ageInYears);
    this.userAge = ageInYears;
  }

  // Method to handle form submission
  onSubmit() {
    // Comment out validation and API logic for now
    /*
    this.submitted = true;
    console.log(this.profileForm.getRawValue())
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);

      const address = new AddressModel(
        this.profileForm.get("address")?.value,
        "AddressLine2",
        "City",
        "State",
        "Zipcode"
      );

      const phoneNumber = new PhoneNumberModel(
        "Type",
        "CountryCode",
        "AreaCode",
        "SubscriberNumber"
      );

      const accountInfo: AccountInfo = new AccountInfoModel(
        this.profileForm.get("firstName")?.value,
        "middleNamePlaceholder",
        this.profileForm.get("lastName")?.value,
        this.profileForm.get("email")?.value,
        "passwordPlaceholder",
        phoneNumber,
        address
      );

      const createAccountRequestPayload = new CreateAccountRequestPayload(accountInfo);

      this.createAccountService.createAccount(createAccountRequestPayload).subscribe(async response => {
        console.log(`Account created successfully with Transaction id: ${createAccountRequestPayload.getTransactionID()}`, response);
    */

    // Just show success toast and navigate
    this.toastCtrl.create({
      message: 'Account Successfully Created!',
      duration: 2000,
      position: 'top',
      color: 'success'
    }).then(toast => toast.present());

    // Navigate to subscription plan page
    this.router.navigate(['/subscription-plan']);

    /*
      },
        async error => {
          console.error('Account creation failed:', error);
          const toast = await this.toastCtrl.create({
            message: 'Account creation failed. Please try again.',
            duration: 2000,
            position: 'top',
            color: 'danger'
          });
          await toast.present();

      })
    } else {
      console.log('Form is invalid');
      const firstInvalidControl = Object.keys(this.profileForm.controls).find(
        (key) => this.profileForm.controls[key].invalid
      );

      // Focus on the first invalid field, if found
      if (firstInvalidControl) {
        document.getElementById(firstInvalidControl)?.focus();
      }
    }

    this.loading = false;
  }

  /**
   * Clears the form inputs and resets the state.
   */
  clearInputMethod(): void {
    this.profileForm.reset();
    this.submitted = false;
  }

  /**
   * Displays a success alert upon successful form submission.
   */
  async successAlert(): Promise<void> {
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Your account has been created successfully!',
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    await successAlert.present();
  }

  /**
   * Handles the file input change event to upload and preview the selected image.
   *
   * @param event - The file input change event.
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Ensure the selected file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Read the image for preview
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Store the image URL for preview
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}
}
