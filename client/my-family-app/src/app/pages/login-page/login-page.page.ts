import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';  // Import Router for navigation

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
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class LoginPagePage implements OnInit {
  username: string = '';
  password: string = '';
  submitted: boolean = false;

  passwordType: string = 'password';  // Default is hidden

  constructor(private alertCtrl: AlertController, private router: Router) {}  // Inject Router

  ngOnInit() {}

  async onSignIn() {
    // Ensure both username and password are provided
    this.submitted = true;
    if (!this.username || !this.password) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Username and password are required',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Minimal validation for demonstration
    if (this.password.length < 8) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Password must be at least 8 characters long.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Note to self: The login logic to call an API or perform authentication
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Show a success alert or navigate to another page
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Login successful!',
      buttons: ['OK'],
    });
    await successAlert.present();

    // Optional: Navigate to another page or reset form after alert dismissal
    await successAlert.onDidDismiss();
    // this.router.navigate(['/home']);  // Replace with your desired route after login
  }

  // Method to navigate back to the welcome page
  async goBack() {
    this.router.navigate(['/welcome-page']);  // Adjust this to your welcome page route
  }
}
