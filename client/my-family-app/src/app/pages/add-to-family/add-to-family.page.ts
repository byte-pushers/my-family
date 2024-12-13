import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FamilyMemberModel } from "../../models/family-tree/family-member.model";
import { RelationshipType } from "../../models/family-tree/relationship-type";
import { Person } from "../../models/family-tree/person";
import { today } from "ionicons/icons";
import { FamilyTreeRequestPayload } from "../../models/family-tree/family-tree-request.payload";
import { FamilyMemberFormComponent } from "../../components/family-member-form/family-member-form.component";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { IonicModule } from "@ionic/angular";
import { RouterLink } from "@angular/router";
import { FamilyTreeService } from '../../services/family-tree.service';
import { PersonModel } from '../../models/family-tree/person.model';
import { FamilyTree } from '../../models/family-tree/family-tree';
import {FamilyTreeModel} from "../../models/family-tree/family-tree.model";

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
  parents: FamilyMemberModel[] = [];
  grandparents: FamilyMemberModel[] = [];
  siblings: FamilyMemberModel[] = [];
  spouse: FamilyMemberModel[] = []; // Need to pass in as FamilyMember for the payload
  children: FamilyMemberModel[] = [];
  uncles: FamilyMemberModel[] = [];
  aunts: FamilyMemberModel[] = [];
  cousins: FamilyMemberModel[] = [];

  previousUrl: string = '';

  constructor(private fb: FormBuilder, private familyTreeService: FamilyTreeService, private router: Router) {
    this.parentsForm = this.constructFormGroup();
    this.grandparentsForm = this.constructFormGroup();
    this.siblingsForm = this.constructFormGroup();
    this.spouseForm = this.constructFormGroup();
    this.childrenForm = this.constructFormGroup();
    this.unclesForm = this.constructFormGroup();
    this.auntsForm = this.constructFormGroup();
    this.cousinsForm = this.constructFormGroup();
  }

  public goBack(): void {
    const currentUrl = this.router.url;

    // If we came from family tree page
    if (currentUrl.includes('add-to-family') && this.currentStep === 2) {
      // If on step 3, go back to step 2
      this.previousStep();
    } else if (currentUrl.includes('add-to-family') && this.currentStep === 1) {
      // If on step 2, check if we should go to family-tree or create-account
      const fromFamilyTree = sessionStorage.getItem('fromFamilyTree');
      if (fromFamilyTree === 'true') {
        this.router.navigate(['/family-tree']);
      } else {
        this.router.navigate(['/create-account']);
      }
    }
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
  private fillFamilyMemberArray(fg: FormGroup, arr: FamilyMemberModel[]): void {
    const formArray = fg.get('familyMembers') as FormArray;
    formArray.controls.forEach((control) => {
      const name = control.get('name')?.value;
      const type = control.get('type')?.value as RelationshipType;

      const parsedName = name.split(' ');
      let firstName = parsedName[0];
      let lastName = parsedName[1];

      const person: Person = new PersonModel(1, firstName, lastName, new Date('2015-03-25'), 'male', false, [], "system", new Date(), undefined, undefined);
      const familyMember = new FamilyMemberModel(1, type, person, 'createdBy', new Date(today), 'updatedBy', new Date(today));
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
  }

  // todo: Update based on new FamilyTreeRequestPayload variables
  // Add To Family button call
  addToFamilyButton(): void {
    this.fillFamilyMemberArray(this.unclesForm, this.uncles);
    this.fillFamilyMemberArray(this.auntsForm, this.aunts);
    this.fillFamilyMemberArray(this.cousinsForm, this.cousins);

    const allFamilyMembers: FamilyMemberModel[] = [
      ...this.parents,
      ...this.grandparents,
      ...this.siblings,
      ...this.spouse,
      ...this.children,
      ...this.uncles,
      ...this.aunts,
      ...this.cousins
    ];
    let familyMemberRequestPayload: FamilyTreeRequestPayload;
    const familyTree: FamilyTreeModel = new FamilyTreeModel({
      familyMembers: allFamilyMembers
    });

    if (this.spouse[0]) {
      console.log(`spouse[0] = ${this.spouse[0]}`);
      familyMemberRequestPayload = new FamilyTreeRequestPayload(
        1, 'transaction-id', {} as FamilyTree
      );
    } else {
      familyMemberRequestPayload = new FamilyTreeRequestPayload(
        1, 'transaction-id', familyTree
      );
    }
    // Try to save data
    this.familyTreeService.create(familyMemberRequestPayload).subscribe({
      next: (response) => {
        console.log('Add To Family successful.', response);
      },
      error: (error) => {
        console.error('Error creating family tree:', error);
      },
      complete: () => {
        this.router.navigate(['/tree-loading']);
      }
    });

    // immediate navigation regardless of API:
    this.router.navigate(['/tree-loading']);
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
