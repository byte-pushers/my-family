/**
 * @file announcements.component.ts
 * @description This file contains the AnnouncementsComponent
 * which displays a list of announcements and handles RSVP navigation.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from "../../models/announcement.model";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AnnouncementsComponent implements OnInit {
  /** Array of announcements to display */
  @Input() announcements: Announcement[] = [];

  constructor(private router: Router) { }

  /**
   * Handles the RSVP action for an announcement.
   * Navigates to the event signup page with the announcement data.
   * @param {Announcement} announcement - The announcement for which to RSVP.
   */
  handleRSVP(announcement: Announcement) {
    this.router.navigate(['/event-signup'], {
      state: { eventData: announcement }
    });
    console.log('RSVP for:', announcement.title);
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Logs the received announcements.
   */
  ngOnInit() {
    console.log('Received announcements:', this.announcements);
  }
}
