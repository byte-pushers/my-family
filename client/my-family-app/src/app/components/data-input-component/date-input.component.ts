/**import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  template: `
    <div>
      <label class="block font-medium mb-2">{{ label }}</label>
      <input type="date" [(ngModel)]="value" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />
    </div>
  `,
  standalone: true,
  imports: [FormsModule]
})
export class DateInputComponent {
  @Input() label: string = ''; // Label for the input
  @Input() value!: string; // The actual date value bound to this component
}
**/
