import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/Auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersistanceService } from '../../../services/persistance.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private persist = inject(PersistanceService);
  constructor() {
    effect(() => {
      if(this.authService.user()){
        this.router.navigate(['/home']);
        this.persist.set('user',this.authService.user());
        this.persist.set('token', this.authService.user()?.token);
      }
    }) 
  }

  loginForm = this.fb.nonNullable.group({
    email: ['',[Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  onSubmit():void {
    if(this.loginForm.valid){
      console.log('from component', this.loginForm.getRawValue());
      const request = this.loginForm.getRawValue();
      this.authService.authenticateUser$.next(request);
    } else {
      this.authService.error$.next('Please fill in all fields');
    }
  }

}
