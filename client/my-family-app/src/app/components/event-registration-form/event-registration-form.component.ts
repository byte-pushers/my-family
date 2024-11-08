import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MerchandiseItemModel} from "../../models/merchandise-item.model";
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-registration-form',
  templateUrl: './event-registration-form.component.html',
  styleUrls: ['./event-registration-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, NgOptimizedImage],
})
export class EventRegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  currentStep = 0;
  isSubmitted = false;
  steps = ['Personal Info', 'Agenda', 'Merchandise', 'Payment', 'Confirmation'];
  ageRange: number[] = [];
  paymentMethod: 'card' | 'paypal' = 'card';

  merchandiseItems: MerchandiseItemModel[] = [
    new MerchandiseItemModel(    {
      id: 'tshirt-001',
      name: 'Event T-Shirt',
      description: 'Comfortable cotton t-shirt with event logo',
      price: 20.00,
      image: 'assets/img/tshirt.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      maxQuantity: 5,
      type: 'clothing',
      available: true,
      category: 'apparel'
    })
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      nickName: [''],
      birthday: [''],
      age: [''],
      email: [''],
      address: [''],
      lineage: [''],
      tshirtSize: [''],
      tshirtQuantity: [1],
      cardNumber: [''],
      cardExpiry: [''],
      paymentFirstName: [''],
      paymentLastName: [''],
      zipcode: [''],
      country: ['']
    });

    // Generate age range from 0 to 100
    this.ageRange = Array.from({length: 101}, (_, i) => i);
  }

  ngOnInit(): void {}

  selectPaymentMethod(method: 'card' | 'paypal'): void {
    this.paymentMethod = method;
  }

  calculateTotal(): number {
    let total = 0;
    const quantity = this.registrationForm.get('tshirtQuantity')?.value;
    if (quantity && this.merchandiseItems.length > 0) {
      total += this.merchandiseItems[0].price * quantity;
    }
    return total;
  }

  nextStep(): void {
    console.log('Current step before:', this.currentStep);
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
    console.log('Current step after:', this.currentStep);
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.registrationForm.value);
    this.isSubmitted = true;
    this.currentStep = 4;
  }

  returnHome() {
    this.router.navigate(['/home']);
  }
}
