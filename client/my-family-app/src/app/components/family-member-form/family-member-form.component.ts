import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, IonContent, } from "@ionic/angular/standalone";
import { CommonModule, NgForOf, NgIf } from '@angular/common';
//import { FamilyMember, Person } from "./../../models/family-member.model"
import {FormGroup, FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-family-member-form',
  templateUrl: './family-member-form.component.html',
  styleUrls: ['./family-member-form.component.scss'],
  imports: [
    IonContent,
    FormsModule,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class FamilyMemberFormComponent implements OnInit {
  @Input({ required: true }) relationshipType: string = '';
  @Input() relationshipTypeDropdownArray: string[] = [];
  @Input() familyMemberForm: NgForm | undefined;

  familyMemberName: string = '';
  familyMemberList: Array<string> = [];
  specificRelationshipType: string = '';


  constructor(public alertCtrl: AlertController) {

  }

  async addNewFamilyMember(name: string, type: string) {
    if (name && type) {
      /*new Person('firstName', 'lastname', 13, )
      new FamilyMember(this.relationshipType,)
      this.familyMemberList.push({});*/
      //this.newFamilyMember.emit(value);

      //this.cousinsList.push({name: this.cousinName});
      this.familyMemberList.push(`${name} (${type})`);
      this.clearFields(); // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please enter a name and select the specific relation",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  removeFamilyMember(index: number) {
    this.familyMemberList.splice(index, 1);
  }

  removeAllFamilyMembers() {
    this.familyMemberList = [];
  }

  clearFields() {
    this.familyMemberName = '';
    this.specificRelationshipType = '';
  }

  ngOnInit() {}
}
