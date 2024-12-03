import { Component, OnInit } from '@angular/core';
import { CommonModule,  DatePipe } from '@angular/common';
import {FormsModule, NgModel, ReactiveFormsModule, Validators, FormGroup, FormControl} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router, RouterModule} from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar,AlertController, } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, DatePipe, ReactiveFormsModule,RouterModule]
})
export class CreateAccountPage implements OnInit {
  birthdayInput = '';
  userAge = 0;
  profileForm: FormGroup;
  showPassword = false;
  loading = false;
  submitted = false;  // Flag to check form submission state
  selectedImage: string | ArrayBuffer | null = null; // Stores the image URL for preview
  file: File | null = null; // The selected file, it is a type of javascript api and file here is object

  constructor
    (
      public alertCtrl: AlertController,
      private router: Router,
    ) {

    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),  // firstName: required, minimum length of 4 characters
      lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),   // lastName: required, minimum length of 1 character
      email: new FormControl('', [Validators.required, Validators.email]),             // email: required, must be a valid email format
      address: new FormControl('', Validators.required),                               // address: required
      birthday: new FormControl(null, Validators.required),                            // birthday: required
      age: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(140)]),  // age: required, minimum value of 0, maximum value of 140
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

  calculateUserAge(event: Event){
    const userAge = event.target as HTMLInputElement;
    const currentDate = new Date();
    const birthDate = new Date(userAge.value);
    const differenceInMs = currentDate.getTime() - birthDate.getTime();
    const millisecondsInyear = 1000 * 3600 * 24 * 365.25;
    const ageInYears = Math.floor(differenceInMs / millisecondsInyear);
    console.log(ageInYears)
    this.userAge = ageInYears;

  }

  // Method to handle form submission
  async onSubmit() {
    this.submitted = true; // Set the flag to true when form is submitted
    this.loading = true;

    if (this.isValid()) {
      console.log(this.profileForm.value); // Process the form data

      // Show the success alert
      await this.successAlert();

      // Navigate to /payment-plan after success
      this.router.navigate(['/subscription-plan']);
    } else {
      console.log('Form is invalid');
      const firstInvalidControl = Object.keys(this.profileForm.controls).find(
        key => this.profileForm.controls[key].invalid
      );

      // Focus on the first invalid field, if found
      if (firstInvalidControl) {
        document.getElementById(firstInvalidControl)?.focus();
      }
    }

    this.loading = false;
  }

  clearInputMethod(){
    this.profileForm.reset()
    this.submitted = false;
  }

  async successAlert(){
    // Show a success alert or navigate to another page
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Your account has been created successfully!',
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    await successAlert.present();
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
  }

  ngOnInit() {}
}
