import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/Auth.service';
import { UserInterface } from '../../models/UserInterface';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit {
  emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😇",
    "😉",
    "😊",
    "🙂",
    "🙃",
    "😋",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "🤪",
    "😜",
    "😝",
    "😛",
    "🤑",
    "😎",
    "🤓",
    "🧐",
    "🤠",
    "🥳",
    "🤗",
    "🤡",
    "😏",
    "😶",
    "😐",
    "😑",
    "😒",
    "🙄",
    "🤨",
    "🤔",
    "🤫",
    "🤭",
    "🤥",
    "😳",
    "😞",
    "😟",
    "😠",
    "😡",
    "🤬",
    "😔",
    "😟",
    "😠",
    "😡",
    "🤬",
    "😔",
    "😕",
    "🙁",
    "😬",
    "🥺",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥱",
    "😤",
    "😮",
    "😱",
    "😨",
    "😰",
    "😯",
    "😦",
    "😧",
    "😢",
    "😥",
    "😪",
    "🤤",
  ];
  showEmojiPicker = false;
  content: String = '';
  elementRef = inject(ElementRef);

  private conversationService = inject(ConversationService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  conversation = this.conversationService.conversations(); 
  user = this.authService.user();
  friend!:UserInterface;


  ngOnInit(): void { 
    this.conversation?.participants.map((participant) => {
      if(this.conversation?.type=== "one-on-one"){
      console.log(participant + "1 conv");
      if(participant !== this.user?.id){
        this.userService.getUser(participant).subscribe((user) => {
          this.friend = user;
        })
      }
      } 
    });
  }
  
  //getting the selected emoji
  selectEmoji(emoji: string): void {
    this.content += emoji;
    console.log('Selected Emoji:', emoji);
    this.showEmojiPicker = false;
  }

//getting the selected file
@ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;
onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target && target.files && target.files.length > 0) {
    const file = target.files[0];
    // Use the file variable, for example, log its name
    console.log('Selected file:', file);
  }
}






toggleEmojiPicker(): void {
  this.showEmojiPicker = !this.showEmojiPicker;
}

@HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.showEmojiPicker) {
      this.showEmojiPicker = false;
    }
  }
}
