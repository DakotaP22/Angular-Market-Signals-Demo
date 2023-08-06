import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormsModule } from '@angular/forms';

export type AsideFilter = {
  minimumPrice?: number;
  maximumPrice?: number;
};

@Component({
  selector: 'shop-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FilterComponent {
  @Input() brands: string[] = [];
  @Output() filterChanged = new EventEmitter<AsideFilter>();

  onSubmit(event) {
    console.log(event);
  }
}
