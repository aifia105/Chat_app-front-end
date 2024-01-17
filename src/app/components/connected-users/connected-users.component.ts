import { Component, OnDestroy, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../models/UserInterface';
import { CommonModule } from '@angular/common';
import { type DropdownOptions, type DropdownInterface, Dropdown } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { ConversationService } from '../../services/conversation.service';
import { PersistanceService } from '../../services/persistance.service';
import { AuthService } from '../../services/Auth.service';

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
  userId: string | undefined = '';
  dropdown!: DropdownInterface;
 

  private userService = inject(UserService);
  private convserationService = inject(ConversationService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.userId = this.authService.user()?.id;
    this.subscription$.add(
      this.userService.getConnectedUsers().subscribe((users) => {
        
        this.users = users.filter((user) => user.id !== this.userId);
        this.users.map((user) => {
          if (user) {
            user.picture = 'data:picture/jpeg;base64,' + user.picture;
          }
        })
      })

    )
    const $targetEl: HTMLElement = document.getElementById('dropdownSearch')!;
    const $triggerEl: HTMLElement = document.getElementById('dropdownSearchButton')!;
   const options: DropdownOptions = {
     placement: 'bottom',
     triggerType: 'click',
     offsetSkidding: 0,
     offsetDistance: 10,
     delay: 300,
 };
 const instanceOptions: InstanceOptions = {
  id: 'dropdownSearch',
  override: true
};
this.dropdown  = new Dropdown(
  $targetEl,
  $triggerEl,
  options,
  instanceOptions
);

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  CreateConversation(id: string){
    this.convserationService.getConversations$.next(id);
  }

  CreateConversationGroup(id: string[]){
    this.dropdown.hide();
    id.push(this.userId!);
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
    */