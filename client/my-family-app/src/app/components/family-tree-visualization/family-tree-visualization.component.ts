import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as familyData from './mock-data.json';

interface FamilyNode {
  name: string;
  image?: string;
  x?: number;
  y?: number;
  children?: FamilyNode[];
}

@Component({
  selector: 'app-family-tree-visualization',
  templateUrl: './family-tree-visualization.component.html',
  standalone: true,
  styleUrls: ['./family-tree-visualization.component.scss']
})
export class FamilyTreeVisualizationComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.createFamilyTree();
  }

  createFamilyTree(): void {
    const root = d3.hierarchy(familyData as FamilyNode);

    // Apply d3.tree layout to create an initial structured layout
    const treeLayout = d3.tree<FamilyNode>().size([800, 600]); // Set width and height for tree spread
    treeLayout(root); // This sets x and y on each node based on tree structure

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

    // Create a zoomable group within the SVG
    const zoomableGroup = svg.append('g').attr('class', 'zoomable-group');

    // Add links (lines) to the zoomable group
    const link = zoomableGroup.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Initialize the nodes as circles within the zoomable group
    const node = zoomableGroup.selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .call(d3.drag<SVGGElement, d3.HierarchyNode<FamilyNode>>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    // Add circles to represent each node
    node.append('circle')
      .attr('r', 25)
      .style('fill', '#19d3a2')
      .style('fill-opacity', 0.3)
      .attr('stroke', '#b3a2c8')
      .style('stroke-width', 4);

    // Add text labels for each node
    node.append('text')
      .attr('dy', 5) // Center text vertically on the node
      .attr('x', 35) // Offset text to the right of each circle
      .style('font-size', '12px')
      .style('font-family', 'Arial, sans-serif')
      .style('pointer-events', 'none') // Ensure text doesn't interfere with dragging
      .text(d => d.data.name); // Use the name property from the data

    // Set up the force simulation with nodes and links
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => (d as d3.HierarchyNode<FamilyNode>).data.name)
        .distance(d => {
          // Layered link distances based on the source node's depth
          if (d.source.depth === 0) return 250; // Grandparent to Parent link length
          if (d.source.depth === 1) return 150; // Parent to Child link length
          return 100; // Default shortest link length for further descendants
        })
        .strength(1) // Keep link force strong to enforce distances
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(-50)) // Gentle repulsive force to prevent overlap
      .force('collide', d3.forceCollide().radius(40)) // Collision force to prevent overlapping
      .alpha(0.2)
      .on('tick', () => {
        // Update link positions
        link
          .attr('x1', d => d.source.x!)
          .attr('y1', d => d.source.y!)
          .attr('x2', d => d.target.x!)
          .attr('y2', d => d.target.y!);

        // Update node positions
        node.attr('transform', d => `translate(${d.x},${d.y})`);
      });

    // Drag functions
    function dragstarted(event: any, d: d3.HierarchyNode<FamilyNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d3.select(event.sourceEvent.target).raise().attr('stroke', 'black');
      (d as any).fx = d.x;
      (d as any).fy = d.y;
    }

    function dragged(event: any, d: d3.HierarchyNode<FamilyNode>) {
      (d as any).fx = event.x;
      (d as any).fy = event.y;
    }

    function dragended(event: any, d: d3.HierarchyNode<FamilyNode>) {
      if (!event.active) simulation.alphaTarget(0);
      d3.select(event.sourceEvent.target).attr('stroke', null);
      (d as any).fx = null;
      (d as any).fy = null;
    }

    // Set up zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3]) // Limits for zooming out and in
      .on('zoom', (event) => {
        zoomableGroup.attr('transform', event.transform); // Apply zoom to the group
      });

    // @ts-ignore
    svg.call(zoom); // Attach zoom to the SVG element
  }
}
