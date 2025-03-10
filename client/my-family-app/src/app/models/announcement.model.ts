/**
 * @file announcement.model.ts
 * @description This file contains the Announcement interface which represents an announcement with its details.
 * @version 1.0.0
 */

/**
 * Represents an announcement.
 */
import { Announcement} from './announcement';

export class AnnouncementModel implements Announcement {
  title: string;
  date: string;
  location: string;

  constructor(title: string, date: string, location: string) {
    this.title = title;
    this.date = date;
    this.location = location;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDate(): string {
    return this.date;
  }

  public getLocation(): string {
    return this.location;
  }
}
