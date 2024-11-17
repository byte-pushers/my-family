// family-member-list.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FamilyMember } from '../../models/family-tree/family-member.model';
import {today} from "ionicons/icons";

@Component({
  selector: 'app-family-member-list',
  templateUrl: './family-member-list.component.html',
  styleUrls: ['./family-member-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class FamilyMemberListComponent implements OnInit {
  @Input() members: FamilyMember[] = [];
  @Input() selectedMemberId?: number;
  @Output() memberSelected = new EventEmitter<number>();
  @Output() memberDeleted = new EventEmitter<number>();
  @Output() memberEdited = new EventEmitter<number>();

  sortOption: 'name' | 'relationship' = 'name';

  get sortedMembers(): FamilyMember[] {
    return this.members.sort((a, b) => {
      if (this.sortOption === 'name') {
        return `${a.person.firstName} ${a.person.lastName}`
          .localeCompare(`${b.person.firstName} ${b.person.lastName}`);
      }
      return a.relationship.toString().localeCompare(b.relationship.toString());
    });
  }

  getInitials(member: FamilyMember): string {
    return (member.person.firstName.charAt(0) + member.person.lastName.charAt(0)).toUpperCase();
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onMemberClick(member: FamilyMember): void {
    const id = member.getId();
    if (id !== undefined) {
      this.memberSelected.emit(id);
    }
  }

  onEditMember(event: Event, memberId: number): void {
    event.stopPropagation();
    this.memberEdited.emit(memberId);
  }

  onDeleteMember(event: Event, memberId: number): void {
    event.stopPropagation();
    this.memberDeleted.emit(memberId);
  }

  ngOnInit(): void {
  }
}
