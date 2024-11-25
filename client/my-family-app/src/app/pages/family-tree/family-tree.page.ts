import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { Subject, takeUntil } from 'rxjs';
import { FamilyTreeVisualizationComponent } from "../../components/family-tree-visualization/family-tree-visualization.component";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { FamilyTreeService } from "../../services/family-tree.service";
import { FamilyMemberListComponent } from "../../components/family-member-list/family-member-list.component";
import { FamilyTreeResponse } from "../../models/family-tree/family-tree-response";
import { FamilyMemberModel } from '../../models/family-tree/family-member.model';
import { Person } from '../../models/family-tree/person';
import { RelationshipType } from '../../models/family-tree/relationship-type';
import { FamilySearchService } from "../../services/family-search.service";
import { Router } from '@angular/router';
import { FamilyMember } from '../../models/family-tree/family-member';

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
  familyMembers: FamilyMemberModel[] = [];
  filteredMembers: FamilyMemberModel[] = [];
  selectedId?: number | null;
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
    // this.loadFamilyTree();
  }

  /**
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * Cleans up subscriptions.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

// family-tree.page.ts
  loadFamilyTree() {
    console.log('FamilyTreePage: Starting loadFamilyTree');
    this.loading = true;
    this.error = null;

    this.familyTreeService.getFamilyTree(1).subscribe({
      next: (familyTreeData: FamilyTree) => {
        console.log('FamilyTree Data:', familyTreeData);

        // Store the data in the expected FamilyTreeResponse format
        this.familyTreeData = {
          data: familyTreeData
        };

        // Now process the members from familyTreeData
        if (familyTreeData?.familyMembers?.[0]) {
          const rootMember = familyTreeData.familyMembers[0];

          // Start with the root member
          this.familyMembers = [
            new FamilyMemberModel({
              relationship: rootMember.relationship,
              person: rootMember.person
            })
          ];

          // If root member has person with family members, process those too
          if (rootMember.person?.familyMembers?.length > 0) {
            const nestedMembers = this.extractAllFamilyMembers(rootMember.person.familyMembers);
            this.familyMembers.push(...nestedMembers);
          }

          console.log('Processed family members:', this.familyMembers);
          this.familySearchService.searchMembers('', this.familyMembers);
        } else {
          console.warn('No family members found');
          this.familyMembers = [];
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading family tree:', error);
        this.error = 'Failed to load family tree data.';
        this.loading = false;
      }
    });
  }

  private extractAllFamilyMembers(members: FamilyMember[]): FamilyMemberModel[] {
    const allMembers: FamilyMemberModel[] = [];

    const processMembers = (memberList: FamilyMember[]) => {
      memberList.forEach(member => {
        // Add current member
        allMembers.push(new FamilyMemberModel({
          relationship: member.relationship,
          person: member.person
        }));

        // Process children if they exist
        if (member.person?.familyMembers?.length > 0) {
          processMembers(member.person.familyMembers);
        }
      });
    };

    processMembers(members);
    return allMembers;
  }


  onSearch(event: CustomEvent): void {
    const query = event.detail.value?.toLowerCase() ?? '';
    this.searchQuery = query;
    // Include root member in search
    const allMembers = this.rootMember
      ? [this.rootMember, ...this.familyMembers]
      : this.familyMembers;
    this.familySearchService.searchMembers(query, allMembers);

    if (this.familyTreeVisualization) {
      // this.familyTreeVisualization.highlightNodes(query);
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
