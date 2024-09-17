import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; */ // will be used for api call later
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,DatePipe, ReactiveFormsModule]
})
export class CreateAccountPage implements OnInit {

  profileForm: FormGroup;
//   todayDate: DatePipe;
  submitted = false;  // Flag to check form submission state
  selectedImage: string | ArrayBuffer | null = null; // Stores the image URL for preview
  file: File | null = null; // The selected file, it is a type of javascript api and file here is object
//   private apiUrl = 'http://localhost:8080/api/create-account'; // Backend API URL
 constructor() {
   this.profileForm = new FormGroup({
     firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),  // firstName: required, minimum length of 4 characters
     lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),   // lastName: required, minimum length of 1 character
     email: new FormControl('', [Validators.required, Validators.email]),             // email: required, must be a valid email format
     address: new FormControl('', Validators.required),                               // address: required
     birthday: new FormControl(null, Validators.required),                            // birthday: required
     age: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(140)]),  // age: required, minimum value of 0, maximum value of 140

   });
 }


  // Method to handle form submission
  onSubmit() {
    this.submitted = true;  // Set the flag to true when form is submitted
    console.log(this.profileForm.getRawValue())
    if (this.profileForm.valid) {
      console.log(this.profileForm.value); // Process the form data
    } else {
      console.log('Form is invalid');
    }
  }

// Handle file input change
onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Ensure the selected file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Read the image for preview
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;  // Store the image URL for preview
    };
    reader.readAsDataURL(file);
  }
}/*
createAccount(accountData: any): Observable<any> {
    return this.http.post(this.apiUrl, accountData);
  } */
  ngOnInit() {}
}
