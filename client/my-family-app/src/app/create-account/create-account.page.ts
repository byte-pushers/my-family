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
import { CreateAccountService } from "../services/create-account.service";
import { CreateAccountRequestPayload } from "../models/create-account-request.payload";
import { AccountInfo } from "../models/account-info";
import { Address } from "../models/address"
import { PhoneNumber } from "../models/phone-number";
import {create} from "ionicons/icons";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,DatePipe, ReactiveFormsModule],
  providers:  [CreateAccountService]
})
export class CreateAccountPage implements OnInit {

  profileForm: FormGroup;
//   todayDate: DatePipe;
  submitted = false;  // Flag to check form submission state
  selectedImage: string | ArrayBuffer | null = null; // Stores the image URL for preview
  file: File | null = null; // The selected file, it is a type of javascript api and file here is object
//   private apiUrl = 'http://localhost:8080/api/create-account'; // Backend API URL
  constructor(private createAccountService: CreateAccountService) {
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

      const address = new Address(
        this.profileForm.get("address")?.value,
        "AddressLine2",
        "City",
        "State",
        "Zipcode"
      );

      const phoneNumber = new PhoneNumber(
        "Type",
        "CountryCode",
        "AreaCode",
        "SubscriberNumber"
      );

      const accountInfo = new AccountInfo(
        this.profileForm.get("firstName")?.value,
        "middleNamePlaceholder",
        this.profileForm.get("lastName")?.value,
        this.profileForm.get("email")?.value,
        "passwordPlaceholder",
        phoneNumber,
        address
      );

      const createAccountRequestPayload = new CreateAccountRequestPayload(accountInfo);

      this.createAccountService.createAccount(createAccountRequestPayload).subscribe(response => {
        console.log(`Account created successfully with Transaction id: ${createAccountRequestPayload.getTransactionID()}`, response);
      })
    } else {
      console.log('Account creation failed. Try Again.');
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
