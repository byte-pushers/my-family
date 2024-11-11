import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FamilyMember } from "../../models/family-member.model";
import { RelationshipType } from "../../models/relationship-type";
import { Person } from "../../models/person";
import { today } from "ionicons/icons";
import { FamilyTreeRequestPayload } from "../../models/family-tree-request.payload";
import { FamilyMemberFormComponent } from "../../components/family-member-form/family-member-form.component";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { IonicModule } from "@ionic/angular";
import { RouterLink } from "@angular/router";
import { FamilyTreeService } from '../../services/family-tree.service';

@Component({
  selector: 'app-add-to-family',
  templateUrl: './add-to-family.page.html',
  styleUrls: ['./add-to-family.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FamilyMemberFormComponent, FooterNavigationComponent, RouterLink],
  providers: [FamilyTreeService]
})
export class AddToFamilyPage implements OnInit {
  @ViewChildren(FamilyMemberFormComponent) viewFamilyMemberForms: QueryList<FamilyMemberFormComponent> | undefined;

  currentStep: number = 1; // Step 2; decreased by 1 because of indexing in the *ngFor
  totalSteps: number = 3;
  selectedImage: string | ArrayBuffer | null = null;

  // FormGroup that is passed into child component
  parentsForm: FormGroup;
  grandparentsForm: FormGroup;
  siblingsForm: FormGroup;
  spouseForm: FormGroup;
  childrenForm: FormGroup;
  unclesForm: FormGroup;
  auntsForm: FormGroup;
  cousinsForm: FormGroup;

  // Array of FamilyMember's to pass in to the FamilyTreeRequestPayload
  parents: FamilyMember[] = [];
  grandparents: FamilyMember[] = [];
  siblings: FamilyMember[] = [];
  spouse: FamilyMember[] = []; // Need to pass in as FamilyMember for the payload
  children: FamilyMember[] = [];
  uncles: FamilyMember[] = [];
  aunts: FamilyMember[] = [];
  cousins: FamilyMember[] = [];

  constructor(private fb: FormBuilder, private familyTreeService: FamilyTreeService) {
    this.parentsForm = this.constructFormGroup();
    this.grandparentsForm = this.constructFormGroup();
    this.siblingsForm = this.constructFormGroup();
    this.spouseForm = this.constructFormGroup();
    this.childrenForm = this.constructFormGroup();
    this.unclesForm = this.constructFormGroup();
    this.auntsForm = this.constructFormGroup();
    this.cousinsForm = this.constructFormGroup();
  }

  // Created this method to prevent constructor being super long
  private constructFormGroup(): FormGroup {
    return this.fb.group({
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

  // Taking family members from form and populating respective FamilyMember[]
  private fillFamilyMemberArray(fg: FormGroup, arr: FamilyMember[]): void {
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

  // Next button
  nextStep(): void {
    // Increment currentStep to show step 3
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }

    // Saving added family members from step 2 into their respective FamilyMember[]
    this.fillFamilyMemberArray(this.parentsForm, this.parents);
    this.fillFamilyMemberArray(this.grandparentsForm, this.grandparents);
    this.fillFamilyMemberArray(this.siblingsForm, this.siblings);
    this.fillFamilyMemberArray(this.spouseForm, this.spouse);
    this.fillFamilyMemberArray(this.childrenForm, this.children);

    console.log(`parents: ${this.parents}`);
    console.log(`grandparents: ${this.grandparents}`);
    console.log(`siblings: ${this.siblings}`);
    console.log(`spouse: ${this.spouse}`);
    console.log(`children: ${this.children}`);
  }

  // todo: make request payload here
  // todo: http post
  // Add To Family button call
  addToFamilyButton(): void {
    this.fillFamilyMemberArray(this.unclesForm, this.uncles);
    this.fillFamilyMemberArray(this.auntsForm, this.aunts);
    this.fillFamilyMemberArray(this.cousinsForm, this.cousins);
    console.log(`uncles: ${this.uncles}`);
    console.log(`aunts: ${this.aunts}`);
    console.log(`cousins: ${this.cousins}`);

    let familyMemberRequestPayload: FamilyTreeRequestPayload;
    if (this.spouse[0]) {
      console.log(`spouse[0] = ${this.spouse[0]}`);
      familyMemberRequestPayload = new FamilyTreeRequestPayload(
        this.parents, this.grandparents, this.siblings, this.spouse[0]!, this.children,
        this.uncles, this.aunts, this.cousins
      );
    } else {
      familyMemberRequestPayload = new FamilyTreeRequestPayload(
        this.parents, this.grandparents, this.siblings, null, this.children,
        this.uncles, this.aunts, this.cousins
      );
    }
    this.familyTreeService.create(familyMemberRequestPayload).subscribe(response => {
      console.log('Add To Family successful.', response);
    })
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Clear button call
  clearButton(): void {
    // Resetting all the forms
    this.viewFamilyMemberForms?.forEach(form => form.removeAllFamilyMembers());

    // Resetting crest image for step 3
    if(this.selectedImage) {
      this.selectedImage = '';
    }
  }

  ngOnInit() {
  }
}
