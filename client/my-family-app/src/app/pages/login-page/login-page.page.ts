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
  loading = false;
  showPassword = false;
  submitted = false;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)]],
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  async onSignIn() {
    this.submitted = true;
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.router.navigate(['/home']); // Navigate to home
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/welcome-page']); // Navigate to welcome page
  }

  createAccount() {
    this.router.navigate(['/create-account']); // Navigate to create account
  }
}

