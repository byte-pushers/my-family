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
import { RouterModule } from '@angular/router';  // <-- Import RouterModule for routing

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
    FormsModule,
    RouterModule  // <-- Add RouterModule to imports array
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
      return;
    }
  }
}
