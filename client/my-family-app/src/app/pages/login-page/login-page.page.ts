import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileForm!: FormGroup; // The form group for handling form controls
  submitted = false; // Tracks whether the form has been submitted
  showPassword = false; // Toggles password visibility

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Initialize the form with validation rules
    this.profileForm = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(4) // Minimum length of 4 characters for username
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Minimum length of 8 characters for password
          Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).*$/) // At least 1 uppercase, number, and special character
        ]
      ]
    });
  }

  // Toggles the visibility of the password field
  toggleShow(): void {
    this.showPassword = !this.showPassword;
  }

  // Handles form submission
  onSubmit(): void {
    this.submitted = true; // Mark the form as submitted

    if (this.profileForm.invalid) {
      // If the form is invalid, stop further processing
      return;
    }

    // Perform the login or sign-in logic
    console.log('Form submitted successfully:', this.profileForm.value);
  }
  // Method to navigate back to the welcome page
  async goBack() {
    this.router.navigate(['/welcome-page']);  // Adjust this to your welcome page route
  }
}
