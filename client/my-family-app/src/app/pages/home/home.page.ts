/**
 * @file home.page.ts
 * @description This file contains the HomePage component which displays the home page with featured events and announcements.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnnouncementsComponent } from "../../components/announcements/announcements.component";
import { FeaturedEventComponent } from "../../components/featured-event/featured-event.component";
import { IonicModule } from "@ionic/angular";
import { Announcement } from "../../models/announcement.model";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { SearchBarComponent } from "../../components/shared/search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AnnouncementsComponent, FeaturedEventComponent, FooterNavigationComponent, SearchBarComponent]
})
export class HomePage implements OnInit {
  /**
   * The featured event to be displayed on the home page.
   */
  featuredEvent = {
    title: 'Quintanilla Family Reunion 2023', // Title of the featured event
    imageUrl: 'assets/img/family-1.jpg', // URL to the featured event image
    registrationOpen: true // Indicates if registration for the event is open
  };

  /**
   * List of upcoming announcements to be displayed on the home page.
   */
  upcomingAnnouncements: Announcement[] = [
    {
      title: 'Reunion at the beach', // Title of the announcement
      date: 'Friday, Nov. 25 7:00pm - 9:00pm', // Date and time of the announcement
      location: 'Morro Bay, California', // Location of the announcement
    },
    {
      title: 'Reunion at the mountain', // Title of the announcement
      date: 'Friday, May 11 4:00pm - 6:00pm', // Date and time of the announcement
      location: 'Mount Nebo, Arkansas', // Location of the announcement
    }
  ];

  constructor() {
    console.log('Announcements data:', this.upcomingAnnouncements); // Logs the announcement data to the console
  }

  /**
   * Lifecycle hook called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
  }
}
