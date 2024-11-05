import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FamilyMemberFormComponent} from "../../components/family-member-form/family-member-form.component";
import {FooterNavigationComponent} from "../../components/shared/footer-navigation/footer-navigation.component";
import {AlertController} from "@ionic/angular/standalone";

// import { FamilyMemberModel } from '../models/family-member'

@Component({
  selector: 'app-add-family-step-3',
  templateUrl: './add-family-step-3.page.html',
  styleUrls: ['./add-family-step-3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FamilyMemberFormComponent, FooterNavigationComponent]
})

export class AddFamilyStep3Page implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;

  @ViewChildren(FamilyMemberFormComponent) viewChildren: QueryList<FamilyMemberFormComponent> | undefined;
  parentsForm: NgForm | undefined;
  grandparentsForm: NgForm | undefined;
  siblingsForm: NgForm | undefined;
  spouseForm: NgForm | undefined;
  childrenForm: NgForm | undefined;
  unclesForm: NgForm | undefined;

  constructor(public alertCtrl: AlertController) {
  }

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Clear button call
  clearPage(): void {
    // loop through each form component and call clear method?
    this.viewChildren?.forEach(form => form.removeAllFamilyMembers());
  }

  // Add To Family button call
  addToFamily(): void {
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

  protected readonly FamilyMemberFormComponent = FamilyMemberFormComponent;
}
