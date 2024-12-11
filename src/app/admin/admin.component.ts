import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../table/table.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { response } from 'express';
import { ButtonModule } from 'primeng/button';
import { Subscription, timer } from 'rxjs';
import { Location } from '@angular/common';
interface ConfigurationResponse {
  totalTickets: string;
  maxTicketCapacity: string;
  ticketReleaseRate: string;
  customerRetrievalRate: string;
}

interface ReleasedTicketsResponse {
  ticketId: string;
  ticketName: string;
  ticketType: string;
  vendorName: string;
  releaseDate: string;
}

interface PurchasedTicketsResponse {
  ticketId: string;
  ticketName: string;
  ticketType: string;
  vendorName: string;
  customerName: string;
  releaseDate: string;
  purchaseDate: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TableComponent,
    FormComponent,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  logs: string = '';
  isStarted: boolean = false;
  releasedTicket: boolean = false;
  private subscription: Subscription | null = null;

  dynamicFormConfig = {
    isSubmittable: true,
    fields: [
      {
        name: 'totalTickets',
        label: 'Total Tickets',
        type: 'text',
        value: '',
        required: true,
      },
      {
        name: 'maxTicketCapacity',
        label: 'Max Ticket Capacity',
        type: 'text',
        value: '',
        required: true,
      },
      {
        name: 'ticketReleaseRate',
        label: 'Ticket Release Rate',
        type: 'text',
        value: '',
        required: true,
      },
      {
        name: 'customerRetrievalRate',
        label: 'Customer Retrieval Rate',
        type: 'text',
        value: '',
        required: true,
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

  eventLogsHeaders = [
    { label: 'Event Type', code: 'eventType' },
    { label: 'Timestamp', code: 'timestamp' },
    { label: 'Message', code: 'message' },
  ];

  eventLogs = [
    {
      eventType: '',
      timestamp: '',
      message: '',
    },
  ];

  constructor(
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  async startSystem() {
    localStorage.setItem('sytemStarted', 'started');
    this.isStarted = true;

    this.http
      .post('http://localhost:8080/api/admin/start', {})
      .subscribe({
        next: (response: any) => {
          this.showSuccessMessage(response.message);
        },
        error: () => {
          this.showErrorMessage('Error starting system');
        },
      });
  }

  async stopSystem() {
    localStorage.removeItem('sytemStarted');
    localStorage.removeItem('vendorAdded');
    this.isStarted = false;
    this.releasedTicket = false;

    this.http
      .post('http://localhost:8080/api/admin/stop', {})
      .subscribe({
        next: (response: any) => {
          this.showSuccessMessage(response.message);
        },
        error: () => {
          this.showErrorMessage('Error stopping system');
        },
      });
  }

  goBack(): void {
    this.location.back(); // This will navigate to the previous page
  }

  async addVendor() {
    localStorage.setItem('vendorAdded', 'added');
    this.releasedTicket = true;

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

  async addCustomer() {
    this.http
      .post(
        'http://localhost:8080/api/admin/add-customer',
        {},
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccessMessage(response.message);
        },
        error: () => {
          this.showErrorMessage(
            'Error when adding a customer',
          );
        },
      });
  }

  handleFormSubmit(formData: any) {
    this.http
      .post<ConfigurationResponse>(
        'http://localhost:8080/api/admin/configurations',
        formData,
      )
      .subscribe({
        next: (response: any) => {
          console.log('response: ', response);
          this.dynamicFormConfig.fields.forEach(field => {
            if (response[field.name] !== undefined) {
              field.value == response[field.name];
            }
          });
          this.showSuccessMessage(
            'Configurations updated!',
          );
        },
        error: () => {
          this.showErrorMessage(
            'An error occurred. Please try again.',
          );
        },
      });
  }

  getEventLogs() {
    this.http
      .get('http://localhost:8080/api/admin/logs1')
      .subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          this.eventLogs = this.processData(response);
        },
        error: () => {
          this.showErrorMessage(
            'Error when fetching event logs',
          );
        },
      });
  }

