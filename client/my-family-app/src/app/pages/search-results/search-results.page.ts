// search-results.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Event } from '../../models/event';
import { Person } from '../../models/family-tree/person';
import { PersonDisplay } from '../profile/family-member/person-display'
import { Router, ActivatedRoute } from '@angular/router';
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";

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
  people: PersonDisplay[] = [];

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

  private mockPeople: PersonDisplay[] = [
    {
      person: new Person(
        1,
        "Julia",
        "Harris",
        new Date('1994-10-03'),
        [],
        'system',
        new Date(),
        'system',
        new Date()
      ),
      nickname: 'Marge',
      address: '1258 Titan Dr, Dallas, TX 75247'
    },
    {
      person: new Person(
        2,
        "Julia",
        "Harris",
        new Date('1994-10-03'),
        [],
        'system',
        new Date(),
        'system',
        new Date()
      ),
      nickname: 'Gabby',
      address: '1330 Regal Row, Dallas, TX 75000'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  private filterPeople(people: PersonDisplay[]): PersonDisplay[] {
    return people.filter(personDisplay => {
      if (this.searchQuery) {
        const fullName = `${personDisplay.person.firstName} ${personDisplay.person.lastName}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      }
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

  navigateToProfile(personDisplay: PersonDisplay) {
    if (personDisplay.person.id) {
      this.router.navigate(['/family-member', personDisplay.person.id]);
    }
  }


  navigateToFamilyTree() {
      this.router.navigate(['/family-tree']);
  }

  navigateToEventSignup() {
    this.router.navigate(['/event-signup']);
  }
}
