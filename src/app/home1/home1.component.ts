import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,FormsModule,HttpClientModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
 // Store credentials
 credentials = {
  role: '', // Selected role/type
  username: '',
  password: '',
};

// Options for roles
loginOptions = ['Admin', 'Vendor', 'Customer'];

// Feedback for user
errorMessage: string | null = null;
cities: any[] | undefined;
// router:Router ;
selectedCity: any | undefined;
constructor(private http: HttpClient, 
  // private router: Router
) {}


ngOnInit() {
    this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
}
// Handle login submission
onLogin() {
  if (!this.credentials.role || !this.credentials.username || !this.credentials.password) {
    this.errorMessage = 'All fields are required.';
    return;
  }

  const payload = {
    role: this.credentials.role,
    username: this.credentials.username,
    password: this.credentials.password,
  };

  // Example API call
  // this.http.post('/api/login', payload).subscribe({
  //   next: (response: any) => {
  //     // Handle successful login, redirect, or store token
  //     console.log('Login successful:', response);

  //     // Redirect or perform another action based on API response
  //     if (response.redirectUrl) {
  //       window.location.href = response.redirectUrl;
  //     } else {
  //       alert('Login successful!');
  //     }
  //   },
  //   error: (err) => {
  //     // Handle error
  //     console.error('Login failed:', err);
  //     this.errorMessage = 'Invalid login credentials. Please try again.';
  //   },
  // });
  // this.router.navigate(/,4)
  
  
}
}
