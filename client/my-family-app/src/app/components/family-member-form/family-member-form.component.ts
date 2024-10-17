import { Component, OnInit, Input } from '@angular/core';
import { AlertController, IonContent, } from "@ionic/angular/standalone";
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { FamilyMember } from "./../../models/family-member.model"
import { FormGroup, FormsModule } from "@angular/forms";

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
  relationshipType: string = 'cousin';
  //familyMemberForm: FormGroup;

  cousinName: string = '';
  cousinsList: Array<{name: string}> = [];
  cousinType: string = '';

  constructor(public alertCtrl: AlertController) {

  }

  async getCousins(event: Event){
    if (this.cousinName) {
      this.cousinsList.push({name: this.cousinName});
      this.clearFields('cousin');  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in cousin name",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  removeCousin(index: number) {
    this.cousinsList.splice(index, 1);
  }

  clearFields(familyType: string) {
    if (familyType=='cousin') {
      this.cousinName = '';
    }
  }

  ngOnInit() {}
}
