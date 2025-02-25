/**
 * @file featured-event.component.ts
 * @description This file contains the FeaturedEventComponent which displays a featured event and handles registration navigation.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * Interface representing a featured event.
 */
interface FeaturedEvent {
  /** The title of the event */
  title: string;
  /** The URL of the event image */
  imageUrl: string;
  /** Indicates whether registration is open for the event */
  registrationOpen: boolean;
}

@Component({
  selector: 'app-featured-event',
  templateUrl: './featured-event.component.html',
  styleUrls: ['./featured-event.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FeaturedEventComponent {
  /** The featured event to display */
  @Input() event: FeaturedEvent = {
    title: 'Quintanilla Family Reunion 2023',
    imageUrl: 'assets/img/family-1.jpg',
    registrationOpen: true
  };

  constructor(private router: Router) {}

  /**
   * Navigates to the event signup page with the event data.
   */
  onRegister() {
    this.router.navigate(['/event-signup'], {
      state: { eventData: this.event }  // Pass event data if needed
    });
    console.log('Register clicked for:', this.event.title);
  }
}
