/**
 * @file tree-loading.page.ts
 * @description This file contains the TreeLoadingPage component which displays loading messages while the family tree is being prepared.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'tree-loading',
  standalone: true,
  templateUrl: 'tree-loading.page.html',
  imports: [CommonModule, IonicModule]
})
export class TreeLoadingPage implements OnInit, OnDestroy {
  /**
   * Array of loading messages to be displayed.
   */
  loadingMessages: string[] = [
    'Creating family connections...',
    'Organizing family structure...',
    'Finalizing your family tree...'
  ];

  /**
   * Index of the current loading message being displayed.
   */
  currentMessageIndex: number = 0;

  /**
   * Interval for cycling through loading messages.
   */
  private messageInterval: any;

  constructor(private router: Router) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * Starts cycling through loading messages and sets a timeout to navigate to the family tree page.
   */
  ngOnInit() {
    // Cycle through loading messages
    this.messageInterval = setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
    }, 2000);

    // Navigate to family tree after delay
    setTimeout(() => {
      clearInterval(this.messageInterval);
      this.router.navigate(['/family-tree']);
    }, 6000); // Adjust time as needed
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Clears the message interval if it exists.
   */
  ngOnDestroy() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
  }
}
