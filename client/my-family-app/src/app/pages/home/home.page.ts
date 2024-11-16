import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AnnouncementsComponent} from "../../components/announcements/announcements.component";
import {FeaturedEventComponent} from "../../components/featured-event/featured-event.component";
import {IonicModule} from "@ionic/angular";
import {Announcement} from "../../models/announcement.model";
import {FooterNavigationComponent} from "../../components/shared/footer-navigation/footer-navigation.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AnnouncementsComponent, FeaturedEventComponent, FooterNavigationComponent]
})
export class HomePage implements OnInit {
  featuredEvent = {
    title: 'Quintanilla Family Reunion 2023',
    imageUrl: 'assets/img/family-1.jpg',
    registrationOpen: true
  };

  upcomingAnnouncements: Announcement[] = [
    {
      title: 'Reunion at the beach',
      date: 'Friday, Nov. 25 7:00pm - 9:00pm',
      location: 'Morro Bay, California',
    },
    {
      title: 'Reunion at the mountain',
      date: 'Friday, May 11 4:00pm - 6:00pm',
      location: 'Mount Nebo, Arkansas',
    }
  ];


  constructor() {
    console.log('Announcements data:', this.upcomingAnnouncements);
  }

  ngOnInit() {
  }

}
