/**
 * @file family-tree-visualization.component.ts
 * @description This file contains the FamilyTreeVisualizationComponent which visualizes a family tree using D3.js.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as familyData from './mock-data.json';
import { FamilyNode } from "../../models/family-node";
import { ForceSimulation } from './force-simulation';
import {
  createFamilyMemberFromResponse,
  createPersonFromResponse,
  FamilyTreeResponse
} from "../../models/family-tree/family-tree-response";

@Component({
  selector: 'app-family-tree-visualization',
  templateUrl: './family-tree-visualization.component.html',
  standalone: true,
  styleUrls: ['./family-tree-visualization.component.scss']
})
export class FamilyTreeVisualizationComponent implements OnChanges {
  /** The ID of the selected family member */
  @Input() selectedMemberId?: number;
  /** The family tree data to visualize */
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

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Starts observing the container for resize events.
   */
  ngAfterViewInit() {
    const element = this.el.nativeElement.querySelector('#family-tree');
    if (element) {
      this.resizeObserver.observe(element);
    }
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Disconnects the resize observer.
   */
  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }

  /**
   * Handles resize events and recreates the family tree.
   */
  private handleResize() {
    if (this.familyTreeData) {
      // this.createFamilyTree();
    }
  }

  /**
   * Lifecycle hook that is called when any data-bound property of a directive changes.
   * @param {SimpleChanges} changes - The changes that occurred.
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log('FamilyTreeVisualization: ngOnChanges', changes);
    if (changes['familyTreeData'] && changes['familyTreeData'].currentValue) {
      console.log('FamilyTreeVisualization: Data changed, creating tree');
      this.createFamilyTree();
    }
  }

  /**
   * Transforms the API response to a FamilyNode structure.
   * @param {FamilyTreeResponse} data - The raw API data.
   * @returns {FamilyNode} The transformed family node.
   */
  private transformResponseToFamilyNode(data: FamilyTreeResponse): FamilyNode {
    console.log('FamilyTreeVisualization: Raw API Data:', data);

    const rootMember = createFamilyMemberFromResponse(data);

    const buildFamilyNode = (member: FamilyTreeResponse): FamilyNode => {
      const person = createPersonFromResponse(member.person);

      return {
        id: member.id,
        name: `${person.firstName} ${person.lastName}`,
        image: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(person.firstName)}`,
        children: member.familyMembers.map(child => buildFamilyNode(child))
      };
    };

    const rootNode = buildFamilyNode(data);
    console.log('FamilyTreeVisualization: Transformed Root Node:', rootNode);
    return rootNode;
  }*/

  /**
   * Creates the family tree visualization using D3.js.
   */
  createFamilyTree(): void {
    console.log('FamilyTreeVisualization: Starting createFamilyTree');
    if (!this.familyTreeData) {
      console.error('FamilyTreeVisualization: No data available');
      return;
    }

    const familyNodeData = this.transformResponseToFamilyNode(this.familyTreeData);
    console.log('FamilyTreeVisualization: Created node data:', familyNodeData);

    const root = d3.hierarchy(familyNodeData);
    console.log('FamilyTreeVisualization: D3 hierarchy:', root);

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
    const minDimension = Math.min(this.width, this.height);
    const radius = minDimension / 2 * 0.9;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`)
      .style('font', minDimension < 600 ? '8px sans-serif' : '10px sans-serif');

    const zoomableGroup = svg.append('g')
      .attr('class', 'zoomable-group');

    const totalNodes = root.descendants().length;
    const nodes = root.descendants();
    nodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / totalNodes;
      node.x = Math.cos(angle) * radius;
      node.y = Math.sin(angle) * radius;
    });

    const links = root.links();

    const link = zoomableGroup.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', d => (d as any).source.x)
      .attr('y1', d => (d as any).source.y)
      .attr('x2', d => (d as any).target.x)
      .attr('y2', d => (d as any).target.y)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Setup nodes
    const node = zoomableGroup.selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('image')
      .attr('xlink:href', 'assets/img/placeholder1.png')
      .attr('x', d => {
        const baseSize = minDimension < 600 ? 0.85 : 1;
        const size = d.depth === 0 ? -40 : d.depth === 1 ? -30 : -20;
        return size * baseSize;
      })
      .attr('y', d => {
        const baseSize = minDimension < 600 ? 0.85 : 1;
        const size = d.depth === 0 ? -40 : d.depth === 1 ? -30 : -20;
        return size * baseSize;
      })
      .attr('width', d => {
        const baseSize = minDimension < 600 ? 0.85 : 1;
        const size = d.depth === 0 ? 80 : d.depth === 1 ? 60 : 40;
        return size * baseSize;
      })
      .attr('height', d => {
        const baseSize = minDimension < 600 ? 0.85 : 1;
        const size = d.depth === 0 ? 80 : d.depth === 1 ? 60 : 40;
        return size * baseSize;
      })
      .style('cursor', 'pointer');

