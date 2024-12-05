import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html'
})
export class TableComponent {
  @Input() headers!:  { label: string; code: string }[];
  @Input() data!: any[];
}
