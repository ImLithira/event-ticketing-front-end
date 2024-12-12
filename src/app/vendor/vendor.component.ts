/**
 * NAME: Aththanayake Lithira Senath Dasnaka Fernando
 * UoW ID: w1959880
 * IIT ID: 20223095
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../table/table.component';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TableComponent,
    ButtonModule,
    DialogModule,
    InputTextModule,
    AvatarModule,
    FormComponent,
  ],
  providers: [MessageService],
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
})
export class VendorComponent {
  private subscription: Subscription | null = null;

  constructor(
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  goBack(): void {
    this.location.back(); // This will navigate to the previous page
  }

  dynamicFormConfig = {
    isSubmittable: false,
    fields: [
      {
        name: 'totalTickets',
        label: 'Total Tickets',
        type: 'text',
        value: '',
        required: true,
        disabled: true,
      },
      {
        name: 'maxTicketCapacity',
        label: 'Max Ticket Capacity',
        type: 'text',
        value: '',
        required: true,
        disabled: true,
      },
      {
        name: 'ticketReleaseRate',
        label: 'Ticket Release Rate',
        type: 'text',
        value: '',
        required: true,
        disabled: true,
      },
    ],
  };

  releasedTicketsHeaders = [
    { label: 'Ticket ID', code: 'ticketId' },
    { label: 'Ticket Name', code: 'ticketName' },
    { label: 'Ticket Type', code: 'ticketType' },
    { label: 'Vendor Name', code: 'vendorName' },
    { label: 'Released Date/time', code: 'releaseDate' },
  ];
  releasedTickets = [
    {
      ticketId: '',
      ticketName: '',
      ticketType: '',
      vendorName: '',
      releaseDate: '',
    },
  ];

  purchasedTicketsHeaders = [
    { label: 'Ticket ID', code: 'ticketId' },
    { label: 'Ticket Name', code: 'ticketName' },
    { label: 'Ticket Type', code: 'ticketType' },
    { label: 'Vendor Name', code: 'vendorName' },
    { label: 'Customer Name', code: 'customerName' },
    { label: 'Released Date/time', code: 'releaseDate' },
    { label: 'Purchased Date/time', code: 'purchaseDate' },
  ];
  purchasedTickets = [
    {
      ticketId: '',
      ticketName: '',
      ticketType: '',
      vendorName: '',
      customerName: '',
      releaseDate: '',
      purchaseDate: '',
    },
  ];

  async addVendor() {
    this.http
      .post(
        'http://localhost:8080/api/admin/add-vendor',
        {},
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccessMessage(response.message);
        },
        error: () => {
          this.showErrorMessage(
            'Error when adding a vendor',
          );
        },
      });
  }

  async getAllTickets(): Promise<void> {
    this.http
      .get<
        any[]
      >('http://localhost:8080/api/admin/tickets/all')
      .subscribe({
        next: (data: any[]) => {
          // Transform and store the fetched tickets
          this.releasedTickets = data.map(ticket => ({
            ticketId: ticket.ticketId || '',
            ticketName: ticket.ticketName || '',
            ticketType: ticket.ticketType || '',
            vendorName: ticket.vendorName || '',
            releaseDate: ticket.releaseDate || '',
          }));
        },
        error: err =>
          console.error('Error fetching data:', err),
      });
  }

  getPurchasedTickets() {
    this.http
      .get<
        any[]
      >('http://localhost:8080/api/admin/tickets/purchased')
      .subscribe({
        next: (data: any[]) => {
          // Transform and store the fetched tickets
          this.purchasedTickets = data.map(
            (ticket: any) => ({
              ticketId: ticket.ticketId || '', // Map API field to local structure
              ticketName: ticket.ticketName || '',
              ticketType: ticket.ticketType || '',
              vendorName: ticket.vendorName || '',
              customerName: ticket.customerName || '',
              releaseDate: ticket.releaseDate || '',
              purchaseDate: ticket.purchaseDate || '',
            }),
          );
        },
        error: err =>
          console.error('Error fetching data:', err),
      });
  }

  showSuccessMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      detail: message,
    });
  }

  showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message,
    });
  }

  fetchConfigurations() {
    this.http
      .get<any>(
        'http://localhost:8080/api/admin/config',
        {},
      )
      .subscribe({
        next: response => {
          console.log('Fetched configurations:', response);
          this.dynamicFormConfig.fields.forEach(field => {
            if (field.name in response) {
              field.value =
                response[field.name as keyof any];
            }
          });
        },
        error: err => {
          console.error(
            'Error fetching configurations:',
            err,
          );
          this.showErrorMessage(
            'Failed to fetch configurations.',
          );
        },
      });
  }

  ngOnInit() {
    this.fetchConfigurations();
  }
}
