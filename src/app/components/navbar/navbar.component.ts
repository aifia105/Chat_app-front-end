import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AuthService } from '../../services/Auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showNotifications = false;
  elementRef = inject(ElementRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.showNotifications) {
      this.showNotifications = false;
    }
  }
  user = this.authService.user();
  logout(userId: string | undefined): void {
    this.authService.disconnectUser$.next(userId);
    this.router.navigate(['/login']);
  }

}
