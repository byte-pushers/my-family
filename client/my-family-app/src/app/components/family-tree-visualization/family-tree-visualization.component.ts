// family-tree-visualization.component.ts
import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';
import * as familyData from './mock-data.json';
import {FamilyNode} from "../../interfaces/family-node";
import {ForceSimulation} from './force-simulation';
import {
  /*createFamilyMemberFromResponse,
  createPersonFromResponse,*/
  FamilyTreeResponse
} from "../../models/family-tree/family-tree-response";

@Component({
  selector: 'app-family-tree-visualization',
  templateUrl: './family-tree-visualization.component.html',
  standalone: true,
  styleUrls: ['./family-tree-visualization.component.scss']
})
export class FamilyTreeVisualizationComponent implements OnChanges {
  @Input() selectedMemberId?: number | null;
  @Input() familyTreeData!: FamilyTreeResponse;
  private resizeObserver: ResizeObserver;
  private svg: any;
  private zoomableGroup: any;
  private zoom: any;
  private width: number = 0;
  private height: number = 0;

  constructor(
    private el: ElementRef,
    private forceSimulation: ForceSimulation,
  ) {
    // Setup resize observer
    this.resizeObserver = new ResizeObserver(entries => {
      this.handleResize();
    });
  }
  ngAfterViewInit() {
    // Start observing the container
    const element = this.el.nativeElement.querySelector('#family-tree');
    if (element) {
      this.resizeObserver.observe(element);
    }
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
  private handleResize() {
    if (this.familyTreeData) {
      // this.createFamilyTree();
    }
  }


  // TODO: Call Family Tree Service for API GET Calls
/*  ngOnInit(): void {
    this.createFamilyTree();
    // this.familyTreeService.getFamilyMembers().subscribe(
    //   data => this.createFamilyTree(data)
    // );

  }*/
  ngOnChanges(changes: SimpleChanges) {
    console.log('FamilyTreeVisualization: ngOnChanges', changes);
    if (changes['familyTreeData'] && changes['familyTreeData'].currentValue) {
      console.log('FamilyTreeVisualization: Data changed, creating tree');
      // this.createFamilyTree();
    }
  }


  // @ts-ignore
  /*private transformResponseToFamilyNode(data: FamilyTreeResponse): FamilyNode {
    console.log('FamilyTreeVisualization: Raw API Data:', data);

    // Convert raw data to our domain model instances
    const rootMember = createFamilyMemberFromResponse(data);

    // Recursive function to build the tree structure
    const buildFamilyNode = (member: FamilyTreeResponse): FamilyNode => {
      const person = createPersonFromResponse(member.person);

      return {
        name: `${person.firstName} ${person.lastName}`,
        image: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(person.firstName)}`,
        children: member.familyMembers.map(child => buildFamilyNode(child))
      };
    };

    // Build the tree starting from the root data
    const rootNode = buildFamilyNode(data);
    console.log('FamilyTreeVisualization: Transformed Root Node:', rootNode);
    return rootNode;
  }*/


  /*createFamilyTree(): void {
    console.log('FamilyTreeVisualization: Starting createFamilyTree');
    if (!this.familyTreeData) {
      console.error('FamilyTreeVisualization: No data available');
      return;
    }

    const familyNodeData = this.transformResponseToFamilyNode(this.familyTreeData);
    console.log('FamilyTreeVisualization: Created node data:', familyNodeData);

    const root = d3.hierarchy(familyNodeData);
    console.log('FamilyTreeVisualization: D3 hierarchy:', root);


    // Define radius based on the smaller dimension and leave margin

    const element = this.el.nativeElement.querySelector('#family-tree');
    if (!element) {
      console.error('FamilyTreeVisualization: SVG container not found');
      return;
    }
    console.log('FamilyTreeVisualization: Found container element');
    element.innerHTML = '';
    const bbox = element.getBoundingClientRect();
    this.width = bbox.width;
    this.height = bbox.height;
    const radius = Math.min(this.width, this.height) / 2 - Math.min(this.width, this.height) * 0.2;

    // Create SVG with centered group
    const svg = d3.select(element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`)
      .style('font', '10px sans-serif');

    // Create a container for zoom, centered in the SVG
    const zoomableGroup = svg.append('g')
      .attr('class', 'zoomable-group')
  // .attr('transform', `translate(${width / 2}, ${height / 2})`);


    // Setup radial tree layout
    const radialTreeLayout = d3.tree<FamilyNode>()
      .size([2 * Math.PI, radius])
      .separation(() => 1.5);

    // Apply the layout
    radialTreeLayout(root);

    // Convert coordinates from polar to Cartesian
    root.each(d => {
      d.x = (d as any).x;
      d.y = (d as any).y;
    });

    const nodes = root.descendants();
    const links = root.links();

    // Setup links
    const link = zoomableGroup.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', d => Math.cos((d as any).source.x - Math.PI / 2) * (d as any).source.y)
      .attr('y1', d => Math.sin((d as any).source.x - Math.PI / 2) * (d as any).source.y)
      .attr('x2', d => Math.cos((d as any).target.x - Math.PI / 2) * (d as any).target.y)
      .attr('y2', d => Math.sin((d as any).target.x - Math.PI / 2) * (d as any).target.y)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Setup nodes
    const node = zoomableGroup.selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        const x = Math.cos((d as any).x - Math.PI / 2) * (d as any).y;
        const y = Math.sin((d as any).x - Math.PI / 2) * (d as any).y;
        return `translate(${x},${y})`;
      });

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
      nodes,
      links,
      this.width / 2,  // Center X
      this.height / 2, // Center Y
      node,
      link
    );

    // Enable dragging on nodes
    // @ts-ignore
    node.call(this.forceSimulation.setupDragBehavior(simulation) as any);

    // Setup zoom behavior
    this.zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        zoomableGroup.attr('transform', `translate(${event.transform.x},${event.transform.y}) scale(${event.transform.k})`);
      });

    // Add zoom behavior to SVG
    svg.call(this.zoom as any);

    // Double tap to reset zoom
    svg.on('dblclick.zoom', null);

    // Store references
    this.svg = svg;
    this.zoomableGroup = zoomableGroup;
  }
  highlightNodes(query: string): void {
    if (!query) {
      // Reset all nodes if query is empty
      this.resetNodeHighlighting();
      return;
    }

    const nodes = d3.selectAll('.node'); // Adjust selector if needed

    nodes.each(function(d: any) {
      const nodeElement = d3.select(this);
      const name = d.data.name.toLowerCase();

      if (name.includes(query.toLowerCase())) {
        // Highlight matching nodes
        nodeElement.select('circle')
          .attr('stroke', 'orange')
          .attr('stroke-width', 4);

        nodeElement.select('text')
          .style('font-weight', 'bold');
      } else {
        // Reset non-matching nodes
        nodeElement.select('circle')
          .attr('stroke', '#b3a2c8')
          .attr('stroke-width', 2);

        nodeElement.select('text')
          .style('font-weight', 'normal');
      }
    });
  }*/

  private resetNodeHighlighting(): void {
    const nodes = d3.selectAll('.node');

    nodes.each(function() {
      const nodeElement = d3.select(this);
      nodeElement.select('circle')
        .attr('stroke', '#b3a2c8')
        .attr('stroke-width', 2);

      nodeElement.select('text')
        .style('font-weight', 'normal');
    });
  }
  focusNode(memberId: number): void {
    if (!this.svg || !this.zoomableGroup) {
      console.error('Tree visualization not initialized');
      return;
    }

    const nodes = d3.selectAll('.node');
    let targetNode: any;

    nodes.each(function(d: any) {
      if (d.data.id === memberId) {
        targetNode = d;
      }
    });

    if (targetNode && this.zoom) {
      const svgNode = this.svg.node();
      if (!svgNode) return;

      const transform = d3.zoomTransform(svgNode);

      // Calculate the position using stored width/height
      const x = Math.cos(targetNode.x - Math.PI / 2) * targetNode.y;
      const y = Math.sin(targetNode.x - Math.PI / 2) * targetNode.y;

      // Calculate the transform to center the node
      const scale = 1.5; // Zoom level when focusing
      const centerX = -x * scale + this.width / 2;
      const centerY = -y * scale + this.height / 2;

      this.svg.transition()
        .duration(750)
        .call(
          this.zoom.transform,
          d3.zoomIdentity
            .translate(centerX, centerY)
            .scale(scale)
        );

      // Also highlight the focused node
      nodes.each(function() {
        const nodeElement = d3.select(this);
        // @ts-ignore
        const isTarget = this.__data__ === targetNode;

        nodeElement.select('circle')
          .transition()
          .duration(750)
          .attr('stroke', isTarget ? 'orange' : '#b3a2c8')
          .attr('stroke-width', isTarget ? 4 : 2);

        nodeElement.select('text')
          .transition()
          .duration(750)
          .style('font-weight', isTarget ? 'bold' : 'normal');
      });
    }
  }
}
