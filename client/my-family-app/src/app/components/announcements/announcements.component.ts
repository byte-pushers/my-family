import {Component, Input, OnInit} from '@angular/core';
import {Announcement} from "../../models/announcement.model";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AnnouncementsComponent  implements OnInit {
  @Input() announcements: Announcement[] = [];


  handleRSVP(announcement: Announcement) {
    this.router.navigate(['/event-signup'], {
      state: { eventData: announcement }
    });
    console.log('RSVP for:', announcement.title);
  }

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Received announcements:', this.announcements);
  }

}
