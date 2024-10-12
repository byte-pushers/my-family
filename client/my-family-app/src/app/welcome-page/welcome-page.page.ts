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
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
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
    FormsModule
  ]
})
export class WelcomePagePage implements OnInit {
  username: string = '';
  password: string = '';
  passwordType: string = 'password';  // Default is hidden

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  async onSignIn() {
    if (!this.username ) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'This does not work yet sorry',
       // buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Note to self: The  login logic to call an API or perform authentication)
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Show a success alert or navigate to another page
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Login successful!',
      //buttons: ['OK'],
    });
    await successAlert.present();
  }
}
