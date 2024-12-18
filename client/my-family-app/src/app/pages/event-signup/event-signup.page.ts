/**
 * @file event-signup.page.ts
 * @description This file contains the EventSignupPage component which handles the event signup process.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EventDetailsComponent} from "../../components/event-details/event-details.component";
import {FooterNavigationComponent} from "../../components/shared/footer-navigation/footer-navigation.component";
import {IonicModule} from "@ionic/angular";
import {
  EventRegistrationFormComponent
} from "../../components/event-registration-form/event-registration-form.component";
import { Router } from "@angular/router";

/**
 * Interface representing event data.
 */
interface EventData {
  eventTitle?: 'Quintanilla Family Reunion 2023'; // Title of the event
  eventDate?: 'Friday, Nov. 25'; // Date of the event
  eventTime?: '7:00pm - 9:00pm'; // Time of the event
  eventLocation?: 'Mount Magazine National Park'; // Location of the event
  eventDescription?: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'; // Description of the event
  eventImageUrl?: 'assets/img/family-1.jpg'; // URL to the event image
}

@Component({
  selector: 'app-event-signup',
  templateUrl: './event-signup.page.html',
  styleUrls: ['./event-signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, EventDetailsComponent, FooterNavigationComponent, IonicModule, EventRegistrationFormComponent]
})
export class EventSignupPage implements OnInit {
  @ViewChild(EventRegistrationFormComponent)
  registrationForm!: EventRegistrationFormComponent; // Reference to the event registration form component

  eventData: EventData | null = null; // Event data object

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.eventData = navigation?.extras?.state?.['eventData']; // Retrieve event data from navigation state
  }

  /**
   * Lifecycle hook that runs when leaving the page.
   * Resets the registration form.
   */
  ionViewWillLeave() {
    if (this.registrationForm) {
      this.registrationForm.resetForm();
    }
  }

  /**
   * Lifecycle hook that runs when entering the page.
   * Resets the registration form and retrieves event data from navigation state.
   */
  ionViewWillEnter() {
    if (this.registrationForm) {
      this.registrationForm.resetForm();
    }
    const navigation = this.router.getCurrentNavigation();
    this.eventData = navigation?.extras?.state?.['eventData'];
  }

  ngOnInit() {
  }

  eventTitle = 'Quintanilla Family Reunion 2023'; // Default event title
  eventDate = 'Friday, Nov. 25'; // Default event date
  eventTime = '7:00pm - 9:00pm'; // Default event time
  eventLocation = 'Mount Magazine National Park'; // Default event location
  eventDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'; // Default event description
  eventImageUrl = 'assets/img/family-1.jpg'; // Default event image URL
}
