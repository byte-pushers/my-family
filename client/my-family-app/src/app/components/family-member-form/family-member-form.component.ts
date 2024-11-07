import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonContent, } from "@ionic/angular/standalone";
import { NgForOf, NgIf } from '@angular/common';
//import { FamilyMember, Person } from "./../../models/family-member.model"
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
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
    ReactiveFormsModule
  ],
  standalone: true
})
export class FamilyMemberFormComponent implements OnInit {
  @Input({ required: true }) relationshipType: string = ''; // Title
  @Input() relationshipTypeDropdownArray: string[] = [];
  @Input() familyMemberForm: NgForm | undefined;

  submitted: boolean = false;
  addFamilyMemberForm: FormGroup;

  tempType: string = '';

  constructor(private fb: FormBuilder) {
    this.addFamilyMemberForm = this.fb.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      familyMembers: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.relationshipTypeDropdownArray.length == 0) {
      // Getting rid of 's' to use as type
      this.tempType = this.relationshipType.substring(0, this.relationshipType.length - 1);
    }
  }

  get familyMembers(): FormArray {
    return this.addFamilyMemberForm.controls['familyMembers'] as FormArray;
  }

  addFamilyMember() {
    this.submitted = true;

    // Adding members with relationshipDropdownArray
    if (this.addFamilyMemberForm.controls['name']?.valid && this.addFamilyMemberForm.controls['type']?.valid) {
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

  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }

  removeAllFamilyMembers() {
    this.familyMembers.clear();
    this.addFamilyMemberForm.get('name')?.setValue('');
    this.addFamilyMemberForm.get('type')?.setValue('');
  }
}
