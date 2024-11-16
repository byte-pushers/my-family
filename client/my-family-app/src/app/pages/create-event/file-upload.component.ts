import { Component, ElementRef, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-file-upload',
  template: `
    <div class="upload-section" (click)="triggerFileInput()">
      <input #fileInput type="file" (change)="onFileSelected($event)" hidden />
      <p *ngIf="fileName">{{ fileName }}</p>
      <p *ngIf="!fileName">Click here to upload image</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule] // Import CommonModule for *ngIf directive
})
export class FileUploadComponent implements OnChanges {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @Output() fileSelected = new EventEmitter<File | null>();


  @Input() reset = false; // Define `reset` as an input
  fileName: string | null = null;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] && changes['reset'].currentValue) {
      this.clearFile(); // Reset the file input when `reset` is triggered
    }
  }


  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.fileSelected.emit(file);
    } else {
      this.fileSelected.emit(null);
    }
  }


  clearFile(): void {
    this.fileInput.nativeElement.value = ''; // Clear file input
    this.fileName = null;
  }
}



