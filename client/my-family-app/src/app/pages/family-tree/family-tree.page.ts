/**
 * @file family-tree.page.ts
 * @description This file contains the FamilyTreePage component which handles displaying and managing the family tree.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FamilyTreeVisualizationComponent } from "../../components/family-tree-visualization/family-tree-visualization.component";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { FamilyTreeService } from "../../services/family-tree.service";
import { FamilyMemberListComponent } from "../../components/family-member-list/family-member-list.component";
import { createFamilyMemberFromResponse, FamilyTreeResponse } from "../../models/family-tree/family-tree-response";
import { FamilyMember } from '../../models/family-tree/family-member.model';
import { Person } from '../../models/family-tree/person';
import { RelationshipType } from '../../models/family-tree/relationship-type';
import { FamilySearchService } from "../../services/family-search.service";
import { MOCK_FAMILY_MEMBERS, MOCK_FAMILY_TREE_RESPONSE } from './mock-family-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.page.html',
  styleUrls: ['./family-tree.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FooterNavigationComponent,
    FamilyTreeVisualizationComponent,
    CommonModule,
    FormsModule,
    FamilyMemberListComponent
  ]
})
export class FamilyTreePage implements OnInit, OnDestroy {
  @ViewChild(FamilyTreeVisualizationComponent)
  familyTreeVisualization!: FamilyTreeVisualizationComponent;

  /**
   * The family tree data.
   */
  familyTreeData: FamilyTreeResponse | null = null;

  /**
   * Array of family members.
   */
  familyMembers: FamilyMember[] = [];

  /**
   * Array of filtered family members based on search query.
   */
  filteredMembers: FamilyMember[] = [];

  /**
   * The root member of the family tree.
   */
  rootMember?: FamilyMember;

  /**
   * The ID of the selected family member.
   */
  selectedId?: number;

  /**
   * Indicates whether the data is loading.
   */
  loading = true;

  /**
   * Error message if data loading fails.
   */
  error: string | null = null;

  /**
   * The search query for filtering family members.
   */
  searchQuery = '';

  /**
   * Subject to handle component destruction.
   */
  private destroy$ = new Subject<void>();

  constructor(
    private familyTreeService: FamilyTreeService,
    private familySearchService: FamilySearchService,
    private router: Router
  ) {
    // Subscribe to search results
    this.familySearchService.getSearchResults()
      .pipe(takeUntil(this.destroy$))
      .subscribe(results => {
        this.filteredMembers = results;
      });

    // Subscribe to selected member
    this.familySearchService.getSelectedMember()
      .pipe(takeUntil(this.destroy$))
      .subscribe(member => {
        if (member) {
          this.selectedId = member.getId();
        }
      });
  }

  /**
   * Navigates to the add family member page.
   */
  navigateToAddFamily() {
    sessionStorage.setItem('fromFamilyTree', 'true');
    this.router.navigate(['/add-to-family']);
  }

  /**
   * Lifecycle hook called after data-bound properties of a directive are initialized.
   * Loads the family tree data.
   */
  ngOnInit() {
    console.log('FamilyTreePage: ngOnInit');
    this.loadFamilyTree();
  }

  /**
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * Cleans up subscriptions.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Loads the family tree data.
   */
  loadFamilyTree() {
    console.log('FamilyTreePage: Starting loadFamilyTree');
    this.loading = true;
    this.error = null;

    try {
      this.familyTreeData = MOCK_FAMILY_TREE_RESPONSE;

      // Create root member from the top-level data
      this.rootMember = createFamilyMemberFromResponse({
        id: this.familyTreeData.id,
        relationship: this.familyTreeData.relationship,
        person: this.familyTreeData.person,
        parent: this.familyTreeData.parent,
        familyMembers: [],
        createdBy: this.familyTreeData.createdBy,
        updatedBy: this.familyTreeData.updatedBy,
        createdDate: this.familyTreeData.createdDate,
        updatedDate: this.familyTreeData.updatedDate
      });

      // Convert response to FamilyMember instances for the list
      // Filter out the root member if it exists in familyMembers
      this.familyMembers = this.familyTreeData.familyMembers
        .filter(member => member.id !== this.rootMember?.getId())
        .map(memberData => createFamilyMemberFromResponse(memberData));

      // Include root member in search
      const allMembers = [this.rootMember, ...this.familyMembers];
      this.familySearchService.searchMembers('', allMembers);
      this.loading = false;

      console.log('Root Member:', this.rootMember);
      console.log('Family Members:', this.familyMembers);
    } catch (error) {
      console.error('Error loading mock data:', error);
      this.error = 'Failed to load family tree data.';
      this.loading = false;
    }
  }

  /**
   * Handles the search event.
   * @param {CustomEvent} event - The event object containing the search query.
   */
  onSearch(event: CustomEvent): void {
    const query = event.detail.value?.toLowerCase() ?? '';
    this.searchQuery = query;
    // Include root member in search
    const allMembers = this.rootMember
      ? [this.rootMember, ...this.familyMembers]
      : this.familyMembers;
    this.familySearchService.searchMembers(query, allMembers);

    if (this.familyTreeVisualization) {
      this.familyTreeVisualization.highlightNodes(query);
    }
  }

  /**
   * Handles the selection of a family member.
   * @param {number} memberId - The ID of the selected family member.
   */
  onMemberSelected(memberId: number) {
    console.log('Member selected in list:', memberId);
    // Check both root member and family members
    const member = this.rootMember?.getId() === memberId
      ? this.rootMember
      : this.familyMembers.find(m => m.getId() === memberId);

    if (member) {
      console.log('Found member:', member);
      this.familySearchService.selectMember(member);
      if (this.familyTreeVisualization) {
        console.log('Calling focusNode with ID:', memberId);
        this.familyTreeVisualization.focusNode(memberId);
      } else {
        console.error('Tree visualization component not available');
      }
    } else {
      console.error('Member not found with ID:', memberId);
    }
  }
}
