import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {FooterNavigationComponent} from "../../components/shared/footer-navigation/footer-navigation.component";


class ChatThread {
}

class ChatService {
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterNavigationComponent]
})
export class ChatPage {

/*  chatThreads: ChatThread[] = [];
  selectedThread?: ChatThread;
  searchTerm = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadChatThreads();
  }

  private loadChatThreads() {
    // Will implement chat thread loading
  }

  selectThread(thread: ChatThread) {
    this.selectedThread = thread;
  }

  backToList() {
    this.selectedThread = undefined;
  }

  handleSearch(event: any) {
    this.searchTerm = event.detail.value;
    // Will implement search filtering
  }*/
}
