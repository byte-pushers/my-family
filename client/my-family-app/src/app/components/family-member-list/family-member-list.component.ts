/**
 * @file family-member-list.component.ts
 * @description This file contains the FamilyMemberListComponent which displays a list of family members with pagination, sorting, and search functionality.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FamilyMember } from "../../models/family-tree/family-member";
import { Router } from "@angular/router";
import { FamilySearchService } from "../../services/family-search.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-family-member-list',
  templateUrl: './family-member-list.component.html',
  styleUrls: ['./family-member-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class FamilyMemberListComponent implements OnInit, OnDestroy {
  /** Array of family members to display */
  @Input() members: FamilyMember[] = [];
  /** The root member of the family tree */
  @Input() rootMember?: FamilyMember;
  /** The ID of the selected family member */
  @Input() selectedMemberId?: number;
  /** Event emitted when a family member is selected */
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

  constructor(
    private router: Router,
    private familySearchService: FamilySearchService,
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Subscribes to search query changes.
   */
  ngOnInit(): void {
    this.familySearchService.getSearchQuery()
      .pipe(takeUntil(this.destroy$))
      .subscribe(query => {
        this.currentSearchQuery = query;
        this.currentPage = 1; // Reset to first page on new search
      });
  }

  /**
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * Cleans up subscriptions.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Gets the filtered and sorted list of family members.
   * @returns {FamilyMember[]} The filtered and sorted list of family members.
   */
  get filteredAndSortedMembers(): FamilyMember[] {
    const memberIds = new Set<number>();
    const filteredMembers: FamilyMember[] = [];

    if (this.rootMember && (!this.currentSearchQuery || this.memberMatchesSearch(this.rootMember))) {
      const rootId = this.rootMember.getId();
      if (rootId !== undefined) {
        memberIds.add(rootId);
        filteredMembers.push(this.rootMember);
      }
    }

    this.members.forEach(member => {
      const memberId = member.getId();
      if (
        memberId !== undefined &&
        !memberIds.has(Number(memberId)) &&
        (!this.currentSearchQuery || this.memberMatchesSearch(member))
      ) {
        memberIds.add(memberId);
        filteredMembers.push(member);
      }
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

  /**
   * Gets the initials of a family member.
   * @param {FamilyMember} member - The family member.
   * @returns {string} The initials of the family member.
   */
  getInitials(member: FamilyMember): string {
    return (member.person.firstName.charAt(0) + member.person.lastName.charAt(0)).toUpperCase();
  }

  /**
   * Calculates the age of a family member based on their birth date.
   * @param {Date} birthDate - The birth date of the family member.
   * @returns {number} The age of the family member.
   */
  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  /**
   * Handles the click event on a family member.
   * @param {FamilyMember} member - The family member that was clicked.
   */
  onMemberClick(member: FamilyMember): void {
    const id = member.getId();
    if (id != null) {
      this.memberSelected.emit(id);
    }
  }

  /**
   * Gets the relationship of a family member.
   * @param {FamilyMember} member - The family member.
   * @returns {string} The relationship of the family member.
   */
  getMemberRelation(member: FamilyMember): string {
    return member === this.rootMember ? 'Root' : member.relationship;
  }
}
