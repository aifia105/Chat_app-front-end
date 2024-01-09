import { Component, OnDestroy, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../models/UserInterface';
import { CommonModule } from '@angular/common';
import { type DropdownOptions, type DropdownInterface, Dropdown } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-connected-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connected-users.component.html',
  styleUrl: './connected-users.component.scss'
})
export class ConnectedUsersComponent implements OnDestroy {
  private subscription$ = new Subscription();
  users: UserInterface[]= [];
  groupIds: string[] = [];

  private userService = inject(UserService);
  private convserationService = inject(ConversationService);

  ngOnInit(): void {
    this.subscription$.add(
      this.userService.getConnectedUsers().subscribe((users) => {
        this.users = users;
      })
    )
    
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  CreateConversation(id: string){
    this.convserationService.getConversations$.next(id);
  }

  CreateConversationGroup(id: string[]){
    this.convserationService.getConversationsGroup$.next(id);
  }

  onCheckboxChange(event: any, userId: string){
    if(event.target.checked){
      this.groupIds.push(userId);
    }else{
      let index = this.groupIds.indexOf(userId);
      if(index > -1){
        this.groupIds.splice(index, 1);
      }
    }
  
  }




 
}

 //dialog


   /*
   const $targetEl: HTMLElement = document.getElementById('dropdownSearch')!;
    const $triggerEl: HTMLElement = document.getElementById('dropdownSearchButton')!;
   const options: DropdownOptions = {
     placement: 'bottom',
     triggerType: 'click',
     offsetSkidding: 0,
     offsetDistance: 10,
     delay: 300,
     onHide: () => {
         console.log('dropdown has been hidden');
     },
     onShow: () => {
         console.log('dropdown has been shown');
     },
     onToggle: () => {
         console.log('dropdown has been toggled');
     },
 };
 const instanceOptions: InstanceOptions = {
  id: 'dropdownSearch',
  override: true
};
const dropdown: DropdownInterface = new Dropdown(
  $targetEl,
  $triggerEl,
  options,
  instanceOptions
);
dropdown.show(); */