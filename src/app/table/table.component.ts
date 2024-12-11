import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './table.component.html',
})
export class TableComponent {
  searchValue: string = '';
  @ViewChild('dt1') table!: Table;
  @Input() headers!: { label: string; code: string }[];
  @Input() data!: any[];

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  get globalFilterFields(): string[] {
    return this.headers.map(header => header.code); // Extract column keys for filtering
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Safely cast to HTMLInputElement
    const value = target?.value || ''; // Use optional chaining to ensure safety
    this.table.filterGlobal(value, 'contains')
  }
  
}