// Add a circular border/stroke around the avatar
    node.append('circle')
      .attr('r', d => {
        const baseSize = minDimension < 600 ? 0.85 : 1;
        if (d.depth === 0) return 40 * baseSize;
        else if (d.depth === 1) return 30 * baseSize;
        else return 20 * baseSize;
      })
      .style('fill', 'none')
      .attr('stroke', '#b3a2c8')
      .style('stroke-width', minDimension < 600 ? 3 : 4)
      .style('cursor', 'pointer');

    node.append('g')
      .attr('class', 'label-group')
      .style('opacity', () => {
        return minDimension < 600 ? 1 : 0;
      })
      .each(function(d) {
        const group = d3.select(this);
        const nameParts = d.data.name.split(' ');

        group.append('rect')
          .attr('class', 'label-background')
          .attr('x', -35)
          .attr('y', d => {
            const baseSize = minDimension < 600 ? 0.85 : 1;
            return (d as any).depth === 0 ? 45 * baseSize : (d as any).depth === 1 ? 35 * baseSize : 25 * baseSize;
          })
          .attr('width', 70)
          .attr('height', nameParts.length * 14 + 6)
          .attr('rx', 4)
          .attr('ry', 4)
          .style('fill', 'rgba(240, 242, 245, 0.95)')
          .style('stroke', 'rgba(200, 206, 213, 0.8)')
          .style('stroke-width', '1px')
          .style('pointer-events', 'none');

        nameParts.forEach((part, index) => {
          group.append('text')
            .attr('class', 'label-text')
            .attr('dy', d => {
              const baseSize = minDimension < 600 ? 0.85 : 1;
              return ((d as any).depth === 0 ? 60 : (d as any).depth === 1 ? 50 : 40) * baseSize + index * 12;
            })
            .attr('x', 0)
            .style('font-size', minDimension < 600 ? '10px' : '12px')
            .style('font-family', 'Arial, sans-serif')
            .style('fill', 'black')
            .style('font-weight', 'normal')
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .text(part);
        });
      });

    if (minDimension >= 600) {
      node.on('mouseenter', function(event, d) {
        d3.select(this)
          .select('.label-group')
          .transition()
          .duration(200)
          .style('opacity', 1);
      })
        .on('mouseleave', function(event, d) {
          d3.select(this)
            .select('.label-group')
            .transition()
            .duration(200)
            .style('opacity', 0);
        });

      node.select('circle')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style('stroke-width', '5');
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style('stroke-width', '2');
        });
    }

    node.style('pointer-events', 'all');

    const updateLabelsVisibility = () => {
      const currentDimension = Math.min(this.width, this.height);
      node.selectAll('.label-group')
        .style('opacity', currentDimension < 600 ? 1 : 0);

      if (currentDimension < 600) {
        node.on('mouseenter', null).on('mouseleave', null);
        node.select('circle')
          .on('mouseenter', null)
          .on('mouseleave', null);
      } else {
        node.on('mouseenter', function(event, d) {
          d3.select(this)
            .select('.label-group')
            .transition()
            .duration(200)
            .style('opacity', 1);
        })
          .on('mouseleave', function(event, d) {
            d3.select(this)
              .select('.label-group')
              .transition()
              .duration(200)
              .style('opacity', 0);
          });
      }
    };

    const simulation = this.forceSimulation.setupForceSimulation(
      nodes,
      links,
      this.width / 2,  // Center X
      this.height / 2, // Center Y
      node,
      link
    );

    // @ts-ignore
    node.call(this.forceSimulation.setupDragBehavior(simulation) as any);

    this.zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        zoomableGroup.attr('transform', `translate(${event.transform.x},${event.transform.y}) scale(${event.transform.k})`);
      });

    svg.call(this.zoom as any);
    svg.on('dblclick.zoom', null);

    this.svg = svg;
    this.zoomableGroup = zoomableGroup;
    this.svg.call(this.zoom).on('wheel.zoom');

    const resizeObserver = new ResizeObserver(() => {
      const newBbox = element.getBoundingClientRect();
      this.width = newBbox.width;
      this.height = newBbox.height;
      svg.attr('viewBox', `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`);
      updateLabelsVisibility();
    });

    resizeObserver.observe(element);
  }

  /**
   * Highlights nodes that match the search query.
   * @param {string} query - The search query.
   */
  highlightNodes(query: string): void {
    if (!query) {
      this.resetNodeHighlighting();
      return;
    }

    const nodes = d3.selectAll('.node');

    nodes.each(function(d: any) {
      const nodeElement = d3.select(this);
      const name = d.data.name.toLowerCase();

      if (name.includes(query.toLowerCase())) {
        nodeElement.select('circle')
          .attr('stroke', 'orange')
          .attr('stroke-width', 4);

        nodeElement.selectAll('.label-text')
          .style('font-weight', 'bold')
          .style('fill', '#FF6B00');

        nodeElement.select('.label-background')
          .style('fill', 'rgba(255, 243, 230, 0.95)')  // Light orange background
          .style('stroke', '#FFB366');  // Light orange border

        // Optionally, add a highlight effect to the avatar
        nodeElement.select('image')
          .style('filter', 'brightness(1.2)');
      } else {
        // Reset non-matching nodes
        nodeElement.select('circle')
          .attr('stroke', '#b3a2c8')
          .attr('stroke-width', 2);

        // Reset all text elements
        nodeElement.selectAll('.label-text')
          .style('font-weight', 'normal')
          .style('fill', 'black');

        // Reset background rectangle
        nodeElement.select('.label-background')
          .style('fill', 'rgba(240, 242, 245, 0.95)')
          .style('stroke', 'rgba(200, 206, 213, 0.8)');

        nodeElement.select('image')
          .style('filter', 'none');
      }
    });
  }

  /**
   * Resets the highlighting of nodes.
   */
  private resetNodeHighlighting(): void {
    const nodes = d3.selectAll('.node');

    nodes.each(function() {
      const nodeElement = d3.select(this);
      nodeElement.select('circle')
        .attr('stroke', '#b3a2c8')
        .attr('stroke-width', 2);

      nodeElement.selectAll('.label-text')
        .style('font-weight', 'normal')
        .style('fill', 'black');

      nodeElement.select('.label-background')
        .style('fill', 'rgba(240, 242, 245, 0.95)')
        .style('stroke', 'rgba(200, 206, 213, 0.8)');

      nodeElement.select('image')
        .style('filter', 'none');
    });
  }

  /**
   * Focuses on a specific node by member ID.
   * @param {number} memberId - The ID of the member to focus on.
   */
  focusNode(memberId: number): void {
    if (!this.svg || !this.zoomableGroup) {
      console.error('Tree visualization not initialized');
      return;
    }

    const nodes = d3.selectAll('.node');
    let targetData: any;

    nodes.each(function (d: any) {
      if (d.data.id === memberId) {
        targetData = d;
      }
    });

    if (!targetData || !this.zoom) {
      console.error('Target node not found');
      return;
    }

    const targetX = targetData.x;
    const targetY = targetData.y;
    const scale = 2;
    const translateX = -targetX * scale;
    const translateY = -targetY * scale;

    // Apply zoom transform
    this.svg
      .transition()
      .duration(750)
      .call(
        this.zoom.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(scale)
      );

    nodes.each(function (d: any) {
      const nodeElement = d3.select(this);
      const isTarget = d === targetData;

      nodeElement
        .select('circle')
        .transition()
        .duration(750)
        .attr('stroke', isTarget ? 'orange' : '#b3a2c8')
        .attr('stroke-width', isTarget ? 4 : 2);

      nodeElement
        .select('text')
        .transition()
        .duration(750)
        .style('font-weight', isTarget ? 'bold' : 'normal');
    });
  }
}
