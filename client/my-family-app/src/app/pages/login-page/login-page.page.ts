/**
 * @file login-page.page.ts
 * @description This file contains the LoginPagePage component, which provides login functionality, including form validation, user feedback, and navigation to other pages.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LoginPagePage implements OnInit {
  /** The reactive form for user input in the login page. */
  profileForm!: FormGroup;

  /** Indicates whether the application is in a loading state. */
  loading = false;

  /** Toggles the visibility of the password field. */
  showPassword = false;

  /** Tracks whether the form has been submitted. */
  submitted = false;

  /**
   * Constructor to inject necessary services.
   * @param router - The Angular Router for navigation.
   * @param fb - The FormBuilder for creating reactive forms.
   */
  constructor(private router: Router, private fb: FormBuilder) {}

  /**
   * Initializes the component and sets up the reactive form.
   */
  ngOnInit() {
    this.profileForm = this.fb.group({
      /** The username field, required with a minimum length of 4. */
      userName: ['', [Validators.required, Validators.minLength(4)]],

      /** The password field, required with a minimum length of 8 and pattern constraints. */
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
        ],
      ],
    });
  }

  /**
   * Toggles the visibility of the password input field.
   */
  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handles the sign-in action. Validates the form and navigates to the home page if successful.
   * Logs an error message if the form is invalid.
   */
  async onSignIn() {
    this.submitted = true;

    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.router.navigate(['/home']); // Navigate to the home page
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * Navigates back to the welcome page.
   */
  goBack() {
    this.router.navigate(['/welcome-page']); // Navigate to welcome page
  }

  /**
   * Navigates to the create account page.
   */
  createAccount() {
    this.router.navigate(['/create-account']); // Navigate to create account
  }
}
