// family-search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FamilyMember } from '../models/family-tree/family-member.model';

@Injectable({
  providedIn: 'root'
})
export class FamilySearchService {
  private searchResults = new BehaviorSubject<FamilyMember[]>([]);
  private selectedMember = new BehaviorSubject<FamilyMember | null>(null);
  private searchQuery = new BehaviorSubject<string>('');

  constructor() {}

  // Search both tree and list
  searchMembers(query: string, members: FamilyMember[]): void {
    this.searchQuery.next(query);

    if (!query.trim()) {
      // When no search query, show all members
      this.searchResults.next(members);
      return;
    }

    const queryLower = query.toLowerCase();
    const filtered = members.filter(member =>
      member.person.firstName.toLowerCase().includes(queryLower) ||
      member.person.lastName.toLowerCase().includes(queryLower)
    );

    this.searchResults.next(filtered);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuery.asObservable();
  }

  // Rest of the service methods remain the same
  selectMember(member: FamilyMember): void {
    this.selectedMember.next(member);
  }

  getSearchResults(): Observable<FamilyMember[]> {
    return this.searchResults.asObservable();
  }

  getSelectedMember(): Observable<FamilyMember | null> {
    return this.selectedMember.asObservable();
  }

  clearSearch(): void {
    this.searchResults.next([]);
    this.selectedMember.next(null);
    this.searchQuery.next('');
  }
}
