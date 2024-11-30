import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FamilyMember } from '../../models/family-tree/family-member.model';
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
  @Input() members: FamilyMember[] = [];
  @Input() rootMember?: FamilyMember;
  @Input() selectedMemberId?: number;
  @Output() memberSelected = new EventEmitter<number>();
  @Output() memberDeleted = new EventEmitter<number>();
  @Output() memberEdited = new EventEmitter<number>();

  // Pagination
  pageSize = 5;
  currentPage = 1;
  sortOption: 'name' | 'relationship' | 'age' = 'name';

  private destroy$ = new Subject<void>();
  private currentSearchQuery = '';

  constructor(
    private router: Router,
    private familySearchService: FamilySearchService,
  ) {}

  ngOnInit(): void {
    this.familySearchService.getSearchQuery()
      .pipe(takeUntil(this.destroy$))
      .subscribe(query => {
        this.currentSearchQuery = query;
        this.currentPage = 1; // Reset to first page on new search
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredAndSortedMembers(): FamilyMember[] {
    // Create a Set to track unique member IDs
    const memberIds = new Set<number>();
    const filteredMembers: FamilyMember[] = [];

    // Add root member if it exists and matches search
    if (this.rootMember && (!this.currentSearchQuery || this.memberMatchesSearch(this.rootMember))) {
      const rootId = this.rootMember.getId();
      if (rootId !== undefined) {
        memberIds.add(rootId);
        filteredMembers.push(this.rootMember);
      }
    }

    // Add other members that match search criteria, excluding duplicates
    this.members.forEach(member => {
      const memberId = member.getId();
      if (
        memberId !== undefined &&
        !memberIds.has(memberId) &&
        (!this.currentSearchQuery || this.memberMatchesSearch(member))
      ) {
        memberIds.add(memberId);
        filteredMembers.push(member);
      }
    });

    // Sort members
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

  get paginatedMembers(): FamilyMember[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredAndSortedMembers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAndSortedMembers.length / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  private memberMatchesSearch(member: FamilyMember): boolean {
    if (!this.currentSearchQuery) return true;

    const query = this.currentSearchQuery.toLowerCase();
    const fullName = `${member.person.firstName} ${member.person.lastName}`.toLowerCase();
    return fullName.includes(query);
  }

  getInitials(member: FamilyMember): string {
    return (member.person.firstName.charAt(0) + member.person.lastName.charAt(0)).toUpperCase();
  }

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

  onMemberClick(member: FamilyMember): void {
    const id = member.getId();
    if (id !== undefined) {
      this.memberSelected.emit(id);
    }
  }

  getMemberRelation(member: FamilyMember): string {
    return member === this.rootMember ? 'Root' : member.relationship;
  }
}
