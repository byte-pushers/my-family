// chat.page.ts
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';
import { FooterNavigationComponent } from "../../components/shared/footer-navigation/footer-navigation.component";
import {RouterLink} from "@angular/router";

interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'other';
}

interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterNavigationComponent, RouterLink]
})
export class ChatPage {
  @ViewChild(IonContent) content?: IonContent;

  selectedThread?: ChatThread;
  newMessage: string | undefined = '';

  // Mock data
  mockThreads: ChatThread[] = [
    {
      id: '1',
      name: 'Mom',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      lastMessage: 'I am super excited about the get together this weekend.',
      lastMessageTime: '10:30 AM',
      messages: [
        {
          id: '1',
          content: 'Hi sweetie, how are you?',
          timestamp: new Date(2024, 2, 18, 10, 25),
          sender: 'other'
        },
        {
          id: '2',
          content: 'I am super excited about the get together this weekend.',
          timestamp: new Date(2024, 2, 18, 10, 30),
          sender: 'other'
        }
      ]
    },
    {
      id: '2',
      name: 'Dad',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      lastMessage: 'Can you help set up the BBQ when you get here?',
      lastMessageTime: '9:45 AM',
      messages: [
        {
          id: '1',
          content: 'When are you planning to arrive?',
          timestamp: new Date(2024, 2, 18, 9, 30),
          sender: 'other'
        },
        {
          id: '2',
          content: 'Around 2 PM',
          timestamp: new Date(2024, 2, 18, 9, 35),
          sender: 'user'
        },
        {
          id: '3',
          content: 'Perfect, can you help set up the BBQ when you get here?',
          timestamp: new Date(2024, 2, 18, 9, 45),
          sender: 'other'
        }
      ]
    },
    {
      id: '3',
      name: 'Grandmother',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      lastMessage: 'Did you receive the family recipe I sent?',
      lastMessageTime: 'Yesterday',
      messages: [
        {
          id: '1',
          content: 'I found your grandfather\'s old recipe book',
          timestamp: new Date(2024, 2, 17, 15, 20),
          sender: 'other'
        },
        {
          id: '2',
          content: 'Did you receive the family recipe I sent?',
          timestamp: new Date(2024, 2, 17, 15, 30),
          sender: 'other'
        }
      ]
    },
    {
      id: '4',
      name: 'Sister Sarah',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      lastMessage: 'Are you bringing your famous apple pie? 🥧',
      lastMessageTime: 'Yesterday',
      messages: [
        {
          id: '1',
          content: 'Hey! What are you bringing to the reunion?',
          timestamp: new Date(2024, 2, 17, 14, 15),
          sender: 'other'
        },
        {
          id: '2',
          content: 'I was thinking about making a pie',
          timestamp: new Date(2024, 2, 17, 14, 20),
          sender: 'user'
        },
        {
          id: '3',
          content: 'Are you bringing your famous apple pie? 🥧',
          timestamp: new Date(2024, 2, 17, 14, 25),
          sender: 'other'
        }
      ]
    },
    {
      id: '5',
      name: 'Uncle John',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      lastMessage: 'Looking forward to showing you the new family photos!',
      lastMessageTime: '2 days ago',
      messages: [
        {
          id: '1',
          content: 'I digitized all our old family photos',
          timestamp: new Date(2024, 2, 16, 11, 0),
          sender: 'other'
        },
        {
          id: '2',
          content: 'That\'s amazing! How many did you find?',
          timestamp: new Date(2024, 2, 16, 11, 5),
          sender: 'user'
        },
        {
          id: '3',
          content: 'Over 200! Looking forward to showing you the new family photos!',
          timestamp: new Date(2024, 2, 16, 11, 10),
          sender: 'other'
        }
      ]
    },
    {
      id: '6',
      name: 'Cousin Mike',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      lastMessage: 'Count me in for the basketball game! 🏀',
      lastMessageTime: '3 days ago',
      messages: [
        {
          id: '1',
          content: 'Are we doing the traditional family basketball game?',
          timestamp: new Date(2024, 2, 15, 16, 30),
          sender: 'other'
        },
        {
          id: '2',
          content: 'You know it! Saturday afternoon, same as always',
          timestamp: new Date(2024, 2, 15, 16, 35),
          sender: 'user'
        },
        {
          id: '3',
          content: 'Count me in for the basketball game! 🏀',
          timestamp: new Date(2024, 2, 15, 16, 40),
          sender: 'other'
        }
      ]
    }
  ];

  selectThread(thread: ChatThread) {
    this.selectedThread = thread;
    // Scroll to bottom when opening thread
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }
  searchTerm = '';
  filteredThreads: ChatThread[] = [];

  constructor() {
    // Initialize filteredThreads with all threads
    this.filteredThreads = this.mockThreads;
  }
  getMatchingMessagesCount(thread: ChatThread): number {
    if (!this.searchTerm) return 0;

    return thread.messages.filter(message =>
      message.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;
  }

  hasMatchingMessages(thread: ChatThread): boolean {
    return this.getMatchingMessagesCount(thread) > 0;
  }
  handleSearch(event: any) {
    const searchText = event.target.value.toLowerCase().trim();
    this.searchTerm = searchText;

    if (!searchText) {
      this.filteredThreads = this.mockThreads;
      return;
    }

    this.filteredThreads = this.mockThreads.filter(thread => {
      // Search in thread name
      const nameMatch = thread.name.toLowerCase().includes(searchText);

      // Search in last message
      const lastMessageMatch = thread.lastMessage.toLowerCase().includes(searchText);

      // Search in all messages
      const messagesMatch = thread.messages.some(message =>
        message.content.toLowerCase().includes(searchText)
      );

      // Return true if any match is found
      return nameMatch || lastMessageMatch || messagesMatch;
    });
  }

  // Helper method to highlight matching text
  highlightText(text: string): string {
    if (!this.searchTerm) return text;

    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
  }

  backToList() {
    this.selectedThread = undefined;
  }
  autoGrow(event: any): void {
    const element = event.target as HTMLTextAreaElement;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;

    // Limit the height
    const maxHeight = 120;
    if (element.scrollHeight > maxHeight) {
      element.style.height = `${maxHeight}px`;
      element.style.overflowY = 'auto';
    } else {
      element.style.overflowY = 'hidden';
    }
  }
  async sendMessage() {
    if (!this.newMessage?.trim() || !this.selectedThread) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      content: this.newMessage,
      timestamp: new Date(),
      sender: 'user'
    };

    this.selectedThread.messages.push(newMsg);
    // Update last message preview
    this.selectedThread.lastMessage = this.newMessage;
    this.selectedThread.lastMessageTime = 'Just now';

    this.newMessage = '';

    // Reset textarea height
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
    }

    // Scroll to bottom after sending
    await this.scrollToBottom();
  }

  private async scrollToBottom() {
    if (this.content) {
      await this.content.scrollToBottom(300);
    }
  }
}
