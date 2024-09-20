import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.page.html',
  styleUrls: ['./login-account.page.scss'],
})
export class LoginAccountPage {

  constructor(private navCtrl: NavController) {}

  // Navigate to the Sign In page
  navigateToSignIn() {
    this.navCtrl.navigateForward('/sign-in');
  }

  // Navigate to the Create Account page
  navigateToCreateAccount() {
    this.navCtrl.navigateForward('/create-account');
  }
}
