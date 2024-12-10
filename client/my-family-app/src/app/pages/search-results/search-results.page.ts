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
  private mockEvents: Event[] = [{
    id: 1,
    name: "Alejandro's Graduation",
    type: "graduation",
    startDate: new Date("2023-12-24"),
    endDate: new Date("2023-12-24"),
    startTime: new Date("2023-12-24T18:00:00"),
    endTime: new Date("2023-12-24T18:30:00"),
    location: {
      addressLine1: "123 University Drive",
      addressLine2: "",
      city: "Dallas",
      state: "TX",
      zipcode: "75001",
    },
    agendas: [],
    merchandiseList: [],
  }, {
    id: 2,
    name: "Harris Family Reunion",
    type: "reunion",
    startDate: new Date("2024-07-04"),
    endDate: new Date("2024-07-06"),
    startTime: new Date("2024-07-04T10:00:00"),
    endTime: new Date("2024-07-06T22:00:00"),
    location: {
      addressLine1: "456 Park Avenue",
      addressLine2: "Community Center",
      city: "Houston",
      state: "TX",
      zipcode: "77001",
    },
    agendas: [],
    merchandiseList: [],
  }, {
    id: 3,
    name: "Sarah's Wedding",
    type: "wedding",
    startDate: new Date("2024-02-14"),
    endDate: new Date("2024-02-14"),
    startTime: new Date("2024-02-14T16:00:00"),
    endTime: new Date("2024-02-14T23:00:00"),
    location: {
      addressLine1: "789 Garden Lane",
      addressLine2: "Rose Hall",
      city: "Austin",
      state: "TX",
      zipcode: "78701",
    },
    agendas: [],
    merchandiseList: [],
  }];

  // private mockEvents: Event[] = [{}] as Event[];

  private mockPeople: Array<Person> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){
    // Initialize with a few mock family members
    this.mockPeople = [
      new PersonModel(
        1,
        "Julia",
        "Harris",
        new Date('1990-01-01'),
        [],
        'system',
        new Date(),
        'system',
        new Date()
      ),
      new PersonModel(
        2,
        "Michael",
        "Harris",
        new Date('1988-05-15'),
        [],
        'system',
        new Date(),
        'system',
        new Date()
      ),
      new PersonModel(
        3,
        "Emma",
        "Harris",
        new Date('2015-03-20'),
        [],
        'system',
        new Date(),
        'system',
        new Date()
      )
    ];
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
      if (this.searchQuery && event.name &&
        !event.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }

      if (this.filters?.location?.state && event.location?.state &&
        !event.location.state.includes(this.filters.location.state)) {
        return false;
      }

      if (this.filters?.location?.city && event.location?.city &&
        !event.location.city.includes(this.filters.location.city)) {
        return false;
      }

      if (this.filters?.dateRange?.from && this.filters?.dateRange?.to && event.startDate) {
        const fromDate = new Date(this.filters.dateRange.from);
        const toDate = new Date(this.filters.dateRange.to);
        if (event.startDate < fromDate || event.startDate > toDate) {
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
    if (!event.startTime || !event.endTime) return '';

    const startTime = new Date(event.startTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const endTime = new Date(event.endTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${startTime} - ${endTime}`;
  }

  formatEventDate(event: Event): string {
    if (!event.startDate) return '';

    return new Date(event.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }

  formatEventLocation(event: Event): string {
    if (!event.location) return '';

    // Create an array of address parts
    const addressParts = [
      event.location.addressLine1,
      event.location.addressLine2,
      event.location.city,
      event.location.state,
      event.location.zipcode
    ];

    // Filter out empty strings and join with proper separators
    return addressParts
      .filter(part => part && part.trim() !== '')
      .join(', ');
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
