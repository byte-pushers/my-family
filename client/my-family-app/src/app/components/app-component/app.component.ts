import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CreateAccountPage } from '../../pages/create-account/create-account.page';
import { CreateEventPage } from '../../pages/create-event/create-event.page';
import {AddToFamilyPage} from "../../pages/add-to-family/add-to-family.page"; // Import CreateEventPage

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CreateAccountPage, CreateEventPage, AddToFamilyPage], // Include CreateEventPage here
})
export class AppComponent {
  constructor() {}
}
