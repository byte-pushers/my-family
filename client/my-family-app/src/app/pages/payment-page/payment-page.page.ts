/**
 * @file payment-page.page.ts
 * @description This file contains the PaymentPage component which handles the subscription process and navigation.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-page.page.html',
  styleUrls: ['./payment-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PaymentPage {
  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  /**
   * Subscribes the user and shows a success toast message.
   * Navigates to the home page after the toast is presented.
   */
  async subscribe() {
    // Show success toast
    const toast = await this.toastController.create({
      message: '✨ Welcome to My Family Reunion!',
      duration: 2000,
      position: 'top',
      color: 'primary',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();

    // Navigate to home
    await this.router.navigate(['/home']);
  }
}
