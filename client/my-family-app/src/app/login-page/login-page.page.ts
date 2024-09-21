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
  AlertController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [
    //ionic components
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,//Contains the title and other controls.
    IonItem,
    IonLabel, //Provides a label for the input fields (e.g., "Username" and "Password").
    IonInput,
    IonButton,//Represents the "Sign In" button.
    CommonModule,
    FormsModule
  ]
})
export class LoginPagePage implements OnInit {
  username: string = '';
  password: string = '';
  passwordType: string = 'password';  // Default is hidden


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
