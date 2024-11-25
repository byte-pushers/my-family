import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Interface representing a media item.
 */
export interface MediaItem {
  id: string;
  url: string;
  type: 'photo' | 'video';
  thumbnail?: string;
  timestamp: string;
}

/**
 * Service for managing media items such as photos and videos.
 *
 * @author Danny Amezquita
 * @version 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mockPhotos: MediaItem[] = [
    { id: '1', url: 'assets/img/family-1.jpg', type: 'photo', timestamp: '2024-02-01' },
    { id: '2', url: 'assets/img/family-1.jpg', type: 'photo', timestamp: '2024-02-02' },
    { id: '3', url: 'assets/img/family-1.jpg', type: 'photo', timestamp: '2024-02-03' },
    { id: '4', url: 'assets/mock/family4.jpg', type: 'photo', timestamp: '2024-02-04' },
    { id: '5', url: 'assets/mock/family5.jpg', type: 'photo', timestamp: '2024-02-05' },
    { id: '6', url: 'assets/mock/family6.jpg', type: 'photo', timestamp: '2024-02-06' },
    { id: '7', url: 'assets/mock/family7.jpg', type: 'photo', timestamp: '2024-02-07' },
    { id: '8', url: 'assets/mock/family8.jpg', type: 'photo', timestamp: '2024-02-08' },
    { id: '9', url: 'assets/mock/family9.jpg', type: 'photo', timestamp: '2024-02-09' }
  ];

  private mockVideos: MediaItem[] = [
    {
      id: 'v1',
      url: 'assets/mock/video1.mp4',
      type: 'video',
      thumbnail: 'assets/mock/video1-thumb.jpg',
      timestamp: '2024-02-01'
    },
    {
      id: 'v2',
      url: 'assets/mock/video2.mp4',
      type: 'video',
      thumbnail: 'assets/mock/video2-thumb.jpg',
      timestamp: '2024-02-02'
    },
    {
      id: 'v3',
      url: 'assets/mock/video3.mp4',
      type: 'video',
      thumbnail: 'assets/mock/video3-thumb.jpg',
      timestamp: '2024-02-03'
    }
  ];

  private photos = new BehaviorSubject<MediaItem[]>(this.mockPhotos);
  private videos = new BehaviorSubject<MediaItem[]>(this.mockVideos);

  /**
   * Returns an observable of the photo media items.
   *
   * @returns An observable of the photo media items.
   */
  getPhotos() {
    return this.photos.asObservable();
  }

  /**
   * Returns an observable of the video media items.
   *
   * @returns An observable of the video media items.
   */
  getVideos() {
    return this.videos.asObservable();
  }
}
