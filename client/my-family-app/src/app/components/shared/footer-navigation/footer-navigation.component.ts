import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";

type TabName = 'home' | 'family' | 'profile' | 'chat';

@Component({
  selector: 'app-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  styleUrls: ['./footer-navigation.component.scss'],
  imports: [
    IonicModule,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  standalone: true
})
export class FooterNavigationComponent implements OnInit {
  /** Currently selected tab */
  selectedTab: TabName = 'home';

  /** Map of routes to tab names for route matching */
  private readonly routeTabMap: Record<string, TabName> = {
    'home': 'home',
    'family-tree': 'family',
    'profile': 'profile',
    'chat': 'chat'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial selected tab based on current route
    const currentPath = this.router.url;
    this.setInitialTab(currentPath);
  }

  /**
   * Sets the initially selected tab based on the current route
   * @param path - Current router path
   */
  private setInitialTab(path: string): void {
    // Strip leading slash and any child routes
    const baseRoute = path.split('/')[1] || 'home';
    this.selectedTab = this.routeTabMap[baseRoute] || 'home';
  }

  /**
   * Handles tab selection
   * @param tabName - Name of the selected tab
   */
  selectTab(tabName: TabName): void {
    this.selectedTab = tabName;
  }
}
