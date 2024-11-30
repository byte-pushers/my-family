// search-results.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Event } from '../../models/event';
import { Person } from '../../models/family-tree/person';
import { Router, ActivatedRoute } from '@angular/router';
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { PersonModel } from '../../models/family-tree/person.model';

interface SearchFilters {
  type: 'events' | 'family';
  dateRange?: {
    from: string;
    to: string;
  };
  location?: {
    state?: string;
    city?: string;
  };
  lineage?: string;
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FooterNavigationComponent]
})
export class SearchResultsPage implements OnInit {
  searchQuery: string = '';
  filters: SearchFilters | null = null;
  events: Event[] = [];
  people: Person[] = [];

  // Mock data using your interfaces
  private mockEvents: Event[] = [
    {
      name: "Alejandro's Graduation",
      type: "graduation",
      startDate: "2023-12-25",
      endDate: "2023-12-25",
      startTime: "18:00",
      endTime: "18:30",
      location: "Dallas University",
      agendas: []
    },
    // ... other mock events
  ];

  private mockPeople: Array<Person> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    /*this.mockPeople[0] = new PersonModel(
      1,
      "Julia",
      "Harris",
      new Date('1990-01-01'),
      [],
      'system',
      new Date(),
      'system',
      new Date()
    );*/
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      try {
        this.filters = params['filters'] ? JSON.parse(params['filters']) : null;
        this.updateResults();
      } catch (e) {
        console.error('Error parsing filters:', e);
        this.filters = null;
      }
    });
  }

  updateResults() {
    if (this.filters?.type === 'events') {
      this.events = this.filterEvents(this.mockEvents);
      this.people = [];
    } else if (this.filters?.type === 'family') {
      this.events = [];
      this.people = this.filterPeople(this.mockPeople);
    } else {
      this.events = this.filterEvents(this.mockEvents);
      this.people = this.filterPeople(this.mockPeople);
    }
  }

  private filterEvents(events: Event[]): Event[] {
    return events.filter(event => {
      if (this.searchQuery && !event.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }

      if (this.filters?.location?.state && !event.location.includes(this.filters.location.state)) {
        return false;
      }

      if (this.filters?.location?.city && !event.location.includes(this.filters.location.city)) {
        return false;
      }

      if (this.filters?.dateRange?.from && this.filters?.dateRange?.to) {
        const eventDate = new Date(event.startDate);
        const fromDate = new Date(this.filters.dateRange.from);
        const toDate = new Date(this.filters.dateRange.to);
        if (eventDate < fromDate || eventDate > toDate) {
          return false;
        }
      }

      return true;
    });
  }

  private filterPeople(people: Person[]): Person[] {
    return people.filter(person => {
      if (this.searchQuery) {
        const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
        if (!fullName.includes(this.searchQuery.toLowerCase())) {
          return false;
        }
      }

      // Add more filter conditions as needed

      return true;
    });
  }

  formatEventTime(event: Event): string {
    return `${event.startTime} - ${event.endTime}`;
  }

  formatEventDate(event: Event): string {
    return new Date(event.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }

  navigateToProfile(person: Person) {
    if (person.id) {
      this.router.navigate(['/profile', person.id]);
    }
  }

  navigateToFamilyTree() {
      this.router.navigate(['/family-tree']);
  }

  navigateToEventSignup() {
    this.router.navigate(['/event-signup']);
  }
}
