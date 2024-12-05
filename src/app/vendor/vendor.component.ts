import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TableComponent,
    ButtonModule,
    DialogModule,
    InputTextModule, AvatarModule
  ],
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],

})
export class VendorComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
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
      releasedDate: '',
      purchasedDate: '',
    },
    {
      ticketID: 'RT00ks1ff',
      ticketName: 'Tickedsflkdt 1',
      ticketType: 'Category Afdf',
      releasedDate: '',
      purchasedDate: new Date(),
    },
  ];
}
