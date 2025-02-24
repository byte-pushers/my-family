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
import { UnionsModel } from "../../models/family-tree/unions.model";
import { Person } from "../../models/family-tree/person";

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
  parents: Person[] = [];
  grandparents: Person[] = [];
  siblings: Person[] = [];
  spouse: Person[] = []; // Can only have one Person
  children: Person[] = [];
  uncles: Person[] = [];
  aunts: Person[] = [];
  cousins: Person[] = [];

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
      birthDate: new FormControl('', Validators.required),
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

  /**
   * Goes to the next step in the form process.
   */
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  // Taking people from form and populating respective PersonModel[]
  private fillPersonModelArray(fg: FormGroup, arr: Person[]): void {
    const formArray = fg.get('familyMembers') as FormArray;
    formArray.controls.forEach((control) => {
      const name = control.get('name')?.value;
      const nameArray = name.split(' ');
      const firstName = nameArray[0];
      const lastName = nameArray[1];

      // const type = control.get('type')?.value as RelationshipType;
      const type = control.get('type')?.value as string;
      let gender: string = '';
      if (type === 'Dad' || type === 'Stepdad' || type === 'Grandpa' || type === 'Brother' || type === 'Husband' || type === 'Son') {
        gender = 'Male';
      } else {
        gender = 'Female';
      }

      const birthDate = control.get('birthDate')?.value as string;

      const person: PersonModel = new PersonModel(1, firstName, lastName, new Date(birthDate), gender, false, undefined, undefined, undefined, "adminUser", new Date(), undefined, undefined);
      arr.push(person);
    });
  }

  // Add To Family button call
  addToFamilyButton(): void {
    this.fillPersonModelArray(this.parentsForm, this.parents);
    this.fillPersonModelArray(this.grandparentsForm, this.grandparents);
    this.fillPersonModelArray(this.siblingsForm, this.siblings);
    this.fillPersonModelArray(this.spouseForm, this.spouse);
    this.fillPersonModelArray(this.childrenForm, this.children);
    this.fillPersonModelArray(this.unclesForm, this.uncles);
    this.fillPersonModelArray(this.auntsForm, this.aunts);
    this.fillPersonModelArray(this.cousinsForm, this.cousins);

    const tempPeople: PersonModel[] = [];
    const tempUnions: UnionsModel = new UnionsModel(1, this.spouse.length > 0, this.spouse[0], this.children);

    // Get mainPerson from sign up page?
    const mainPerson: PersonModel = new PersonModel(1, "John", "Davis", new Date("1970-01-01"), "Male", false, this.siblings, this.parents, tempUnions, "adminUser", new Date("2024-10-16T10:00:00Z"), undefined, undefined);
    tempPeople.push(mainPerson);
    console.log("person: " + mainPerson);

    const tempFamilyTree: FamilyTreeModel = new FamilyTreeModel({
      id: 1,
      name: `The ${mainPerson.lastName} Family`,
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
