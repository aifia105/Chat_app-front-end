import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatListComponent, ChatWindowComponent, NavbarComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
