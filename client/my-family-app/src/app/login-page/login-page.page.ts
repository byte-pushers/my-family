import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {LoginService} from "../services/login-service";
import {GlobalErrorService} from "../services/global-error.service";
import {GlobalErrorHandler} from "../GlobalExceptionHandler/global-error-handler";
import {ApiError} from "../models/api-error";

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
  providers: [GlobalErrorService, GlobalErrorHandler],
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
export class LoginPagePage implements OnInit {
  username: string = '';
  password: string = '';
  passwordType: string = 'password';  // Default is hidden
  errorMessages: ApiError[] = [];

  constructor(private alertCtrl: AlertController, private loginService: LoginService, private globalError: GlobalErrorHandler,
              private globalErrorService: GlobalErrorService) {
  }

  ngOnInit() {
  }

  async onSignIn() {
    if (!this.username) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Username and password are required',
        // buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Note to self: The  login logic to call an API or perform authentication)
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    //call login service from backend to get data
    this.loginService.login(this.username, this.password)
      .subscribe(
        async (response) => {
          console.log('Response from API:', response);
          // Assuming a successful response means account creation was successful
          const successAlert = await this.alertCtrl.create({
            header: 'Success',
            message: 'Account created successfully!',
          });
          await successAlert.present();
        },
        async (error) => {
          console.error('Error occurred:', error.error);

          this.globalError.handleError(error.error);

          this.globalErrorService.getErrorMessages().subscribe(async (errors: ApiError[]) => {
            this.errorMessages = errors;
            console.log(this.errorMessages);
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: this.errorMessages.map(err => err.message).join(' --- '),
              buttons: ['OK'],
              cssClass: 'custom-alert',
            });
            await alert.present();
          });
        }
      );

  }
}

