import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DepartmentSelectService} from "./department-select.service";
import {DepartmentRequestBase} from "./InterafceDepatment";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-department-select',
    standalone: true,
    imports: [
        NzOptionComponent,
        NzSelectComponent,
        FormsModule,
        NgForOf
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DepartmentSelectComponent),
            multi: true
        }
    ],
    templateUrl: './department-select.component.html',
})
export class DepartmentSelectComponent implements ControlValueAccessor, OnChanges {
    @Input() Category?: string;
    ListDepartments?: DepartmentRequestBase;

    constructor(private departmentSelectService: DepartmentSelectService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['Category'] && this.Category) {
            this.fetchDepartment();
        }
    }

    fetchDepartment() {
        if (this.Category) {
            this.departmentSelectService.get_Department_byCategory(this.Category).subscribe((request) => {
                this.ListDepartments = request;
                this.onChange(this.ListDepartments);
            });
        }
    }

    private onChange: (value: any) => void = () => {
    };
    private onTouched: () => void = () => {
    };
    selectedDepartment: any;

    writeValue(value: any): void {
        this.ListDepartments = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Handle disabled state if needed
    }

    onSelectDepartment(department: any): void {
        this.onChange(department);
        this.onTouched();
    }
}