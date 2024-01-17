import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/Auth.service';
import { FormsModule } from '@angular/forms';
import { ConversationService } from '../../services/conversation.service';
import { ConversationInterface } from '../../models/ConversationInterface';
import { UserInterface } from '../../models/UserInterface';
import { UserService } from '../../services/user.service';
import { MessageInterface } from '../../models/MessageInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent,FormsModule ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private conversationService = inject(ConversationService);

  private subscription$ = new Subscription();
  user = this.authService.user();
  userConverstaions : ConversationInterface[] = [];
  friends: UserInterface[] = [];
  messages: MessageInterface[] = [];
  lastMessage!: MessageInterface;
  nonReadMessages: Number = 0;
  isGroup: boolean = false;
  
  ngOnInit(): void {
    if (this.user) {
      this.user.picture = 'data:picture/jpeg;base64,' + this.user.picture;
    }
   this.subscription$.add(
    this.conversationService.getUserConversations(this.user?.id).subscribe((converstaion) => {
      this.userConverstaions = converstaion;
      this.userConverstaions.map((converstaion) => {
        this.isGroup = converstaion.type === 'group'; 
        converstaion.participants.map((userId) => {
          if(userId !== this.user?.id){
            this.userService.getUser(userId).subscribe((user) => {
              user.picture = 'data:picture/jpeg;base64,' + user.picture;
              if(!this.friends.includes(user)){
                this.friends.push(user);
              }
            });
          }
        })










        const messages = converstaion.messages;
        //add last message 
        //count non read messages
        
       
        
       
        
        
      });
     })
   );
    
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
