import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CreateAccountPage} from "../../pages/create-account/create-account.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CreateAccountPage],
})
export class AppComponent {
  constructor() {}
}
