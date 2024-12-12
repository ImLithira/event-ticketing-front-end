/**
 * NAME: Aththanayake Lithira Senath Dasnaka Fernando
 * UoW ID: w1959880
 * IIT ID: 20223095
 */

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

}
