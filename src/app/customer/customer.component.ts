import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TableComponent,
    FormComponent,
  ],
  templateUrl: './customer.component.html',
})
export class CustomerComponent {
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
}
