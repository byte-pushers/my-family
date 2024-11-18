// new-message.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  relation: string;
}

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.page.html',
  styleUrls: ['./new-message.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewMessagePage {
  searchTerm = '';
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
  ];
  filteredContacts: Contact[] = this.contacts;

  constructor(private router: Router) {}

  filterContacts() {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.relation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectContact(contact: Contact) {
    this.router.navigate(['/chat'], { queryParams: { contactId: contact.id }});
  }

  cancel() {
    this.router.navigate(['/chat']);
  }
}
