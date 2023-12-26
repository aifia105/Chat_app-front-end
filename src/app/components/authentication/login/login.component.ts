import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/Login.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public LoginService = inject(LoginService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  constructor() {
    effect(() => {
      if(this.LoginService.user()){
        this.router.navigate(['/home']);
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
      this.LoginService.authenticateUser$.next(request);
    } else {
      this.LoginService.error$.next('Please fill in all fields');
    }
  }

}
