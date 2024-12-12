/**
 * NAME: Aththanayake Lithira Senath Dasnaka Fernando
 * UoW ID: w1959880
 * IIT ID: 20223095
 */

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input() config!: {
    isSubmittable: boolean;
    fields: {
      value: any;
      name: string;
      label: string;
      type: string; 
      required?: boolean;
      options?: string[]; 
      disabled?: boolean;
    }[];
  };

  @Output() formSubmit = new EventEmitter<any>();

  formData: { [key: string]: any } = {};
  initialData: { [key: string]: any } = {};
  hasChanges: boolean = false;
  isSubmitted: boolean = false;

  ngOnInit() {
    // Initialize formData with default values
    this.config.fields.forEach(field => {
      this.formData[field.name] = field.value || '';
    });
    this.initialData = { ...this.formData };
  }

  onInputChange() {
    this.hasChanges = Object.keys(this.formData).some(
      (key) => this.formData[key] !== this.initialData[key]
    );
    this.isSubmitted = false;
    
  }

  onSubmit() {
    this.formSubmit.emit(this.formData);
    this.isSubmitted = true;
    this.hasChanges = false;
  }
}
