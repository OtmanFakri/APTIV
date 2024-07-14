import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-validation',
    standalone: true,
    imports: [
        FormsModule,
        NgForOf
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ValidationComponent),
            multi: true
        }
    ],
    templateUrl: './validation.component.html',
})
export class ValidationComponent implements ControlValueAccessor {
    @Input() validationTypes: string[] = ['ITT', 'VALID', 'VHJ', 'VPO'];
    @Output() typeChange = new EventEmitter<string>();
    @Input() value: string | null = '';

    onChange: (value: string) => void = () => {};
    onTouch: () => void = () => {};

    writeValue(value: string): void {
        if (value !== undefined && value !== null) {
            this.value = value;
        } else {
            this.value = '';
        }
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Implement if you want to support disabling the component
        console.log('setDisabledState', isDisabled);
    }

    onModelChange(value: string) {
        this.value = value;
        this.onChange(value);
        this.onTouch();
        this.typeChange.emit(value);
    }
}