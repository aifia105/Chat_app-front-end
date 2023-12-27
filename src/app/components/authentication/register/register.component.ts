import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/Auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  termsAccepted = false;
  fileHolder: File |  null = null;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  public authService = inject(AuthService);

  constructor(){
    effect(() => {
      if(this.authService.user()){
        this.router.navigate(['/home']);
      }
    })
  }

  registerFrom = this.fb.nonNullable.group({
    picture: [''],
    username: ['', Validators.required],
    email : ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.minLength(8)]],
    Confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    if(this.registerFrom.valid && this.fileHolder){
      if(this.registerFrom.value.password === this.registerFrom.value.Confirmpassword){
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.fileHolder);
      reader.onload = (event) => {
        const fileContent = event.target?.result as ArrayBuffer;
        const byteArray = new Uint8Array(fileContent);

        const request = {
          ...this.registerFrom.getRawValue(),
          picture: Array.from(byteArray),
        };

        this.authService.registerUser$.next(request);
      };
      console.log('from component', this.registerFrom.getRawValue());
      } else{
        this.authService.error$.next('Passwords do not match');
      }
    } else {
      this.authService.error$.next('Please fill in all fields');
    }
  }

  onFileChange(event: any) {
    if(event.target.files.length > 0){
      this.fileHolder = event.target.files[0];       
    }
  }
}
