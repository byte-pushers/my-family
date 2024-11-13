import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonicModule, IonDatetime } from "@ionic/angular";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

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
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NgOptimizedImage, FormsModule]
})
export class SearchBarComponent implements OnInit {
  @ViewChild(IonDatetime) datetime!: IonDatetime;

  @Input() context: 'home' | 'family-tree' = 'home';
  @Input() placeholder = 'Search...';
  @Output() search = new EventEmitter<any>();

  searchQuery: string = '';
  selectedCity: string = '';

  showFilters = false;
  activeFilter = 'events';
  showDatePicker = false;
  fromDate: string = new Date().toISOString();
  toDate: string = new Date().toISOString();
  selectedDate: string = new Date().toISOString();
  currentPickerType: 'from' | 'to' = 'from';
  selectedState: string = '';
  selectedLineage = '';

  // Lineage options
  lineageOptions = [
    'Parent',
    'Child',
    'Sibling',
    'Cousin',
    'Aunt/Uncle',
    'Niece/Nephew',
    'Grandparent',
    'Grandchild',
    'Great Grandparent',
    'Great Grandchild',
    'In-law'
  ];

  // Sample family crests
  familyCrests = [
    'assets/images/crest1.png',
    'assets/images/crest2.png',
    'assets/images/crest3.png'
  ];

  // US States list
  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  // Configure highlighted dates for the date picker
  highlightedDates = [
    {
      date: new Date().toISOString(),
      textColor: '#4A90E2',
      backgroundColor: '#EDF5FE'
    }
  ];

  // Generate array of years from 1900 to current year + 100
  yearValues = Array.from(
      { length: 224 }, // 1900 to 2024 + 100 years
      (_, i) => 1900 + i
  ).join(',');

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize with default dates
    const today = new Date();
    this.fromDate = today.toISOString();

    // Set default toDate to 5 days from today
    const fiveDaysFromNow = new Date(today);
    fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
    this.toDate = fiveDaysFromNow.toISOString();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onSearchInput(event: any) {
    this.searchQuery = event.detail.value;
    // Emit for real-time search if needed
    this.search.emit({
      query: this.searchQuery
    });
  }

  filterTypeChanged(event: any) {
    this.activeFilter = event.detail.value;
  }

  cancelSearch() {
    // Reset all filters to default values
    this.selectedState = '';
    this.selectedCity = '';
    this.selectedLineage = '';

    // Reset dates to defaults
    const today = new Date();
    this.fromDate = today.toISOString();
    const fiveDaysFromNow = new Date(today);
    fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
    this.toDate = fiveDaysFromNow.toISOString();

    // Reset filter type to default
    this.activeFilter = 'events';

    // Close the filters panel
    this.showFilters = false;

    // Optionally clear search query if you want
    // this.searchQuery = '';

    // Emit the cleared state
    this.search.emit({
      query: this.searchQuery
    });
  }

  applyFilters() {
    this.onSearch(); // This will now handle both filtered and unfiltered searches
  }

  async openDatePicker(type: 'from' | 'to') {
    this.currentPickerType = type;
    this.selectedDate = type === 'from' ? this.fromDate : this.toDate;
    this.showDatePicker = true;

    // Reset the date picker value when opening
    if (this.datetime) {
      await this.datetime.reset();
      this.datetime.value = this.selectedDate;
    }
  }

  onDateSelected(event: any) {
    const selectedDate = event.detail.value;

    // Validate and update the selected date
    if (this.currentPickerType === 'from') {
      this.fromDate = selectedDate;
      // If selected fromDate is after current toDate, adjust toDate
      if (new Date(selectedDate) > new Date(this.toDate)) {
        this.toDate = selectedDate;
      }
    } else {
      // If selected toDate is before current fromDate, keep current toDate
      if (new Date(selectedDate) < new Date(this.fromDate)) {
        return;
      }
      this.toDate = selectedDate;
    }
  }

  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);

    // Check if date is valid
    if (isNaN(d.getTime())) return 'Select date';

    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  }

  onSearch() {
    // Only include filters in navigation if any filters are actually set
    const hasFilters = this.showFilters && (
        this.selectedState ||
        this.selectedCity ||
        this.selectedLineage ||
        (this.activeFilter === 'events' &&
            (this.fromDate !== new Date().toISOString() ||
                this.toDate !== new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()))
    );

    const queryParams: any = {
      query: this.searchQuery
    };

    if (hasFilters) {
      const filters: SearchFilters = {
        type: this.activeFilter as 'events' | 'family',
        ...(this.selectedState || this.selectedCity ? {
          location: {
            ...(this.selectedState ? { state: this.selectedState } : {}),
            ...(this.selectedCity ? { city: this.selectedCity } : {})
          }
        } : {}),
        ...(this.activeFilter === 'events' ? {
          dateRange: {
            from: this.fromDate,
            to: this.toDate
          }
        } : {}),
        ...(this.selectedLineage ? { lineage: this.selectedLineage } : {})
      };
      queryParams.filters = JSON.stringify(filters);
    }

    // Emit search event for parent components
    this.search.emit({
      query: this.searchQuery,
      ...(hasFilters ? { filters: queryParams.filters } : {})
    });

    // Navigate to search results
    this.router.navigate(['/search-results'], { queryParams });

    // Close filters panel if open
    this.showFilters = false;
  }
}
