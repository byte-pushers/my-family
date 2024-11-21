// src/app/pages/events/events.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { FooterNavigationComponent } from "../../../components/shared/footer-navigation/footer-navigation.component";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
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

  getMyEvents() {
    return this.events.filter(event => event.type === 'my');
  }

  getAllEvents() {
    return this.events.filter(event => event.type === 'all');
  }

  navigateToCreateEvent() {
    this.router.navigate(['/create-event']);
  }

  shareEvent(event: Event) {
    console.log('Share event:', event);
  }

  editEvent(event: Event) {
    console.log('Edit event:', event);
  }
}
