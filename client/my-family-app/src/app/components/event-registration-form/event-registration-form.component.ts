/**
 * @file event-registration-form.component.ts
 * @description This file contains the EventRegistrationFormComponent which handles the event registration process including personal info, agenda, merchandise, payment, and confirmation steps.
 * @version 1.0.0
 * @autor Danny Amezquita
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MerchandiseItemModel } from "../../models/merchandise-item.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-registration-form',
  templateUrl: './event-registration-form.component.html',
  styleUrls: ['./event-registration-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, NgOptimizedImage],
})
export class EventRegistrationFormComponent implements OnInit {
  /** The form group for the registration form */
  registrationForm: FormGroup;
  /** The current step in the registration process */
  currentStep = 0;
  /** Indicates whether the form has been submitted */
  isSubmitted = false;
  /** The steps in the registration process */
  steps = ['Personal Info', 'Agenda', 'Merchandise', 'Payment', 'Confirmation'];
  /** The range of ages from 0 to 100 */
  ageRange: number[] = [];
  /** The selected payment method */
  paymentMethod: 'card' | 'paypal' = 'card';

  /** The list of merchandise items available for purchase */
  merchandiseItems: MerchandiseItemModel[] = [
    new MerchandiseItemModel({
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
    this.ageRange = Array.from({ length: 101 }, (_, i) => i);
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Resets the form to its initial state.
   */
  ngOnInit(): void {
    this.resetForm();
  }

  /**
   * Selects the payment method.
   * @param {('card' | 'paypal')} method - The selected payment method.
   */
  selectPaymentMethod(method: 'card' | 'paypal'): void {
    this.paymentMethod = method;
  }

  /**
   * Calculates the total cost of the registration including merchandise.
   * @returns {number} The total cost.
   */
  calculateTotal(): number {
    let total = 0;
    const quantity = this.registrationForm.get('tshirtQuantity')?.value;
    if (quantity && this.merchandiseItems.length > 0) {
      total += this.merchandiseItems[0].price * quantity;
    }
    return total;
  }

  /**
   * Advances to the next step in the registration process.
   */
  nextStep(): void {
    console.log('Current step before:', this.currentStep);
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
    console.log('Current step after:', this.currentStep);
  }

  /**
   * Goes back to the previous step in the registration process.
   */
  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  /**
   * Submits the registration form.
   */
  onSubmit(): void {
    console.log('Form submitted:', this.registrationForm.value);
    this.isSubmitted = true;
    this.currentStep = 4;
  }

  /**
   * Navigates back to the home page.
   */
  returnHome() {
    this.router.navigate(['/home']);
  }

  /**
   * Resets the registration form to its initial state.
   */
  resetForm() {
    // Reset form data
    this.registrationForm.reset();
    // Reset step counter
    this.currentStep = 0;
    // Reset payment method
    this.paymentMethod = 'card';
  }
}
