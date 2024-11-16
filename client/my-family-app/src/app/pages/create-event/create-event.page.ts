import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { EventModel } from './event.model';
import { AgendaItemModel } from './agenda-item.model';
import { AgendaItemComponent } from './agenda-item.component';
import { FileUploadComponent } from './file-upload.component';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    AgendaItemComponent,
    FileUploadComponent
  ]
})
export class CreateEventPage {
  event = new EventModel();
  imagePreview: string | null = null;
  agendaDescription: string = '';
  agendaStartTime: string = '';
  agendaEndTime: string = '';
  resetFileInput = false;
  fileName: string | null = null; // Used to store the uploaded file name


  onFileSelected(file: File | null): void {
    if (file) {
      this.fileName = file.name; // Set fileName to show the file name in the UI
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.fileName = null;
      this.imagePreview = null;
    }
  }


  addAgenda(): void {
    const newAgenda = new AgendaItemModel(this.agendaStartTime, this.agendaEndTime, this.agendaDescription);
    this.event.agendas.push(newAgenda);
    this.agendaDescription = '';
    this.agendaStartTime = '';
    this.agendaEndTime = '';
  }


  saveEvent(): void {
    console.log("Event saved:", this.event);
  }


  clearForm(): void {
    this.event = new EventModel();
    this.fileName = null;
    this.imagePreview = null;
    this.agendaDescription = '';
    this.agendaStartTime = '';
    this.agendaEndTime = '';
    this.resetFileInput = !this.resetFileInput;
  }
}
