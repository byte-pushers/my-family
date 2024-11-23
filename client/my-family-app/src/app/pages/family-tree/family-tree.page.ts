// family-tree.page.ts
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FamilyTreeVisualizationComponent } from "../../components/family-tree-visualization/family-tree-visualization.component";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { FamilyTreeService } from "../../services/family-tree.service";
import { FamilyMemberListComponent } from "../../components/family-member-list/family-member-list.component";
import {createFamilyMemberFromResponse, FamilyTreeResponse} from "../../models/family-tree/family-tree-response";
import { FamilyMember } from '../../models/family-tree/family-member.model';
import { Person } from '../../models/family-tree/person';
import { RelationshipType } from '../../models/family-tree/relationship-type';
import {FamilySearchService} from "../../services/family-search.service";
import { MOCK_FAMILY_MEMBERS, MOCK_FAMILY_TREE_RESPONSE } from './mock-family-data';

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
// family-tree.page.ts
// family-tree.page.ts
export class FamilyTreePage implements OnInit, OnDestroy {
  @ViewChild(FamilyTreeVisualizationComponent)
  familyTreeVisualization!: FamilyTreeVisualizationComponent;

  familyTreeData: FamilyTreeResponse | null = null;
  familyMembers: FamilyMember[] = [];
  filteredMembers: FamilyMember[] = [];
  selectedId?: number;
  loading = true;
  error: string | null = null;
  searchQuery = '';

  private destroy$ = new Subject<void>();

  constructor(
    private familyTreeService: FamilyTreeService,
    private familySearchService: FamilySearchService
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

  ngOnInit() {
    this.loadFamilyTree();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadFamilyTree() {
    this.loading = true;
    this.error = null;

    try {
      this.familyTreeData = MOCK_FAMILY_TREE_RESPONSE;

      // Convert response to FamilyMember instances for the list
      this.familyMembers = MOCK_FAMILY_TREE_RESPONSE.familyMembers.map(memberData =>
        createFamilyMemberFromResponse(memberData)
      );

      this.familySearchService.searchMembers('', this.familyMembers);
      this.loading = false;
    } catch (error) {
      console.error('Error loading mock data:', error);
      this.error = 'Failed to load family tree data.';
      this.loading = false;
    }
  }

  onSearch(event: CustomEvent): void {
    const query = event.detail.value?.toLowerCase() ?? '';
    this.searchQuery = query;
    this.familySearchService.searchMembers(query, this.familyMembers);

    // Highlight matching nodes in tree visualization
    if (this.familyTreeVisualization) {
      this.familyTreeVisualization.highlightNodes(query);
    }
  }

  onMemberSelected(memberId: number) {
    const member = this.familyMembers.find(m => m.getId() === memberId);
    if (member) {
      this.familySearchService.selectMember(member);
      if (this.familyTreeVisualization) {
        this.familyTreeVisualization.focusNode(memberId);
      }
    }
  }
}
