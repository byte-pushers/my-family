import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FamilyMemberModel } from '../models/family-tree/family-member.model';

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
  private searchResults = new BehaviorSubject<FamilyMember[]>([]);
  private selectedMember = new BehaviorSubject<FamilyMember | null>(null);
  private searchQuery = new BehaviorSubject<string>('');

  constructor() {}

  /**
   * Searches for family members based on the query.
   *
   * @param query The search query string.
   * @param members The list of family members to search within.
   */
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

  /**
   * Selects a family member from the list.
   *
   * @param member The family member to select.
   */
  selectMember(member: FamilyMember): void {
    this.selectedMember.next(member);
  }

  /**
   * Returns an observable of the search results.
   *
   * @returns An observable of the search results.
   */
  getSearchResults(): Observable<FamilyMember[]> {
    return this.searchResults.asObservable();
  }

  /**
   * Returns an observable of the selected family member.
   *
   * @returns An observable of the selected family member.
   */
  getSelectedMember(): Observable<FamilyMember | null> {
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
