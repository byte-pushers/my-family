import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CreateAccountPage } from '../../pages/create-account/create-account.page';
import { CreateEventPage } from '../../pages/create-event/create-event.page'; // Import CreateEventPage

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CreateAccountPage, CreateEventPage], // Include CreateEventPage here
})
export class AppComponent {
  constructor() {}
}
