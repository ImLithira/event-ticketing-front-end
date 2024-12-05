// import { Component } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { DropdownModule } from 'primeng/dropdown';
// import { CommonModule } from '@angular/common';
// import {
//   ActivatedRoute,
//   Router,
//   RouterLink,
//   RouterLinkActive,
//   RouterOutlet,
// } from '@angular/router';

// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { FloatLabelModule } from 'primeng/floatlabel';

// interface Role {
//   name: string;
//   code: string;
// }

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// imports: [
//   FormsModule,
//   ReactiveFormsModule,
//   ButtonModule,
//   FloatLabelModule,
//   CommonModule,
//   RouterOutlet,
//   RouterLink,
//   RouterLinkActive,
//   DropdownModule,
//   InputTextModule,
// ],
//   standalone: true,
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   // userTypes = [
//   //   { label: 'Admin', value: 'admin' },
//   //   { label: 'User', value: 'user' },
//   // ];
//   userTypes: Role[] = [
//     {
//       name: 'New York',
//       code: 'NY',
//     },
//     {
//       name: 'Rome',
//       code: 'RM',
//     },
//     {
//       name: 'London',
//       code: 'LDN',
//     },
//     {
//       name: 'Istanbul',
//       code: 'IST',
//     },
//     {
//       name: 'Paris',
//       code: 'PRS',
//     },
//   ];

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private http: HttpClient,
//   ) {
//     this.loginForm = this.fb.group({
//       // userType: [null, Validators.required],
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

// onSubmit() {
//   if (this.loginForm.valid) {
//     const formData = this.loginForm.value;
//     console.log('Login data:', formData);

//     this.http
//       .post('https://api.example.com/login', formData)
//       .subscribe({
//         next: response => {
//           console.log('Login successful', response);
//         },
//         error: error => {
//           console.error('Login failed', error);
//         },
//       });
//   }
//   if (this.loginForm.valid) {
//     this.router.navigate(['/admin']);
//   }
// }
// }
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
interface LoginResponse {
  success: boolean;
  message: string;
  role: string;
}

// alt + shift+ o
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ToastModule,
    RippleModule,
    
  ],
  providers: [MessageService],
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  selectedRole: string = '';
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,

  ) {}

  selectRole(role: string) {
    this.selectedRole = role;  // Update the selected role when a button is clicked
  }

  onLogin() {
    this.showSuccessMessage();
    if (this.username && this.password && this.selectedRole) {
      this.http
        .post<LoginResponse>('http://localhost:8080/api/auth/login', {
          username: this.username,
          password: this.password,
          role: this.selectedRole,
        })
        .subscribe({
          next: (response) => {
            console.log('aaaaaaaaa')
            if (response.success) {
              // Redirect based on the role
              this.router.navigate(['/admin']);
              this.showSuccessMessage(); // Show success message
              console.log('Logged in!!!')
            } else {
              this.showErrorMessage(response.message); // Show error message from backend
              console.log('allah!!!')
            }
          },
          error: () => {
            this.showErrorMessage('An error occurred. Please try again.');
          },
        });
    } else {
      this.showWarnMessage('Please enter username, password, and select a role.');
    }
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Login Successful',
      detail: 'You are now logged in!',
    });
  }

  showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: message,
    });
  }

  showWarnMessage(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Missing Input',
      detail: message,
    });
  }
}