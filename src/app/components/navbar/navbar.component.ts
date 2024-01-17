import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AuthService } from '../../services/Auth.service';
import {  Router } from '@angular/router';
import { PersistanceService } from '../../services/persistance.service';
import { UserInterface } from '../../models/UserInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements  OnInit {
  showNotifications = false;
  elementRef = inject(ElementRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  private persist = inject(PersistanceService);

  user: UserInterface| null = null;




  ngOnInit(): void {
    const userResponse = this.authService.user();
    if (userResponse) {
      this.user = userResponse;
    }
  }
  







  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.showNotifications) {
      this.showNotifications = false;
    }
  }
  
  logout(userId: string | undefined): void {
    this.authService.disconnectUser$.next(userId);
    this.router.navigate(['/login']);
  }

}
