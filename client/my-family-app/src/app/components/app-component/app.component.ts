import { Component } from '@angular/core';
import { CreateAccountPage } from '../../pages/create-account/create-account.page';
import { CreateEventPage } from '../../pages/create-event/create-event.page';
import {AddToFamilyPage} from "../../pages/add-to-family/add-to-family.page"; // Import CreateEventPage
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CreateAccountPage, CreateEventPage, AddToFamilyPage, IonicModule], // Include CreateEventPage here
})
export class AppComponent {
  constructor() {}
}
