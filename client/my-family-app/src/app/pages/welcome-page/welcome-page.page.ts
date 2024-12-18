/**
 * @file welcome-page.page.ts
 * @description This file contains the WelcomePagePage component which provides navigation options to sign in or create an account.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    CommonModule,
    FormsModule,
  ],
})
export class WelcomePagePage {
  constructor(private router: Router) {}

  /**
   * Navigates to the sign-in page.
   */
  navigateToSignIn() {
    this.router.navigate(['/login-page']); // Navigate to the sign-in page
  }

  /**
   * Navigates to the create account page.
   */
  navigateToCreateAccount() {
    this.router.navigate(['/create-account']); // Navigate to the create account page
  }
}
