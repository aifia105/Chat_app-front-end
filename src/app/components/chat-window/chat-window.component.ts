import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
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
  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  selectEmoji(emoji: string): void {
    this.content += emoji;
    console.log('Selected Emoji:', emoji);
    this.showEmojiPicker = false;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.showEmojiPicker) {
      this.showEmojiPicker = false;
    }
  }
}
