/**
 * @file family-member.page.ts
 * @description This file contains the FamilyMemberPage component which handles displaying and managing family member details.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from "../../../components/shared/search-bar/search-bar.component";
import { FooterNavigationComponent } from "../../../components/shared/footer-navigation/footer-navigation.component";

interface FamilyMember {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  isAlive: boolean;
  profileImage?: string;
  birthDate: Date;
  dateOfPassing?: Date;
  relationship: string;
  spouse?: string;
  parents: {
    mother: string;
    father: string;
  };
  siblings: string[];
}

@Component({
  selector: 'app-family-member',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SearchBarComponent,
    FooterNavigationComponent
  ],
  templateUrl: './family-member.page.html'
})
export class FamilyMemberPage implements OnInit {
  /**
   * The family member details.
   */
  familyMember: FamilyMember = {
    id: 0,
    firstName: '',
    lastName: '',
    isAlive: true,
    birthDate: new Date(),
    relationship: '',
    parents: {
      mother: '',
      father: ''
    },
    siblings: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Subscribes to route parameters and loads the family member details.
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadFamilyMember(params['id']);
      }
    });
  }

  /**
   * Loads the family member details based on the given ID.
   * @param {number} id - The ID of the family member to load.
   */
  loadFamilyMember(id: number) {
    // Mock data for different family members
    const familyMembers = {
      1: {
        id: 1,
        firstName: 'Julia',
        lastName: 'Harris',
        nickname: 'Marge',
        isAlive: true,
        profileImage: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        birthDate: new Date('1994-10-03'),
        relationship: 'Sister',
        spouse: 'Jordan Mathew Harris',
        parents: {
          mother: 'Margaret Annabelle Lastname',
          father: 'Johnathan Peters Lastname'
        },
        siblings: ['Alejandro Lastname', 'Adam Savage Lastname']
      },
      2: {
        id: 2,
        firstName: 'Julia',
        lastName: 'Harris',
        nickname: 'Gabby',
        isAlive: false,
        profileImage: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        birthDate: new Date('1994-10-03'),
        dateOfPassing: new Date('2023-05-15'),
        relationship: 'Sister',
        spouse: 'Jordan Mathew Harris',
        parents: {
          mother: 'Margaret Annabelle Lastname',
          father: 'Johnathan Peters Lastname'
        },
        siblings: ['Alejandro Lastname', 'Adam Savage Lastname']
      }
    };

    // @ts-ignore
    this.familyMember = familyMembers[id] || familyMembers[1];
  }

  /**
   * Handles the search event.
   * @param {any} event - The event object containing the search term.
   */
  handleSearch(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    console.log('Searching:', searchTerm);
  }

  /**
   * Toggles the visibility of filters.
   */
  toggleFilters() {
    console.log('Toggling filters');
  }

  /**
   * Navigates to the family tree page.
   */
  viewFamilyTree() {
    this.router.navigate(['/family-tree'], {
      queryParams: { memberId: this.familyMember.id }
    });
  }

  /**
   * Navigates to the edit family member page.
   */
  editMember() {
    this.router.navigate(['/edit-family-member', this.familyMember.id]);
  }

  /**
   * Gets the full name of the family member.
   * @returns {string} The full name of the family member.
   */
  getFullName(): string {
    return `${this.familyMember.firstName} ${this.familyMember.lastName}`;
  }
}
