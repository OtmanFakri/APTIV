import {Component, Input} from '@angular/core';
import {ChangePostResponse, StatusEnum} from '../InterfaceChnagePost';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeIdInputComponent} from "../../Components/employee-id-input/employee-id-input.component";
import {Item} from "../../interfaces/ListEmployee";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-create-or-update-post',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        EmployeeIdInputComponent,
        NgIf,
        NgForOf
    ],

    templateUrl: './create-or-update-post.component.html',
})
export class CreateOrUpdatePostComponent {

    @Input() changePost: ChangePostResponse | null = null;
    @Input() isUpdateMode: boolean = false;

    changePostForm!: FormGroup;
    statusOptions = Object.values(StatusEnum);

    //employees: EmployeeBase[] = []; // This should be populated from a service

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.isUpdateMode = !!this.changePost;
        this.initForm();
        // TODO: Fetch employees from a service
        // this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
    }

    initForm() {
        this.changePostForm = this.fb.group({
            status: [this.changePost?.status || null],
            observation: [this.changePost?.observation || ''],
            employee_id: [{
                value: this.changePost?.employee.id || null,
            },]
        });
        if (this.isUpdateMode) {
            this.changePostForm.patchValue({
                employee_id: this.changePost?.employee.id
            })
        } else {
            console.log('Creating new post');
        }

    }

    setEmployee($event: Item | null) {
        if (this.isUpdateMode) {
            this.changePostForm.patchValue(
                {
                    employee_id: $event?.id
                }
            )
        }
        this.changePostForm.get('employee_id')?.setValue($event?.id);

    }
}
