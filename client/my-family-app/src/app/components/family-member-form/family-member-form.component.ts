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

  constructor(private fb: FormBuilder) {
    this.addFamilyMemberForm = this.fb.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      familyMembers: this.fb.array([])
    });
  }

  get familyMembers(): FormArray {
    return this.addFamilyMemberForm.controls['familyMembers'] as FormArray;
  }

  addFamilyMember() {
    const familyMemberName = this.addFamilyMemberForm.controls['name'].value;
    const familyMemberType = this.addFamilyMemberForm.controls['type'].value;

    if (familyMemberName && familyMemberType) {
      const member = this.fb.group({
        name: new FormControl(familyMemberName, Validators.required),
        type: new FormControl(familyMemberType, Validators.required)
      });

      this.familyMembers.push(member);
    }

    this.addFamilyMemberForm.get('name')?.setValue('');
    this.addFamilyMemberForm.get('type')?.setValue('');
  }

  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }

  ngOnInit() {
  }

  removeAllFamilyMembers() {
    this.familyMembers.clear();
    this.addFamilyMemberForm.get('name')?.setValue('');
    this.addFamilyMemberForm.get('type')?.setValue('');
  }
}
