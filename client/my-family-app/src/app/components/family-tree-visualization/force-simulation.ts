// force-simulation.service.ts
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { FamilyNode } from '../../interfaces/family-node';
import { Selection } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ForceSimulation {
  setupForceSimulation(
    nodes: d3.HierarchyNode<FamilyNode>[],
    links: d3.HierarchyLink<FamilyNode>[],
    width: number,
    height: number,
    nodeElements: Selection<SVGGElement, d3.HierarchyNode<FamilyNode>, SVGGElement, unknown>,
    linkElements: Selection<SVGLineElement, d3.HierarchyLink<FamilyNode>, SVGGElement, unknown>
  ) {
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => (d as d3.HierarchyNode<FamilyNode>).data.name)
        .distance(d => {
          if (d.source.depth === 0) return 180;
          if (d.source.depth === 1) return 110;
          return 100;
        })
        .strength(0.7) // Reduced for smoother movement
      )
      .force('center', d3.forceCenter(0,0).strength(0.1))
      .force('charge', d3.forceManyBody().strength(-30)) // Reduced strength
      .force('collide', d3.forceCollide().radius(40))
      .velocityDecay(0.4) // Added velocity decay
      .alpha(0.2)
      .alphaDecay(0.02) // Slower decay for smoother movement
      .on('tick', () => this.onTick(nodeElements, linkElements));

    return simulation;
  }

  setupDragBehavior(simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) {
    let isDragging = false;

    return d3.drag<SVGGElement, d3.HierarchyNode<FamilyNode>>()
      .on('start', (event, d) => {
        isDragging = true;
        if (event.sourceEvent.type.startsWith('touch')) {
          event.sourceEvent.preventDefault();
          simulation.alphaTarget(0.1).restart(); // Lower alpha for touch
        } else {
          simulation.alphaTarget(0.3).restart();
        }
        d3.select(event.sourceEvent.target.parentNode).raise();
        (d as any).fx = d.x;
        (d as any).fy = d.y;
      })
      .on('drag', (event, d) => {
        if (!isDragging) return;

        const newX = event.x;
        const newY = event.y;

        // Smooth movement for touch events
        if (event.sourceEvent.type.startsWith('touch')) {
          const dx = newX - ((d as any).fx || d.x);
          const dy = newY - ((d as any).fy || d.y);

          (d as any).fx += dx * 0.3; // Smoothing factor
          (d as any).fy += dy * 0.3;

          simulation.alpha(0.1).restart(); // Keep simulation active but gentle
        } else {
          (d as any).fx = newX;
          (d as any).fy = newY;
        }
      })
      .on('end', (event, d) => {
        isDragging = false;
        if (!event.active) simulation.alphaTarget(0);
        if (!event.sourceEvent.type.startsWith('touch')) {
          (d as any).fx = null;
          (d as any).fy = null;
        } else {
          // For touch, gradually release the node
          setTimeout(() => {
            (d as any).fx = null;
            (d as any).fy = null;
          }, 100);
        }
      });
  }

  private onTick(
    nodeElements: Selection<SVGGElement, d3.HierarchyNode<FamilyNode>, SVGGElement, unknown>,
    linkElements: Selection<SVGLineElement, d3.HierarchyLink<FamilyNode>, SVGGElement, unknown>
  ) {
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      linkElements
        .attr('x1', d => d.source.x!)
        .attr('y1', d => d.source.y!)
        .attr('x2', d => d.target.x!)
        .attr('y2', d => d.target.y!);

      nodeElements.attr('transform', d => `translate(${d.x},${d.y})`);
    });
  }
}
