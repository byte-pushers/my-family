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
import { FamilyTreeModel } from "../../models/family-tree/family-tree.model";

/**
 * The AddToFamilyPage component handles the addition of family members to a family tree.
 * @author Stella Choi
 */
@Component({
  selector: 'app-add-to-family',
  templateUrl: './add-to-family.page.html',
  styleUrls: ['./add-to-family.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FamilyMemberFormComponent, FooterNavigationComponent, RouterLink],
  providers: [FamilyTreeService]
})
export class AddToFamilyPage implements OnInit {
  /**
   * A list of FamilyMemberFormComponent for easier traversal through all the forms.
   * @property {QueryList<FamilyMemberFormComponent>} viewFamilyMemberForms - QueryList of FamilyMemberFormComponent
   */
  @ViewChildren(FamilyMemberFormComponent) viewFamilyMemberForms: QueryList<FamilyMemberFormComponent> | undefined;

  /** @property {number} currentStep - The current step in the form process. */
  currentStep: number = 1; // Tracks the current step in the form process.

  /** @property {number} totalSteps - The total number of steps in the form process. */
  totalSteps: number = 3; // Total number of steps in the form process.

  /** @property {string} selectedImage - The selected crest image. */
  selectedImage: string | ArrayBuffer | null = null; // Selected crest image.

  // Reactive forms for each family relationship type.
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

  /**
   * Initializes all the form groups
   * @param {FormBuilder} fb - The form builder.
   * @param {FamilyTreeService} familyTreeService - The service for the api call.
   * @param {Router} router - The router for page changes.
   */
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

  /**
   * Navigates back to the previous step or page.
   */
  public goBack(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('add-to-family') && this.currentStep === 2) {
      this.previousStep();
    } else if (currentUrl.includes('add-to-family') && this.currentStep === 1) {
      const fromFamilyTree = sessionStorage.getItem('fromFamilyTree');
      if (fromFamilyTree === 'true') {
        this.router.navigate(['/family-tree']);
      } else {
        this.router.navigate(['/create-account']);
      }
    }
  }

  /**
   * Constructs a new reactive form group.
   * @returns {FormGroup} A new FormGroup instance.
   */
  private constructFormGroup(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      familyMembers: this.fb.array([])
    });
  }

  /**
   * Handles file upload for the crest image.
   * @param {any} event The file change event.
   */
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
      const familyMember = new FamilyMemberModel(1, type, person, 'createdBy', 'updatedBy', new Date(today), new Date(today));
      arr.push(familyMember);
    });
  }

  /**
   * Goes to the next step in the form process.
   */
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }

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
      familyMemberRequestPayload = new FamilyTreeRequestPayload(
        1, 'transaction-id', {} as FamilyTree
      );
    } else {
      familyMemberRequestPayload = new FamilyTreeRequestPayload(
        1, 'transaction-id', familyTree
      );
    }

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

    this.router.navigate(['/tree-loading']);
  }

  /**
   * Goes back to the previous step in the form process.
   */
  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  /**
   * Clears all forms and resets the crest image.
   */
  clearButton(): void {
    this.viewFamilyMemberForms?.forEach(form => form.removeAllFamilyMembers());
    if (this.selectedImage) {
      this.selectedImage = '';
    }
  }

  /**
   * Autofills forms with test data for quicker demo purposes.
   */
  autofillFormButton(): void {
    let name = 'Alejandro Quintanilla';
    let type = 'Father';
    let member = this.fb.group({
      name: new FormControl(name, Validators.required),
      type: new FormControl(type, Validators.required)
    });

    const formArray1 = this.parentsForm.get('familyMembers') as FormArray;
    formArray1.push(member);

    name = 'Alejandra Quintanilla';
    type = 'Grandma';
    member = this.fb.group({
      name: new FormControl(name, Validators.required),
      type: new FormControl(type, Validators.required)
    });

    const formArray2 = this.grandparentsForm.get('familyMembers') as FormArray;
    formArray2.push(member);

    name = 'Gabriela Quintanilla';
    type = 'Sister';
    member = this.fb.group({
      name: new FormControl(name, Validators.required),
      type: new FormControl(type, Validators.required)
    });

    const formArray3 = this.siblingsForm.get('familyMembers') as FormArray;
    formArray3.push(member);
  }

  ngOnInit() {}
}
