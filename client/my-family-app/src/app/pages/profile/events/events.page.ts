/**
 * @file events.page.ts
 * @description This file contains the EventsPage component which handles displaying and managing events.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { FooterNavigationComponent } from "../../../components/shared/footer-navigation/footer-navigation.component";

/**
 * Interface representing an event.
 */
interface Event {
  /**
   * The title of the event.
   */
  title: string;

  /**
   * The date of the event.
   */
  date: string;

  /**
   * The time of the event.
   */
  time: string;

  /**
   * The location of the event.
   */
  location: string;

  /**
   * The type of the event, either 'my' or 'all'.
   */
  type: 'my' | 'all';
}

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FooterNavigationComponent]
})
export class EventsPage {
  /**
   * Array of events.
   */
  events: Event[] = [
    {
      title: 'Reunion at the beach',
      date: 'Friday, Nov. 25',
      time: '7:00pm - 9:00pm',
      location: 'Morro Bay, California',
      type: 'my'
    },
    {
      title: 'Reunion at the mountain',
      date: 'Friday, May 11',
      time: '4:00pm - 6:00pm',
      location: 'Mount Nebo, Arkansas',
      type: 'my'
    },
    {
      title: 'Baby Shower',
      date: 'Friday, May 11',
      time: '4:00pm - 6:00pm',
      location: 'Mount Nebo, Arkansas',
      type: 'my'
    },
    {
      title: 'Reunion at ATT Tower',
      date: 'Friday, Nov. 25',
      time: '7:00pm - 9:00pm',
      location: 'Downtown Dallas, Texas',
      type: 'all'
    },
    {
      title: "Abby's Graduation",
      date: 'Tuesday, Feb. 7',
      time: '3:00pm-5:00pm',
      location: 'Dallas Central University',
      type: 'all'
    }
  ];

  constructor(private router: Router) {}

  /**
   * Gets the events of type 'my'.
   * @returns {Event[]} The list of 'my' events.
   */
  getMyEvents() {
    return this.events.filter(event => event.type === 'my');
  }

  /**
   * Gets the events of type 'all'.
   * @returns {Event[]} The list of 'all' events.
   */
  getAllEvents() {
    return this.events.filter(event => event.type === 'all');
  }

  /**
   * Navigates to the create event page.
   */
  navigateToCreateEvent() {
    this.router.navigate(['/create-event']);
  }

  /**
   * Shares the specified event.
   * @param {Event} event - The event to share.
   */
  shareEvent(event: Event) {
    console.log('Share event:', event);
  }

  /**
   * Edits the specified event.
   * @param {Event} event - The event to edit.
   */
  editEvent(event: Event) {
    console.log('Edit event:', event);
  }
}
