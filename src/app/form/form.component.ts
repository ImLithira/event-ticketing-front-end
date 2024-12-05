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
      type: string; // 'text', 'select', 'checkbox', etc.
      required?: boolean;
      options?: string[]; // Only for 'select' type
      disabled?: boolean;
    }[];
  };

  @Output() formSubmit = new EventEmitter<any>();

  formData: { [key: string]: any } = {};
  ngOnInit() {
    // Initialize formData with default values
    this.config.fields.forEach((field) => {
      this.formData[field.name] = field.value || '';
    });
  }
  onSubmit() {
    this.formSubmit.emit(this.formData);
  }
}
