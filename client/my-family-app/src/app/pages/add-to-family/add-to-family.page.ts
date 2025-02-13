import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RelationshipType } from "../../models/family-tree/relationship-type";
import { today } from "ionicons/icons";
import { FamilyTreeRequestPayloadModel } from "../../models/family-tree/family-tree-request.payload.model";
import { FamilyMemberFormComponent } from "../../components/family-member-form/family-member-form.component";
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import { IonicModule } from "@ionic/angular";
import { RouterLink } from "@angular/router";
import { FamilyTreeService } from '../../services/family-tree.service';
import { PersonModel } from '../../models/family-tree/person.model';
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
  parents: PersonModel[] = [];
  grandparents: PersonModel[] = [];
  siblings: PersonModel[] = [];
  spouse: PersonModel[] = []; // Need to pass in as FamilyMember for the payload
  children: PersonModel[] = [];
  uncles: PersonModel[] = [];
  aunts: PersonModel[] = [];
  cousins: PersonModel[] = [];

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

  // Taking family members from form and populating respective PersonModel[]
  private fillFamilyMemberArray(fg: FormGroup, arr: PersonModel[]): void {
    const formArray = fg.get('familyMembers') as FormArray;
    formArray.controls.forEach((control) => {
      const name = control.get('name')?.value;
      const nameArray = name.split(' ');
      const firstName = nameArray[0];
      const lastName = nameArray[1];

      // const type = control.get('type')?.value as RelationshipType;
      const type = control.get('type')?.value as string;

      const person: PersonModel = new PersonModel(1, firstName, lastName, undefined, 'Male', false, undefined, undefined, "adminUser", new Date(), undefined, undefined);
      arr.push(person);
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

  // Add To Family button call
  addToFamilyButton(): void {
    this.fillFamilyMemberArray(this.unclesForm, this.uncles);
    this.fillFamilyMemberArray(this.auntsForm, this.aunts);
    this.fillFamilyMemberArray(this.cousinsForm, this.cousins);

    /*
    const allFamilyMembers: PersonModel[] = [
      ...this.parents,
      ...this.grandparents,
      ...this.siblings,
      ...this.spouse,
      ...this.children,
      ...this.uncles,
      ...this.aunts,
      ...this.cousins
    ];*/

    // todo: fix tempSiblings -> console keeps printing wrong. take a look at toString of person and
    // todo: make sure values are stored correctly
    const tempPeople: PersonModel[] = [];
    /*const tempSiblings: PersonModel[] = [];

    const tempSibling1: PersonModel = new PersonModel(2, "Jimmy", "Davis", new Date("1970-01-01"), "Male", false, null, null, "adminUser", new Date("2024-10-16T10:00:00Z"));
    const tempSibling2: PersonModel = new PersonModel(3, "Jessica", "Davis", new Date("1970-01-01"), "Female", false, null, null, "adminUser", new Date("2024-10-16T10:00:00Z"));
    tempSiblings.push(tempSibling1, tempSibling2);
    console.log("tempSibling1: " + tempSibling1.toString());*/
    //console.log("siblings: " + tempSiblings);

    const tempPerson: PersonModel = new PersonModel(1, "John", "Davis", new Date("1970-01-01"), "Male", false, this.siblings, null, "adminUser", new Date("2024-10-16T10:00:00Z"));
    tempPeople.push(tempPerson);
    //console.log("stringify test: " + tempPerson);
    //console.log("\"people\": [" + tempPeople);
    console.log("person: " + tempPerson);

    const tempFamilyTree: FamilyTreeModel = new FamilyTreeModel({
      id: 1,
      name: `The ${tempPerson.lastName} Family`,
      people: tempPeople,
      createdBy: "adminUser",
      createdDate: new Date("2024-10-16T10:00:00Z")
    });

    const familyMemberRequestPayload: FamilyTreeRequestPayloadModel = new FamilyTreeRequestPayloadModel({
      id: 1,
      userId: 1,
      transactionId: "transaction-id-value",
      familyTree: tempFamilyTree,
      createdBy: "adminUser",
      createdDate: new Date("2024-10-16T10:00:00Z")
    })

    console.log("payload:\n" + familyMemberRequestPayload);

    /*if (this.spouse[0]) {
      familyMemberRequestPayload = new FamilyTreeRequestPayload(
        1, 'transaction-id', {} as FamilyTree
      );
    } else {
      familyMemberRequestPayload = new FamilyTreeRequestPayload(
        1, 'transaction-id', familyTree
      );
    }*/

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
