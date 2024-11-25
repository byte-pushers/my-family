import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FamilyMemberModel } from '../models/family-tree/family-member.model';
import { FamilyMember } from "../models/family-tree/family-member";

/**
 * Service for searching and selecting family members.
 *
 * @author Danny Amezquita
 * @version 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class FamilySearchService {
  private searchResults = new BehaviorSubject<FamilyMemberModel[]>([]);
  private selectedMember = new BehaviorSubject<FamilyMemberModel | null>(null);

  constructor() {}

  // Search both tree and list
  searchMembers(query: string, members: FamilyMemberModel[]): void {
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

  // Handle member selection from list
  selectMember(member: FamilyMemberModel): void {
    this.selectedMember.next(member);
  }

  // Observable for components to subscribe to
  getSearchResults(): Observable<FamilyMemberModel[]> {
    return this.searchResults.asObservable();
  }

  getSelectedMember(): Observable<FamilyMemberModel | null> {
    return this.selectedMember.asObservable();
  }

  /**
   * Clears the search results and selected member.
   */
  clearSearch(): void {
    this.searchResults.next([]);
    this.selectedMember.next(null);
    this.searchQuery.next('');
  }
}
