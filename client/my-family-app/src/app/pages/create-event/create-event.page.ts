import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { EventService } from '../../services/event.service';
import { EventModel } from '../../models/event.model';
import { AgendaItemModel } from './agenda-item.model';
import { AgendaItemComponent } from '../../components/agenda-item-component/agenda-item.component';
import { FileUploadComponent } from '../../components/file-upload-component/file-upload.component';
import { Event } from '../../models/event';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {IonicModule} from "@ionic/angular";


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
        FileUploadComponent,
        IonicModule
    ]
})
export class CreateEventPage {
  event: EventModel = new EventModel();
  imagePreview: string | null = null;
  agendaDescription: string = '';
  agendaStartTime: string = '';
  agendaEndTime: string = '';
  resetFileInput = false;
  fileName: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(private eventService: EventService) {}


  onFileSelected(file: File | null): void {
    if (file) {
      this.fileName = file.name;
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
    const newAgenda = new AgendaItemModel('null', new Date(this.agendaStartTime), new Date(this.agendaEndTime), this.agendaDescription);
    this.event.agendas?.push(newAgenda);
    this.agendaDescription = '';
    this.agendaStartTime = '';
    this.agendaEndTime = '';
  }


  saveEvent(): void {
    this.eventService.saveEvent(this.event as Event)
      .pipe(
        catchError(error => {
          console.error("Error saving event:", error);
          this.errorMessage = "Failed to save the event. Please try again.";
          this.successMessage = null;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);  // 3 seconds
          return of(null);  // Return a safe observable
        })
      )
      .subscribe(response => {
        if (response) {
          console.log("Event saved successfully:", response);
          this.successMessage = "Event saved successfully!";
          this.errorMessage = null;  // Clear previous error messages
          this.clearForm();  // Clear the form
        }
      });
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



