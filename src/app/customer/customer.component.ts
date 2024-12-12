/**
 * NAME: Aththanayake Lithira Senath Dasnaka Fernando
 * UoW ID: w1959880
 * IIT ID: 20223095
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../table/table.component';
import { Subscription, timer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TableComponent,
    FormComponent,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  private subscription: Subscription | null = null;

  constructor(
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

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
        name: 'customerRetrievalRate',
        label: 'Customer Retrieval Rate',
        type: 'text',
        value: '',
        required: true,
        disabled: true,
      },
    ],
  };

  availableTicketsHeaders = [
    { label: 'Ticket ID', code: 'ticketId' },
    { label: 'Ticket Name', code: 'ticketName' },
    { label: 'Ticket Type', code: 'ticketType' },
    { label: 'Vendor Name', code: 'vendorName' },
    { label: 'Released Date/time', code: 'releaseDate' },
  ];
  availableTickets = [
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

  goBack(): void {
    this.location.back();
  }

  async addCustomer() {
    this.http
      .post(
        'http://localhost:8080/api/admin/add-customer',
        {},
      )
      .subscribe({
        next: (response: any) => {
          console.log('Customer Added');
        },
        error: (e:any) => {
          console.log(e);
        },
      });
  }

  async getAvailavbleTickets(): Promise<void> {
    this.http
      .get<
        any[]
      >('http://localhost:8080/api/customer/available-tickets')
      .subscribe({
        next: (data: any[]) => {
          // Transform and store the fetched tickets
          this.availableTickets = data.map(ticket => ({
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

  fetchConfigurations() {
    this.http
      .get<any>(
        'http://localhost:8080/api/admin/config',
        {},
      )
      .subscribe({
        next: response => {
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
        },
      });
  }

  ngOnInit() {
    this.fetchConfigurations();
  }
}
