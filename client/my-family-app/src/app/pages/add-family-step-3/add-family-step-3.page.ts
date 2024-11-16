import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FamilyMemberFormComponent } from "../../components/family-member-form/family-member-form.component";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { AlertController } from "@ionic/angular/standalone";
import { RouterLink } from "@angular/router";
import { FamilyMember } from "../../models/family-member.model";
import { Person } from "../../models/person";
import { RelationshipType } from "../../models/relationship-type";
import { FamilyTreeRequestPayload } from "../../models/family-tree-request.payload";
import { today } from "ionicons/icons";

@Component({
  selector: 'app-add-family-step-3',
  templateUrl: './add-family-step-3.page.html',
  styleUrls: ['./add-family-step-3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FamilyMemberFormComponent, FooterNavigationComponent, RouterLink]
})

export class AddFamilyStep3Page implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;

  unclesForm: FormGroup;
  auntsForm: FormGroup;
  cousinsForm: FormGroup;

  // Array of FamilyMember's to pass in the FamilyTreeRequestPayload
  uncles: FamilyMember[] = [];
  aunts: FamilyMember[] = [];
  cousins: FamilyMember[] = [];

  @ViewChildren(FamilyMemberFormComponent) viewFamilyMemberForms: QueryList<FamilyMemberFormComponent> | undefined;

  constructor(private fb: FormBuilder) {
    this.unclesForm = this.fb.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      familyMembers: this.fb.array([])
    });

    this.auntsForm = this.fb.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      familyMembers: this.fb.array([])
    });

    this.cousinsForm = this.fb.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      familyMembers: this.fb.array([])
    });
  }

  // Uploading Crest image from user's file explorer
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
    this.viewFamilyMemberForms?.forEach(form => form.removeAllFamilyMembers());
    this.selectedImage = '';
  }

  // Taking family members from form and populating respective FamilyMember[]
  fillFamilyMemberArray(fg: FormGroup, arr: FamilyMember[]): void {
    const formArray = fg.get('familyMembers') as FormArray;
    formArray.controls.forEach((control) => {
      const name = control.get('name')?.value;
      const type = control.get('type')?.value as RelationshipType;

      const parsedName = name.split(' ');
      let firstName = parsedName[0];
      let lastName = parsedName[1];

      const person = new Person(1, firstName, lastName, new Date(1 / 2001));
      const familyMember = new FamilyMember(1, type, person, 'createdBy', 'updatedBy', new Date(today), new Date(today));
      arr.push(familyMember);
    });
  }

  // Add To Family button call
  addToFamily(): void {
    this.fillFamilyMemberArray(this.unclesForm, this.uncles);
    this.fillFamilyMemberArray(this.auntsForm, this.aunts);
    this.fillFamilyMemberArray(this.cousinsForm, this.cousins);
    console.log(this.uncles);
    console.log(this.aunts);
    console.log(this.cousins);
    // route next page
  }

  ngOnInit() {
  }

  protected readonly FormGroup = FormGroup;
}
