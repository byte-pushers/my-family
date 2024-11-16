import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  FamilyTreeVisualizationComponent
} from "../../components/family-tree-visualization/family-tree-visualization.component";
import * as d3 from 'd3';
import {FooterNavigationComponent} from "../../components/shared/footer-navigation/footer-navigation.component";
import {IonicModule} from "@ionic/angular";
import {FamilyTreeService} from "../../services/family-tree.service";
import {FamilyTreeResponse} from "../../models/family-tree/family-tree-response";


@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.page.html',
  styleUrls: ['./family-tree.page.scss'],
  standalone: true,
  imports: [ IonicModule, FooterNavigationComponent, FamilyTreeVisualizationComponent, CommonModule, FormsModule ]
})
export class FamilyTreePage {
  // Reference to the SVG group or nodes (modify as needed)
  @ViewChild(FamilyTreeVisualizationComponent) familyTreeVisualization!: FamilyTreeVisualizationComponent;

  familyTreeData: FamilyTreeResponse | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private familyTreeService: FamilyTreeService) {}

  ngOnInit() {
    console.log('FamilyTreePage: ngOnInit');
    this.loadFamilyTree();
  }

  loadFamilyTree() {
    console.log('FamilyTreePage: Starting loadFamilyTree');
    this.loading = true;
    this.error = null;

    // Hardcoded ID for now - could come from user context later
    const treeId = 1; // TODO: Get from user context
    console.log('FamilyTreePage: Fetching tree with ID:', treeId);

    this.familyTreeService.getFamilyTree(treeId).subscribe({
      next: (response) => {
        console.log('FamilyTreePage: API Response:', response);
        this.familyTreeData = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('FamilyTreePage: Error loading family tree:', err);
        this.error = 'Failed to load family tree. Please try again.';
        this.loading = false;
      }
    });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    const nodes = d3.selectAll('.node'); // Adjust if the node class is different

    // Highlight nodes that match the query
    nodes.each(function(d: any) {
      const nodeElement = d3.select(this);
      if (d.data.name.toLowerCase().includes(query)) {
        nodeElement.select('circle').attr('stroke', 'orange').attr('stroke-width', 4); // Highlight circle
        nodeElement.select('text').style('font-weight', 'bold'); // Highlight text
      } else {
        nodeElement.select('circle').attr('stroke', '#b3a2c8').attr('stroke-width', 2); // Reset circle
        nodeElement.select('text').style('font-weight', 'normal'); // Reset text
      }
    });
  }
}
