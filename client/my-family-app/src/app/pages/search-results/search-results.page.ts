/**
 * @file search-results.page.ts
 * @description This file contains the SearchResultsPage component which handles displaying search results for events and family members.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Event } from '../../models/event';
import { Person } from '../../models/family-tree/person';
import { PersonDisplay } from '../profile/family-member/person-display'
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
  /**
   * The search query entered by the user.
   */
  searchQuery: string = '';

  /**
   * The filters applied to the search results.
   */
  filters: SearchFilters | null = null;

  /**
   * The list of events matching the search criteria.
   */
  events: Event[] = [];

  /**
   * The list of people matching the search criteria.
   */
  people: PersonDisplay[] = [];

  /**
   * Mock data for events.
   */
  /*private mockEvents: Event[] = [
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
  }];*/

  /**
   * Mock data for people.
   */
 /* private mockPeople: PersonDisplay[] = [
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
  ];*/

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){
    // Initialize with a few mock family members
  /*  this.mockPeople = [
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
    ];*/
  }

  /**
   * Lifecycle hook called after data-bound properties of a directive are initialized.
   * Subscribes to query parameters and updates search results.
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      try {
        this.filters = params['filters'] ? JSON.parse(params['filters']) : null;
        // this.updateResults();
      } catch (e) {
        console.error('Error parsing filters:', e);
        this.filters = null;
      }
    });
  }

  /**
   * Updates the search results based on the current filters and search query.
   */
/*  updateResults() {
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
  }*/

  /**
   * Filters the list of events based on the search query and filters.
   * @param {Event[]} events - The list of events to filter.
   * @returns {Event[]} The filtered list of events.
   */
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

  /**
   * Filters the list of people based on the search query.
   * @param {PersonDisplay[]} people - The list of people to filter.
   * @returns {PersonDisplay[]} The filtered list of people.
   */
  private filterPeople(people: PersonDisplay[]): PersonDisplay[] {
    return people.filter(personDisplay => {
      if (this.searchQuery) {
        const fullName = `${personDisplay.person.firstName} ${personDisplay.person.lastName}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      }
      return true;
    });
  }

  /**
   * Formats the event time for display.
   * @param {Event} event - The event to format.
   * @returns {string} The formatted event time.
   */
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

  /**
   * Formats the event date for display.
   * @param {Event} event - The event to format.
   * @returns {string} The formatted event date.
   */
  formatEventDate(event: Event): string {
    if (!event.startDate) return '';

    return new Date(event.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Navigates to the profile page of the selected person.
   * @param {PersonDisplay} personDisplay - The person to navigate to.
   */
  navigateToProfile(personDisplay: PersonDisplay) {
    if (personDisplay.person.id) {
      this.router.navigate(['/family-member', personDisplay.person.id]);
    }
  }

  /**
   * Navigates to the family tree page.
   */
  navigateToFamilyTree() {
    this.router.navigate(['/family-tree']);
  }

  /**
   * Navigates to the event signup page.
   */
  navigateToEventSignup() {
    this.router.navigate(['/event-signup']);
  }
}