  // Function to process raw data and generate structured data for table
  processData(data: any[]): any[] {
    if (!data || !Array.isArray(data)) {
      console.error('Invalid data:', data);
      return []; // Return an empty array if data is not valid
    }

    return data
      .filter(entry => entry && entry.timestamp) // Ensure each entry has a timestamp
      .map(entry => {
        let eventType = '';
        let message = '';
        console.log(entry);
        // Handling string-based message
        if (typeof entry.message === 'string') {
          message = entry.message;

          // Check for specific message types
          if (entry.message.includes('Vendor added')) {
            eventType = 'Vendor Added';
          } else if (
            entry.message.includes('Customer added')
          ) {
            eventType = 'Customer Added';
          } else if (
            entry.message.includes('Ticket Updated')
          ) {
            eventType = 'Ticket Updated';
          } else if (entry.message.includes('System')) {
            eventType = 'System Start/Stop';
          } else {
            eventType = 'Unknown Event'; // If event type cannot be determined
          }
        } else if (
          entry.message &&
          typeof entry.message === 'object'
        ) {
          // Process object-based message
          if (entry.message.ticketId) {
            eventType = 'Ticket Updated';
            message = `Ticket Updated: ${entry.message.ticketName || 'Unnamed Ticket'}, Vendor: ${entry.message.vendorName || 'Unknown Vendor'}`;

            if (entry.message.customerName) {
              message += `, Customer: ${entry.message.customerName}`;
            } else {
              message += `, Customer: Unknown`;
            }

            // Include purchase date if available
            if (entry.message.purchaseDate) {
              message += `, Purchase Date: ${entry.message.purchaseDate}`;
            }
          } else if (entry.message.vendorName) {
            eventType = 'Vendor Event';
            message = `Vendor: ${entry.message.vendorName}`;
          } else if (entry.message.customerName) {
            eventType = 'Customer Event';
            message = `Customer: ${entry.message.customerName}`;
          }
        } else {
          eventType = 'Unknown Event';
          message = 'Unstructured message data';
        }

        // Return the processed log entry
        return {
          eventType,
          timestamp: entry.timestamp || 'No Timestamp',
          message: message || 'No Message',
        };
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

  async getAllTickets(): Promise<void> {
    this.http
      .get<
        ReleasedTicketsResponse[]
      >('http://localhost:8080/api/admin/tickets/all')
      .subscribe({
        next: (data: ReleasedTicketsResponse[]) => {
          console.log('API Data:', data);

          // Transform and store the fetched tickets
          this.releasedTickets = data.map(ticket => ({
            ticketId: ticket.ticketId || '',
            ticketName: ticket.ticketName || '',
            ticketType: ticket.ticketType || '',
            vendorName: ticket.vendorName || '',
            releaseDate: ticket.releaseDate || '',
          }));

          console.log(
            'Released Tickets:',
            this.releasedTickets,
          );
        },
        error: err =>
          console.error('Error fetching data:', err),
      });
  }

  async addVendorButtonClick() {
    console.log('Add Vendor Button Clicked');
    try {
      await Promise.all([
        this.addVendor(),
        this.getAllTickets(),
      ]);
      console.log(
        'Vendor added and tickets fetched successfully.',
      );
    } catch (error) {
      console.error(
        'Error occurred during addVendorButtonClick:',
        error,
      );
    }
  }

  async addCustomerButtonClick() {
    console.log('Add Customer Button Clicked');
    try {
      await Promise.all([
        this.addCustomer(),
        this.getPurchasedTickets(),
      ]);
      console.log(
        'Customer added and purchased tickets fetched successfully.',
      );
    } catch (error) {
      console.error(
        'Error occurred during addCustomerButtonClick:',
        error,
      );
    }
  }

  getPurchasedTickets() {
    this.http
      .get<
        PurchasedTicketsResponse[]
      >('http://localhost:8080/api/admin/tickets/purchased')
      .subscribe({
        next: (data: PurchasedTicketsResponse[]) => {
          console.log('API Data:', data);

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

          console.log(
            'Purchased Tickets:',
            this.purchasedTickets,
          );
        },
        error: err =>
          console.error('Error fetching data:', err),
      });
  }

  fetchConfigurations() {
    this.http
      .get<ConfigurationResponse>(
        'http://localhost:8080/api/admin/configurations',
        {},
      )
      .subscribe({
        next: response => {
          console.log('Fetched configurations:', response);
          this.dynamicFormConfig.fields.forEach(field => {
            if (field.name in response) {
              field.value =
                response[
                  field.name as keyof ConfigurationResponse
                ];
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
    const sytemStarted =
      localStorage.getItem('sytemStarted');
    if (sytemStarted === 'started') {
      this.isStarted = true;
    }

    const vendorAdded = localStorage.getItem('vendorAdded');
    if (vendorAdded === 'added') {
      this.releasedTicket = true;
    }
    this.fetchConfigurations();
  }

  ngOnDestroy(): void {
    // Cleanup to avoid memory leaks
    this.subscription?.unsubscribe();
  }
}
