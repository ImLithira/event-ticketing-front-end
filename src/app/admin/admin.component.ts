import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TableComponent,
    FormComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  releasedTickets1: string = '';
  dynamicFormConfig = {
    isSubmittable: true,
    fields: [
      {
        value: '5',
        name: 'totalTickets',
        label: 'Total Tickets',
        type: 'text',
        disabled: true,
      },
      {
        value: 'Allahu akbar',
        name: 'maxTicketPoolCapacity',
        label: 'Max Ticket Pool Capacity',
        type: 'text',
        disabled: true,
      },
      {
        value: 'Allahu akbar',
        name: 'ticketReleaseRate',
        label: 'Ticket Release Rate',
        type: 'text',
        disabled: true,
      },
      {
        value: 'Allahu akbar',
        name: 'customerRetrievalRate',
        label: 'Customer Retrieval Rate',
        type: 'text',
        disabled: true,
      },
    ],
  };

  releasedTicketsHeaders = [
    { label: 'Ticket ID', code: 'ticketID' },
    { label: 'Ticket Name', code: 'ticketName' },
    { label: 'Ticket Type', code: 'ticketType' },
    { label: 'Released Date/time', code: 'releasedDate' },
  ];
  releasedTickets = [
    {
      ticketID: 'RT001',
      ticketName: 'Ticket 1',
      ticketType: 'Category A',
      releasedDate: '',
    },
    {
      ticketID: 'RT00ks1',
      ticketName: 'Tickedsflkdt 1',
      ticketType: 'Category Afdf',
      releasedDate: '',
    },
  ];

  purchasedTicketsHeaders = [
    { label: 'Ticket ID', code: 'ticketID' },
    { label: 'Ticket Name', code: 'ticketName' },
    { label: 'Ticket Type', code: 'ticketType' },
    { label: 'Released Date/time', code: 'releasedDate' },
    { label: 'purchased Date/time', code: 'purchasedDate' },
  ];
  purchasedTickets = [
    {
      ticketID: 'RT001dff',
      ticketName: 'Ticket 1',
      ticketType: 'Category A',
      releasedDate: '',purchasedDate:''
    },
    {
      ticketID: 'RT00ks1ff',
      ticketName: 'Tickedsflkdt 1',
      ticketType: 'Category Afdf',
      releasedDate: '',purchasedDate:new Date()
    },
  ];

  handleFormSubmit(formData: any) {
    console.log('Form Data:', formData);
  }
  ngOnInit(){//te first method thats being called whenever the component loads
    // call httpclient initialize the values like purchasedTickets
    //this.releasedTickets1 = //thevalues from the api
  }
}
