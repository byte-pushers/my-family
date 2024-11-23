import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.page.html',
  styleUrls: ['./subscription-plan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SubscriptionPlanPage {
  username: string = 'User';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  async selectPlan(plan: 'free' | 'premium') {
    if (plan === 'free') {
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

      setTimeout(async () => {
        await this.router.navigate(['/home']);
      }, 1000);
    } else {
      await this.router.navigate(['/payment']);
    }
  }
}
