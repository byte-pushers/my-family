import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonContent, } from "@ionic/angular/standalone";
import { NgForOf, NgIf } from '@angular/common';
import { InputBoxComponent } from "../input-box/input-box.component";

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-family-member-form',
  templateUrl: './family-member-form.component.html',
  styleUrls: ['./family-member-form.component.scss'],
  imports: [
    IonContent,
    FormsModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    InputBoxComponent
  ],
  standalone: true
})
export class FamilyMemberFormComponent implements OnInit {
  @Input({ required: true }) relationshipType: string = '';
  @Input() relationshipTypeDropdownArray: string[] = []; // For specific relation in step 2 (ex. parents -> mom, dad)
  @Input() addFamilyMemberForm: FormGroup = this.fb.group({}); // FormGroup passed in from parent to hold family members

  @ViewChild(InputBoxComponent) inputBox!: InputBoxComponent;

  submitted: boolean = false;
  tempType: string = '';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // Using relationshipType passed in from parent to use as type since step 3 doesn't have the relationshipTypeDropdownArray
    if (this.relationshipTypeDropdownArray.length == 0) {
      // Getting rid of 's' to use as type
      this.tempType = this.relationshipType.substring(0, this.relationshipType.length - 1);
    }
  }

  get familyMembers(): FormArray {
    return this.addFamilyMemberForm.controls['familyMembers'] as FormArray;
  }

  addFamilyMember(newName: string) {
    this.submitted = true;

    if (newName) {
      // Adding family members with relationship type array (Parents, Siblings, etc.)
      if (this.addFamilyMemberForm.controls['type']?.valid) {
        // If Spouse has already been added, don't add anymore
        if (this.relationshipType === 'Spouse' && this.familyMembers.length > 0) {
          console.log('Cannot have multiple spouses.');
          return;
        }

        const familyMemberType = this.addFamilyMemberForm.controls['type'].value;

        const member = this.fb.group({
          name: new FormControl(newName, Validators.required),
          type: new FormControl(familyMemberType, Validators.required)
        });

        this.familyMembers.push(member);

        this.addFamilyMemberForm.controls['type'].reset();
        this.submitted = false;
        this.inputBox?.resetName();
      }

      // Adding family members without relationship type array (Uncles, Aunts, Cousins)
      if (this.relationshipTypeDropdownArray.length == 0) {
        const member = this.fb.group({
          name: new FormControl(newName, Validators.required),
          type: new FormControl(this.tempType, Validators.required)
        });

        this.familyMembers.push(member);

        this.submitted = false;
        this.inputBox?.resetName();
      }
    }
  }

  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }

  removeAllFamilyMembers() {
    this.familyMembers.clear();

    // Resetting input boxes
    this.addFamilyMemberForm.get('name')?.setValue('');
    this.addFamilyMemberForm.get('type')?.setValue('');
  }
}
