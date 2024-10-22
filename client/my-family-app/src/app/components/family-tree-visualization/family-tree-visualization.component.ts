import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as familyData from './mock-data.json';

interface FamilyNode {
  name: string;
  image?: string;
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
    const data: FamilyNode = familyData;

    const element = this.el.nativeElement.querySelector('#family-tree');
    const width = 1000;
    const height = 1000;
    const radius = Math.min(width, height) / 3 - 50;

    // Scale factors for hover effect
    const HOVER_SCALE = 1.3;
    const NEIGHBOR_SCALE = 1.15;

    const customSeparation = (a: d3.HierarchyPointNode<FamilyNode>, b: d3.HierarchyPointNode<FamilyNode>) => {
      if (a.depth === 2 && b.depth === 2) {
        return 0.3;
      } else if (a.depth === 1 && b.depth === 1) {
        return 1;
      }
      return a.parent === b.parent ? 1 : 2;
    };

    const tree = d3.tree<FamilyNode>()
      .size([2 * Math.PI, radius])
      .separation(customSeparation);

    const root = tree(
      d3.hierarchy(data)
        .sort((a, b) => d3.ascending(a.data.name, b.data.name))
    );

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .style('font', '10px sans-serif');

    const linksGroup = svg.append('g').attr('class', 'links');
    const nodesGroup = svg.append('g').attr('class', 'nodes');

    const branchingLineGenerator = (d: d3.HierarchyPointLink<FamilyNode>) => {
      const sourceX = Math.sin(d.source.x) * d.source.y;
      const sourceY = -Math.cos(d.source.x) * d.source.y;
      const targetX = Math.sin(d.target.x) * d.target.y;
      const targetY = -Math.cos(d.target.x) * d.target.y;

      if (d.source.children && d.source.children.length > 1) {
        const siblings = d.source.children;
        const midX = d3.mean(siblings, sibling => Math.sin(sibling.x) * sibling.y);
        const midY = d3.mean(siblings, sibling => -Math.cos(sibling.x) * sibling.y);

        // @ts-ignore
        const junctionX = sourceX * 0.3 + midX * 0.7;
        // @ts-ignore
        const junctionY = sourceY * 0.3 + midY * 0.7;

        return `M${targetX},${targetY} L${junctionX},${junctionY} L${sourceX},${sourceY}`;
      }

      return `M${sourceX},${sourceY}L${targetX},${targetY}`;
    };

    const links = linksGroup
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', d => d.source.depth === 0 ? 4 : 2)
      .attr('d', d => {
        const o = { x: 0, y: 0 };
        return branchingLineGenerator({
          target: o,
          source: { ...o, children: [] }
        } as any);
      })
      .style('opacity', 0);

    const node = nodesGroup
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', 'translate(0,0)')
      .style('opacity', 0);

    // Add white circular background/border
    node.append('circle')
      .attr('r', d => {
        switch (d.depth) {
          case 0: return 52;
          case 1: return 27;
          default: return 17;
        }
      })
      .attr('fill', 'white')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Add images with clip path
    node.append('image')
      .attr('xlink:href', d => d.data.image || '')
      .attr('x', d => {
        switch (d.depth) {
          case 0: return -50;
          case 1: return -25;
          default: return -15;
        }
      })
      .attr('y', d => {
        switch (d.depth) {
          case 0: return -50;
          case 1: return -25;
          default: return -15;
        }
      })
      .attr('width', d => {
        switch (d.depth) {
          case 0: return 100;
          case 1: return 50;
          default: return 30;
        }
      })
      .attr('height', d => {
        switch (d.depth) {
          case 0: return 100;
          case 1: return 50;
          default: return 30;
        }
      })
      .attr('clip-path', 'circle(49%)');

    // Add labels
    node.append('text')
      .attr('dy', d => d.depth === 0 ? 65 : 35)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name)
      .style('font-size', d => d.depth === 0 ? '14px' : '12px');

    // Helper function to get connected nodes
    const getConnectedNodes = (d: d3.HierarchyPointNode<FamilyNode>) => {
      const connected = new Set<d3.HierarchyPointNode<FamilyNode>>();
      if (d.parent) connected.add(d.parent);
      if (d.children) d.children.forEach(child => connected.add(child));
      return connected;
    };

    // Add hover interactions
    node.on('mouseover', function(event, d) {
      const hoveredNode = d3.select(this);
      const connectedNodes = getConnectedNodes(d);

      // Scale up hovered node
      hoveredNode
        .transition()
        .duration(300)
        .attr('transform', n => {
          const x = Math.sin(d.x) * d.y;
          const y = -Math.cos(d.x) * d.y;
          return `translate(${x},${y}) scale(${HOVER_SCALE})`;
        });

      // Scale up connected nodes
      node.filter(n => connectedNodes.has(n))
        .transition()
        .duration(300)
        .attr('transform', n => {
          const x = Math.sin(n.x) * n.y;
          const y = -Math.cos(n.x) * n.y;
          return `translate(${x},${y}) scale(${NEIGHBOR_SCALE})`;
        });

      // Highlight connected links
      links
        .transition()
        .duration(300)
        .style('stroke', l =>
          (l.source === d || l.target === d) ? '#666' : '#ccc'
        )
        .style('stroke-width', l =>
          (l.source === d || l.target === d) ?
            (l.source.depth === 0 ? 6 : 3) :
            (l.source.depth === 0 ? 4 : 2)
        );
    });

    // Add mouseout reset
    node.on('mouseout', function(event, d) {
      // Reset all nodes
      node
        .transition()
        .duration(300)
        .attr('transform', n => {
          const x = Math.sin(n.x) * n.y;
          const y = -Math.cos(n.x) * n.y;
          return `translate(${x},${y}) scale(1)`;
        });

      // Reset all links
      links
        .transition()
        .duration(300)
        .style('stroke', '#ccc')
        .style('stroke-width', l => l.source.depth === 0 ? 4 : 2);
    });

    // Animation sequence
    const animateTree = () => {
      links
        .transition()
        .duration(800)
        .delay(d => d.source.depth * 500)
        .style('opacity', 1)
        .attr('d', branchingLineGenerator);

      node
        .transition()
        .duration(800)
        .delay(d => d.depth * 500)
        .style('opacity', 1)
        .attr('transform', d => {
          const x = Math.sin(d.x) * d.y;
          const y = -Math.cos(d.x) * d.y;
          return `translate(${x},${y})`;
        });
    };

    setTimeout(animateTree, 300);

    const zoom = d3.zoom()
      .scaleExtent([1, 3])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });

    // @ts-ignore
    d3.select(element).select('svg').call(zoom);
  }
}
