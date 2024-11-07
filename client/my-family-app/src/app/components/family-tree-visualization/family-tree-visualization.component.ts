// family-tree-visualization.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as familyData from './mock-data.json';
import { FamilyNode } from "../../interfaces/family-node";
import { ForceSimulation } from './force-simulation';

@Component({
  selector: 'app-family-tree-visualization',
  templateUrl: './family-tree-visualization.component.html',
  standalone: true,
  styleUrls: ['./family-tree-visualization.component.scss']
})
export class FamilyTreeVisualizationComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private forceSimulation: ForceSimulation
  ) {}

  ngOnInit(): void {
    this.createFamilyTree();
  }

  createFamilyTree(): void {
    const root = d3.hierarchy(familyData as FamilyNode);
    const radialTreeLayout = d3.tree<FamilyNode>()
      .size([2 * Math.PI, 400])
      .separation(() => 1.5);

    radialTreeLayout(root);

    root.each(d => {
      const angle = (d as any).x - Math.PI / 2;
      d.x = Math.cos(angle) * d.y!;
      d.y = Math.sin(angle) * d.y!;
    });

    const nodes = root.descendants();
    const links = root.links();

    const element = this.el.nativeElement.querySelector('#family-tree');
    const width = 1000;
    const height = 1000;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('font', '10px sans-serif');

    // Create a container for zoom
    const zoomableGroup = svg.append('g')
      .attr('class', 'zoomable-group');

    // Setup links
    const link = zoomableGroup.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Setup nodes
    const node = zoomableGroup.selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Add circles
    node.append('circle')
      .attr('r', d => {
        if (d.depth === 0) return 40;
        else if (d.depth === 1) return 30;
        else return 20;
      })
      .style('fill', '#19d3a2')
      .style('fill-opacity', 0.3)
      .attr('stroke', '#b3a2c8')
      .style('stroke-width', 4)
      .style('cursor', 'pointer');

    // Add text labels
    node.append('text')
      .attr('dy', 5)
      .attr('x', 35)
      .style('font-size', '12px')
      .style('font-family', 'Arial, sans-serif')
      .style('pointer-events', 'none')
      .text(d => d.data.name);

    // Setup force simulation
    const simulation = this.forceSimulation.setupForceSimulation(
      nodes, links, width, height, node, link
    );

    // Enable dragging on nodes
    // @ts-ignore
    node.call(this.forceSimulation.setupDragBehavior(simulation) as any);

    // Setup zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        zoomableGroup.attr('transform', event.transform);
      });

    // Add zoom behavior to SVG
    svg.call(zoom as any);

    // Double tap to reset zoom
    svg.on('dblclick.zoom', null);
  }
}
