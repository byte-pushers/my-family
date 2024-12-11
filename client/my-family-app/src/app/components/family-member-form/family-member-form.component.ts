import { Component, OnInit, Input } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { NgForOf, NgIf } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

/**
 * A standalone Angular component for adding and managing family members of one relationship.
 * @author Stella Choi
 */
@Component({
  selector: 'app-family-member-form',
  templateUrl: './family-member-form.component.html',
  styleUrls: ['./family-member-form.component.scss'],
  imports: [
    IonContent,
    FormsModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  standalone: true
})
export class FamilyMemberFormComponent implements OnInit {
  /**
   * Relationship type passed from the parent component.
   * Example: Parents, Grandparents, Siblings.
   * @property {string} relationshipType
   */
  @Input({ required: true }) relationshipType: string = '';

  /**
   * Array of specific relations for Parents, Grandparents, Siblings, Spouse, and Children.
   * Example: For Parents, pass in [Mom, Dad].
   * @property {string[]} relationshipTypeDropdownArray
   */
  @Input() relationshipTypeDropdownArray: string[] = [];

  /**
   * FormGroup passed in from the parent component to manage family members
   * @property {FormGroup} addFamilyMemberForm
   */
  @Input() addFamilyMemberForm: FormGroup = this.fb.group({}); // FormGroup passed in from parent to hold family members

  /**
   * Tracks whether the form has been submitted.
   * @property {boolean} submitted
   */
  submitted: boolean = false;

  /**
   * A temporary variable used to store relationship type for Uncles, Aunts, and Cousins.
   * Value will be Uncle, Aunt, or Cousin.
   * @property {string} tempType
   */
  tempType: string = '';

  /**
   * Constructor for FamilyMemberFormComponent.
   * @param {FormBuilder} fb - The FormBuilder service for managing the form and its form controls.
   */
  constructor(private fb: FormBuilder) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Sets tempType's value when no dropdown array is provided.
   */
  ngOnInit() {
    // Using relationshipType passed in from parent to use as type since step 3 doesn't have the relationshipTypeDropdownArray
    if (this.relationshipTypeDropdownArray.length == 0) {
      // Getting rid of 's' to use as type
      this.tempType = this.relationshipType.substring(0, this.relationshipType.length - 1);
    }
  }

  /**
   * Getter for the familyMembers FormArray.
   * @returns {FormArray} The form array holding all added family members.
   */
  get familyMembers(): FormArray {
    return this.addFamilyMemberForm.controls['familyMembers'] as FormArray;
  }

  /**
   * Adds a new family member to the FormArray.
   * Handles both scenarios where a relationship dropdown array is provided or not.
   */
  addFamilyMember() {
    this.submitted = true;

    // Adding members with relationshipDropdownArray
    if (this.addFamilyMemberForm.controls['name']?.valid && this.addFamilyMemberForm.controls['type']?.valid) {
      // If Spouse has already been added, don't add anymore
      if (this.relationshipType === 'Spouse' && this.familyMembers.length > 0) {
        console.log('Cannot have multiple spouses.');
        return;
      }

      const familyMemberName = this.addFamilyMemberForm.controls['name'].value;
      const familyMemberType = this.addFamilyMemberForm.controls['type'].value;

      const member = this.fb.group({
        name: new FormControl(familyMemberName, Validators.required),
        type: new FormControl(familyMemberType, Validators.required)
      });

      this.familyMembers.push(member);

      this.addFamilyMemberForm.controls['name'].reset();
      this.addFamilyMemberForm.controls['type'].reset();
      this.submitted = false;
    }

    // Adding members with no relationshipDropdownArray
    if (this.addFamilyMemberForm.controls['name']?.valid && this.relationshipTypeDropdownArray.length == 0) {
      const familyMemberName = this.addFamilyMemberForm.controls['name'].value;

      const member = this.fb.group({
        name: new FormControl(familyMemberName, Validators.required),
        type: new FormControl(this.tempType, Validators.required)
      });

      this.familyMembers.push(member);

      this.addFamilyMemberForm.controls['name'].reset();
      this.submitted = false;
    }
  }

  /**
   * Removes a family member from the FormArray by the given index.
   * @param {number} index - The index of the member from the FormArray to remove.
   */
  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }

  /**
   * Removes all family members from the FormArray and resets input fields.
   */
  removeAllFamilyMembers() {
    this.familyMembers.clear();

    this.addFamilyMemberForm.get('name')?.setValue('');
    this.addFamilyMemberForm.get('type')?.setValue('');
  }
}
