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
  passwordType: string = 'password';  // Default is hidden
  passwordIcon: string = 'eye-off';   // Default icon for hidden password

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}



  async onSignIn() {
    if (!this.username || !this.password) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Username and password are required',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Proceed with login logic (e.g., call an API or perform authentication)
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Show a success alert or navigate to another page
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Login successful!',
      buttons: ['OK'],
    });
    await successAlert.present();
  }
}
