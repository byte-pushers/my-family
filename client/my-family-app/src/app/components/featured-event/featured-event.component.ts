import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface FeaturedEvent {
  title: string;
  imageUrl: string;
  registrationOpen: boolean;
}

@Component({
  selector: 'app-featured-event',
  templateUrl: './featured-event.component.html',
  styleUrls: ['./featured-event.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FeaturedEventComponent {
  @Input() event: FeaturedEvent = {
    title: 'Quintanilla Family Reunion 2023',
    imageUrl: 'assets/img/family-1.jpg',
    registrationOpen: true
  };

  onRegister() {
    // Add registration logic here
    console.log('Register clicked for:', this.event.title);
  }
}
