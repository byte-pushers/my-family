/**
 * @file new-message.page.ts
 * @description This file contains the NewMessagePage component which allows users to search and select contacts to start a new chat message.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Interface representing a contact.
 */
interface Contact {
  id: string;       // Unique identifier for the contact
  name: string;     // Name of the contact
  avatar: string;   // URL to the contact's avatar image
  relation: string; // Relation of the contact to the user
}

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.page.html',
  styleUrls: ['./new-message.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewMessagePage {
  searchTerm = ''; // Search term for filtering contacts
  contacts: Contact[] = [
    {
      id: '1',
      name: 'Mami Chava',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      relation: 'Grandmother'
    },
    {
      id: '2',
      name: 'Macerlino Vialsenor',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      relation: 'Grandfather'
    },
    {
      id: '3',
      name: 'Alejandra Quintanilla',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      relation: 'Mom'
    },
    {
      id: '4',
      name: 'Daniel Quintanilla',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      relation: 'Dad'
    }
  ]; // List of contacts
  filteredContacts: Contact[] = this.contacts; // Filtered list of contacts based on the search term

  constructor(private router: Router) {}

  /**
   * Filters the contacts based on the search term.
   */
  filterContacts() {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.relation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /**
   * Navigates to the chat page with the selected contact's ID.
   * @param {Contact} contact - The selected contact.
   */
  selectContact(contact: Contact) {
    this.router.navigate(['/chat'], { queryParams: { contactId: contact.id }});
  }

  /**
   * Cancels the new message creation and navigates back to the chat page.
   */
  cancel() {
    this.router.navigate(['/chat']);
  }
}
