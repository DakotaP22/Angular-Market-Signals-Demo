import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'outlined-text-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outlined-text-field.component.html',
  styleUrls: ['./outlined-text-field.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OutlinedTextFieldComponent,
    },
  ],
})
export class OutlinedTextFieldComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() type?: 'text' | 'number' | 'email' | 'password' = 'text';
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  //value access
  _onChange = (quantity) => {};
  _onTouched = () => {};
  touched = signal(false);
  disabled = signal(false);
  initialValue = undefined;

  ngAfterViewInit() {
    const el: HTMLInputElement | undefined = this.input?.nativeElement;
    if (!el) return;

    el.addEventListener('input', () => {
      this.onChange(el.value);
    });

    if (this.initialValue) {
      this.input.nativeElement.value = this.initialValue;
    }
  }

  writeValue(obj: any): void {
    if (!this.initialValue) this.initialValue = obj;
    if (this.input?.nativeElement) this.input.nativeElement.value = obj;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  //event registration
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onChange(event) {
    // console.log(event);
    this._onChange(event);
    this.onTouched();
  }

  onTouched() {
    this._onTouched();
    this.touched.set(true);
  }
}
