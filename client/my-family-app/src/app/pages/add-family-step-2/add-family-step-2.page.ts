import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FamilyMemberFormComponent } from "../../components/family-member-form/family-member-form.component";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { AlertController } from "@ionic/angular/standalone";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-add-family-step-2',
  templateUrl: './add-family-step-2.page.html',
  styleUrls: ['./add-family-step-2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FamilyMemberFormComponent, FooterNavigationComponent, RouterLink]
})
export class AddFamilyStep2Page implements OnInit {
  @ViewChildren(FamilyMemberFormComponent) viewChildren: QueryList<FamilyMemberFormComponent> | undefined;

  constructor(public alertCtrl: AlertController) {
  }

  // Clear button call
  clearPage(): void {
    // loop through each form component and call clear method?
    this.viewChildren?.forEach(form => form.removeAllFamilyMembers());
  }

  // TODO: change to "Next" button
  // Add To Family button call
  next(): void {


    /*for (let i = 0; i < this.cousinsList.length; i++) {
      const person = new Person(this.cousinsList[i], 'lastNameFiller', 7);
      const familyMember = new FamilyMember('nameType', 'Cousin', person);
    }
    for (let i = 0; i < this.unclesList.length; i++) {
      const person = new Person(this.unclesList[i], 'lastNameFiller', 7);
      const familyMember = new FamilyMember('nameType', 'Uncle', person);
    }
    for (let i = 0; i < this.auntsList.length; i++) {
      const person = new Person(this.auntsList[i], 'lastNameFiller', 7);
      const familyMember = new FamilyMember('nameType', 'Aunt', person);
    }*/

    // route next page
  }

  ngOnInit() {
  }
}
