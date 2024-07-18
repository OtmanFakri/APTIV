import {Component, forwardRef} from '@angular/core';
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Category} from "../../examination/InterfacesExaminitaion";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-category-select',
    standalone: true,
    imports: [
        NzSelectComponent,
        NzOptionComponent,
        FormsModule,
        NgForOf
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CategorySelectComponent),
            multi: true
        }
    ],
    templateUrl: './category-select.component.html',
})
export class CategorySelectComponent implements ControlValueAccessor {
    categories = Object.values(Category);
    selectedCategory: Category | null = null;

    private onChange: (value: Category | null) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(value: Category | null): void {
        this.selectedCategory = value;
    }

    registerOnChange(fn: (value: Category | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Handle disabled state if needed
    }

    onSelectCategory(category: Category): void {
        this.selectedCategory = category;
        if (this.onChange) {
            this.onChange(this.selectedCategory);
        }
        if (this.onTouched) {
            this.onTouched();
        }
    }
}
