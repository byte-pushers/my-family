import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FamilyMemberModel } from '../../models/family-tree/family-member.model';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  createOutline,
  trashOutline,
  informationCircleOutline,
  gitMergeOutline
} from 'ionicons/icons';
import {FamilyMember} from "../../models/family-tree/family-member";

@Component({
  selector: 'app-family-member-list',
  templateUrl: './family-member-list.component.html',
  styleUrls: ['./family-member-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class FamilyMemberListComponent implements OnInit {
  @Input() members: FamilyMemberModel[] = [];
  @Input() selectedMemberId?: number | null;
  @Output() memberSelected = new EventEmitter<number>();
  /** Event emitted when a family member is deleted */
  @Output() memberDeleted = new EventEmitter<number>();
  /** Event emitted when a family member is edited */
  @Output() memberEdited = new EventEmitter<number>();

  /** Number of members to display per page */
  pageSize = 5;
  /** Current page number */
  currentPage = 1;
  /** Sorting option for the members list */
  sortOption: 'name' | 'relationship' | 'age' = 'name';

  /** Subject to handle component destruction */
  private destroy$ = new Subject<void>();
  /** Current search query */
  private currentSearchQuery = '';

  constructor() {
    // Register the Ionic icons
    addIcons({
      'people-outline': peopleOutline,
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'information-circle-outline': informationCircleOutline,
      'git-merge-outline': gitMergeOutline
    });

    return filteredMembers.sort((a, b) => {
      switch (this.sortOption) {
        case 'age':
          return this.calculateAge(b.person.birthDate) - this.calculateAge(a.person.birthDate);
        case 'relationship':
          return (a === this.rootMember ? 'Root' : a.relationship)
            .localeCompare(b === this.rootMember ? 'Root' : b.relationship);
        case 'name':
        default:
          return `${a.person.firstName} ${a.person.lastName}`
            .localeCompare(`${b.person.firstName} ${b.person.lastName}`);
      }
    });
  }

  /**
   * Gets the paginated list of family members.
   * @returns {FamilyMember[]} The paginated list of family members.
   */
  get paginatedMembers(): FamilyMember[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredAndSortedMembers.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * Gets the total number of pages.
   * @returns {number} The total number of pages.
   */
  get totalPages(): number {
    return Math.ceil(this.filteredAndSortedMembers.length / this.pageSize);
  }

  /**
   * Handles page change event.
   * @param {number} page - The new page number.
   */
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /**
   * Checks if a family member matches the current search query.
   * @param {FamilyMember} member - The family member to check.
   * @returns {boolean} True if the member matches the search query, false otherwise.
   */
  private memberMatchesSearch(member: FamilyMember): boolean {
    if (!this.currentSearchQuery) return true;

    const query = this.currentSearchQuery.toLowerCase();
    const fullName = `${member.person.firstName} ${member.person.lastName}`.toLowerCase();
    return fullName.includes(query);
  }

  get sortedMembers(): FamilyMemberModel[] {
    // Create a new array before sorting to avoid mutating the input
    return [...this.members].sort((a, b) => {
      if (this.sortOption === 'name') {
        return `${a.person?.firstName || ''} ${a.person?.lastName || ''}`
          .localeCompare(`${b.person?.firstName || ''} ${b.person?.lastName || ''}`);
      }
      return (a.relationship || '').localeCompare(b.relationship || '');
    });
  }

  getInitials(member: FamilyMemberModel): string {
    if (!member.person || !member.person.firstName || !member.person.lastName) {
      return '??';
    }
    return (member.person.firstName.charAt(0) + member.person.lastName.charAt(0)).toUpperCase();
  }

  calculateAge(birthDate: Date | string | undefined): number {
    if (!birthDate) return 0;

    const bDate = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - bDate.getFullYear();
    const monthDiff = today.getMonth() - bDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bDate.getDate())) {
      age--;
    }
    return age;
  }

  onMemberClick(member: FamilyMemberModel): void {
    const id = member.getId();
    if (id != null) {
      this.memberSelected.emit(id);
    }
  }

  onEditMember(event: Event, member: FamilyMemberModel): void {
    event.stopPropagation();
    const id = member.getId();
    if (id != null) {
      this.memberEdited.emit(id);
    }
  }

  onDeleteMember(event: Event, member: FamilyMemberModel): void {
    event.stopPropagation();
    const id = member.getId();
    if (id != null) {
      this.memberDeleted.emit(id);
    }
  }

  navigateToProfile() {
    this.router.navigate(['/family-member', 1]); // Default to ID 1 (Marge)
  }

  ngOnInit(): void {
    console.log('Initial members:', this.members);
  }
}
