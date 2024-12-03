import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
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
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LoginPagePage implements OnInit {
  profileForm!: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      userName: [''],
      password: [''],
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  async onSignIn() {
    this.loading = true;

    console.log('Form Submitted:', this.profileForm.value);

    await this.successAlert();

    // Clear the form inputs
    this.profileForm.reset();

    // Redirect to home
    this.router.navigate(['/home']);

    this.loading = false;
  }

  async successAlert() {
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Log-in successful!',
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    await successAlert.present();
    await successAlert.onDidDismiss();
  }

  goBack() {
    this.router.navigate(['/welcome-page']);
  }

  createAccount() {
    this.router.navigate(['/create-account']);
  }
}
