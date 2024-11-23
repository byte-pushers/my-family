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

interface EventData {
  eventTitle?: 'Quintanilla Family Reunion 2023';
  eventDate?: 'Friday, Nov. 25';
  eventTime?: '7:00pm - 9:00pm';
  eventLocation?: 'Mount Magazine National Park';
  eventDescription?: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...';
  eventImageUrl?: 'assets/img/family-1.jpg';
}

@Component({
  selector: 'app-event-signup',
  templateUrl: './event-signup.page.html',
  styleUrls: ['./event-signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, EventDetailsComponent, FooterNavigationComponent, IonicModule, EventRegistrationFormComponent
  ]
})
export class EventSignupPage implements OnInit {
  @ViewChild(EventRegistrationFormComponent)
  registrationForm!: EventRegistrationFormComponent;

  eventData: EventData | null = null;
  constructor(private router: Router) {
  const navigation = this.router.getCurrentNavigation();
  this.eventData = navigation?.extras?.state?.['eventData'];
}

  // This runs when leaving the page
  ionViewWillLeave() {
    if (this.registrationForm) {
      this.registrationForm.resetForm();
    }
  }

  // This runs when entering the page
  ionViewWillEnter() {
    if (this.registrationForm) {
      this.registrationForm.resetForm();
    }
    const navigation = this.router.getCurrentNavigation();
    this.eventData = navigation?.extras?.state?.['eventData'];
  }

  ngOnInit() {
  }

  eventTitle = 'Quintanilla Family Reunion 2023';
  eventDate = 'Friday, Nov. 25';
  eventTime = '7:00pm - 9:00pm';
  eventLocation = 'Mount Magazine National Park';
  eventDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...';
  eventImageUrl = 'assets/img/family-1.jpg';

}
