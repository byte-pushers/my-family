import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    FormsModule
  ]
})
export class LoginPagePage implements OnInit {
  profileForm!: FormGroup;
  username: string = '';
  password: string = '';
  loading = false;
  showPassword = false;
  submitted = false; // Flag to check form submission state

  constructor(
    public alertCtrl: AlertController,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),])
    });
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  isValid(): boolean{
    this.submitted = true;
    if (this.profileForm.invalid) {
      for (const control in this.profileForm.controls) {
        if (this.profileForm.controls.hasOwnProperty(control)) {
          this.profileForm.controls[control].markAsTouched();
        }
      }
      return false;
    }
    return true;
  }



  async onSignIn() {
    this.submitted = true;  // Set the flag to true when form is submitted
    this.loading = true;
    //console.log(this.profileForm.getRawValue())
    if (this.isValid()) {
      console.log(this.profileForm.value); // Process the form data
      await this.successAlert();
    } else {
      console.log('Form is invalid');
      const firstInvalidControl = Object.keys(this.profileForm.controls).find(key => this.profileForm.controls[key].invalid);
      // Focus on the first invalid field, if found
      if (firstInvalidControl) {
        document.getElementById(firstInvalidControl)?.focus();
      }
    }
    this.loading = false;
  }

  async successAlert(){
    // Show a success alert or navigate to another page
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Log-in successful!',
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    await successAlert.present();
    await successAlert.onDidDismiss();
    this.router.navigate(['/home']);
  }

  // Method to navigate back to the welcome page
  async goBack() {
    this.router.navigate(['/welcome-page']); // Adjust this to your welcome page route
  }
  async createAccount() {
    this.router.navigate(['/create-account']); // Adjust this to your welcome page route
  }
  ngOnInit() {}
}
