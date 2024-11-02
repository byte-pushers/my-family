import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class EventDetailsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() eventTitle: string = '';
  @Input() eventDate: string = '';
  @Input() eventTime: string = '';
  @Input() eventLocation: string = '';
  @Input() eventDescription: string = '';
  @Input() eventImageUrl: string = '';
}
