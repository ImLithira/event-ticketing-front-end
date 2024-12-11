import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
type ItemTitle = 'Admin' | 'Vendor' | 'Customer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  items: { title: ItemTitle; link: string }[] = [
    { title: 'Admin', link: '/admin' },
    { title: 'Vendor', link: '/vendor' },
    { title: 'Customer', link: '/customer' },
  ];

  // // Store credentials
  // credentials = {
  //   role: '', // Selected role/type
  //   username: '',
  //   password: '',
  // };

  // Options for roles
  // loginOptions = ['Admin', 'Vendor', 'Customer'];

  // // Feedback for user
  // errorMessage: string | null = null;
  // cities: any[] | undefined;
  // // router:Router ;
  // selectedCity: any | undefined;
  // constructor(
  //   private http: HttpClient,
  //   // private router: Router
  // ) {}

  colors: Record<ItemTitle, string> = {
    Admin: 'var(--mint)',
    Vendor: 'var(--blue)',
    Customer: 'var(--black)',
  };

  trackByTitle(
    index: number,
    item: { title: string; link: string },
  ): string {
    return item.title;
  }
  // changePillAccent(title: ItemTitle): void {
  //   const color = this.colors[title]; // TypeScript now knows `title` matches a key in `colors`
  //   document.documentElement.style.setProperty(
  //     '--pill-accent',
  //     color,
  //   );
  // }

}
