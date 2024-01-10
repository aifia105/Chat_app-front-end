import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/Auth.service';
import { FormsModule } from '@angular/forms';
import { ConversationService } from '../../services/conversation.service';
import { ConversationInterface } from '../../models/ConversationInterface';
import { UserInterface } from '../../models/UserInterface';
import { UserService } from '../../services/user.service';
import { MessageInterface } from '../../models/MessageInterface';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent,FormsModule ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit {

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private conversationService = inject(ConversationService);

  user = this.authService.user();
  userConverstaions : ConversationInterface[] = [];
  friends: UserInterface[] = [];
  messages: MessageInterface[] = [];
  lastMessage!: MessageInterface;
  nonReadMessages: Number = 0;
  
  ngOnInit(): void {
    if (this.user) {
      this.user.picture = 'data:picture/jpeg;base64,' + this.user.picture;
    }
   this.conversationService.getUserConversations(this.user?.id).subscribe((converstaion) => {
    this.userConverstaions = converstaion;
    console.log(this.userConverstaions + 'from compoent');
    this.userConverstaions.map((converstaion) => {
      console.log(converstaion.participants + "1 conv");
      const messages = converstaion.messages;
      //add last message 
      //count non read messages
     
      const friendId = converstaion.participants.find(id => id !== this.user?.id);
      console.log(friendId + "friend id")
      if(friendId){
        this.userService.getUser(friendId).subscribe((friend) => {
          console.log(friend + "friend");
          this.friends.push(friend);
        });
      }
    });
   });
    
  }

  getConversation(friendId: string){
    this.conversationService.getConversations$.next(friendId);
  }

  /*
  searchTerm: string ='';
  filteredResult: any[] =[]
  onSearchChange(event: Event) {
    this.filteredResult = this.userConverstaions.filter((item) => {
      item.participants.toLowerCase().includes(this.searchTerm.toLowerCase())
    });
  }
 */
  
  

}
