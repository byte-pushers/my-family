// loading.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'tree-loading',
    standalone: true,
    templateUrl: 'tree-loading.page.html',
    imports: [CommonModule, IonicModule]
  }
)
export class TreeLoadingPage implements OnInit {
  loadingMessages: string[] = [
    'Creating family connections...',
    'Organizing family structure...',
    'Finalizing your family tree...'
  ];
  currentMessageIndex: number = 0;
  private messageInterval: any;

  constructor(private router: Router) {}

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

  ngOnDestroy() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
  }
}
