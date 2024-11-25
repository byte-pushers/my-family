import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FamilyMemberModel } from '../models/family-tree/family-member.model';

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
      this.searchResults.next(members);
      return;
    }

    const filtered = members.filter(member =>
      member.person.firstName.toLowerCase().includes(query.toLowerCase()) ||
      member.person.lastName.toLowerCase().includes(query.toLowerCase())
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

  // Clear search and selection
  clearSearch(): void {
    this.searchResults.next([]);
    this.selectedMember.next(null);
  }
}
