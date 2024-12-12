import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FamilyMemberModel } from '../../models/family-tree/family-member.model';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  createOutline,
  trashOutline,
  informationCircleOutline,
  gitMergeOutline
} from 'ionicons/icons';
import {FamilyMember} from "../../models/family-tree/family-member";

@Component({
  selector: 'app-family-member-list',
  templateUrl: './family-member-list.component.html',
  styleUrls: ['./family-member-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class FamilyMemberListComponent implements OnInit {
  @Input() members: FamilyMemberModel[] = [];
  @Input() selectedMemberId?: number | null;
  @Output() memberSelected = new EventEmitter<number>();
  @Output() memberDeleted = new EventEmitter<number>();
  @Output() memberEdited = new EventEmitter<number>();

  sortOption: 'name' | 'relationship' = 'name';

  constructor() {
    // Register the Ionic icons
    addIcons({
      'people-outline': peopleOutline,
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'information-circle-outline': informationCircleOutline,
      'git-merge-outline': gitMergeOutline
    });
  }

  get sortedMembers(): FamilyMemberModel[] {
    // Create a new array before sorting to avoid mutating the input
    return [...this.members].sort((a, b) => {
      if (this.sortOption === 'name') {
        return `${a.person?.firstName || ''} ${a.person?.lastName || ''}`
          .localeCompare(`${b.person?.firstName || ''} ${b.person?.lastName || ''}`);
      }
      return (a.relationship || '').localeCompare(b.relationship || '');
    });
  }

  getInitials(member: FamilyMemberModel): string {
    if (!member.person || !member.person.firstName || !member.person.lastName) {
      return '??';
    }
    return (member.person.firstName.charAt(0) + member.person.lastName.charAt(0)).toUpperCase();
  }

  calculateAge(birthDate: Date | string | undefined): number {
    if (!birthDate) return 0;

    const bDate = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - bDate.getFullYear();
    const monthDiff = today.getMonth() - bDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bDate.getDate())) {
      age--;
    }
    return age;
  }

  onMemberClick(member: FamilyMemberModel): void {
    const id = member.getId();
    if (id != null) {
      this.memberSelected.emit(id);
    }
  }

  onEditMember(event: Event, member: FamilyMemberModel): void {
    event.stopPropagation();
    const id = member.getId();
    if (id != null) {
      this.memberEdited.emit(id);
    }
  }

  onDeleteMember(event: Event, member: FamilyMemberModel): void {
    event.stopPropagation();
    const id = member.getId();
    if (id != null) {
      this.memberDeleted.emit(id);
    }
  }

  ngOnInit(): void {
    console.log('Initial members:', this.members);
  }
}
