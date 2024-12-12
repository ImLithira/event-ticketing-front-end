/**
 * NAME: Aththanayake Lithira Senath Dasnaka Fernando
 * UoW ID: w1959880
 * IIT ID: 20223095
 */

import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { VendorComponent } from './vendor/vendor.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home' },
];
