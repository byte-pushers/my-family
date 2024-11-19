import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { NgIf } from "@angular/common";
import { ElementRef } from "@angular/core";

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class InputBoxComponent  implements OnInit {
  @Input({required : true}) relationshipType: string = '';

  @Output() newNameEvent: EventEmitter<string> = new EventEmitter<string>();

  // Used to reset the entered name after clicking the "Add" button
  @ViewChild('newName') newName!: ElementRef;

  submitted: boolean = false;

  constructor() { }

  addNewName(name: string): void {
    this.submitted = true;

    if (!name.trim()) {
      return;
    }
    else {
      this.newNameEvent.emit(name);
      this.submitted = false;
    }
  }

  resetName(): void {
    this.newName.nativeElement.value = '';
  }

  ngOnInit() {}
}
