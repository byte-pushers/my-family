import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {EventDetailsComponent} from "../../components/event-details/event-details.component";

@Component({
  selector: 'app-event-signup',
  templateUrl: './event-signup.page.html',
  styleUrls: ['./event-signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, EventDetailsComponent]
})
export class EventSignupPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  eventTitle = 'Quintanilla Family Reunion 2023';
  eventDate = 'Friday, Nov. 25';
  eventTime = '7:00pm - 9:00pm';
  eventLocation = 'Mount Magazine National Park';
  eventDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...';
  eventImageUrl = 'assets/img/family-1.jpg';

}
