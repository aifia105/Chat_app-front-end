import { Component, OnDestroy, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../models/UserInterface';
import { CommonModule } from '@angular/common';

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

  private userService = inject(UserService);
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

}
