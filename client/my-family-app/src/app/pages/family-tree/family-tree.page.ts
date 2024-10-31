import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {
  FamilyTreeVisualizationComponent
} from "../../components/family-tree-visualization/family-tree-visualization.component";
import * as d3 from 'd3';


@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.page.html',
  styleUrls: ['./family-tree.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FamilyTreeVisualizationComponent]
})
export class FamilyTreePage {
  // Reference to the SVG group or nodes (modify as needed)
  @ViewChild('familyTree', { static: true }) familyTree: any;

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
