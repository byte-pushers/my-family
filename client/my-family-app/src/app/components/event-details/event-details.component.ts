/**
 * @file event-details.component.ts
 * @description This file contains the EventDetailsComponent which displays detailed information about an event.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class EventDetailsComponent implements OnInit {

  constructor() { }

  /**
   * Lifecycle hook called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {}

  /** The title of the event */
  @Input() eventTitle: string = '';
  /** The date of the event */
  @Input() eventDate: string = '';
  /** The time of the event */
  @Input() eventTime: string = '';
  /** The location of the event */
  @Input() eventLocation: string = '';
  /** The description of the event */
  @Input() eventDescription: string = '';
  /** The URL of the event image */
  @Input() eventImageUrl: string = '';
}
