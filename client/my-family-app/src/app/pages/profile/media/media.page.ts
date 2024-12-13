/**
 * @file media.page.ts
 * @description This file contains the MediaPage component
 * which handles displaying and managing media items such as photos and videos.
 * @version 1.0.0
 * @autor Danny Amezquita
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MediaService, MediaItem } from '../../../services/media.service';
import { FooterNavigationComponent } from '../../../components/shared/footer-navigation/footer-navigation.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FooterNavigationComponent, FormsModule]
})
export class MediaPage implements OnInit {
  /**
   * The currently selected segment, either 'photos' or 'videos'.
   */
  selectedSegment: 'photos' | 'videos' = 'photos';

  /**
   * Array of photo media items.
   */
  photos: MediaItem[] = [];

  /**
   * Array of video media items.
   */
  videos: MediaItem[] = [];

  /**
   * Array of social connections for importing media.
   */
  socialConnections = [
    {
      name: 'Import from Facebook',
      icon: 'assets/icon/facebook.png', // Update paths to match your assets
      connected: false
    },
    {
      name: 'Import from gallery',
      icon: 'assets/icon/gallery.png',
      connected: false
    },
    {
      name: 'Import from Instagram',
      icon: 'assets/icon/instagram.png',
      connected: false
    },
    {
      name: 'Import from Twitter',
      icon: 'assets/icon/twitter.png',
      connected: false
    }
  ];

  constructor(private mediaService: MediaService) {}

  /**
   * Lifecycle hook called after data-bound properties of a directive are initialized.
   * Fetches photos and videos from the media service.
   */
  ngOnInit() {
    this.mediaService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });

    this.mediaService.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

  /**
   * Handles the segment change event.
   * @param {any} event - The event object containing the selected segment value.
   */
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  /**
   * Toggles the connection status of a social connection.
   * @param {any} socialConnection - The social connection object to toggle.
   */
  connect(socialConnection: any) {
    socialConnection.connected = !socialConnection.connected;
  }

  /**
   * Handles the add media action.
   */
  addMedia() {
    console.log('Add media clicked');
  }
}
