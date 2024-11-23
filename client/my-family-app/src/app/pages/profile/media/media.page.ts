// src/app/pages/media/media.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MediaService, MediaItem } from '../../../services/media.service';
import { FooterNavigationComponent } from '../../../components/shared/footer-navigation/footer-navigation.component';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FooterNavigationComponent, FormsModule]
})
export class MediaPage implements OnInit {
  selectedSegment: 'photos' | 'videos' = 'photos';
  photos: MediaItem[] = [];
  videos: MediaItem[] = [];

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

  ngOnInit() {
    this.mediaService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });

    this.mediaService.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  connect(socialConnection: any) {
    socialConnection.connected = !socialConnection.connected;
  }

  addMedia() {
    console.log('Add media clicked');
  }
}
