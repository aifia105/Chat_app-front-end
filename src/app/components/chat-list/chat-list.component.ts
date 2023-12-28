import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/Auth.service';
import { FormsModule } from '@angular/forms';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent,FormsModule ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit {
  authService = inject(AuthService);
  conversationService = inject(ConversationService);
  user = this.authService.user();
  testData : any[] = [];
  searchTerm: string ='';
  filteredResult: any[] =[]
  ngOnInit(): void {
    if (this.user) {
      this.user.picture = 'data:picture/jpeg;base64,' + this.user.picture;
    }
    this.conversationService.getConservations();
  }

  onSearchChange(event: Event) {
    this.filteredResult = this.testData.filter((item) => {
      item.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    });
  }

  
  

}
