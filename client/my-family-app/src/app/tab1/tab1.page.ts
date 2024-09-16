import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { LoginApiService } from '../services/login-api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, HttpClientModule, IonButton],
})
export class Tab1Page {
  // constructor(private loginApi: LoginApiService) { }
  //
  // loginUser() {
  //   const credentials = { email: 'test@test.com', password: 'test' };
  //   this.loginApi.login(credentials).subscribe(
  //     response => {
  //       console.log('Login successful', response);
  //     },
  //     error => console.log('Login failed', error)
  //   );
  // }
}


