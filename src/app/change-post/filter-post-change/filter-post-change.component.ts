import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SelectDateComponent} from "../../Components/select-date/select-date.component";
import {NgForOf} from "@angular/common";
import {StatusEnum} from "../InterfaceChnagePost";
import {extractDateComponents} from "../../helper/getCurrentFormattedDate";

@Component({
    selector: 'app-filter-post-change',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        SelectDateComponent,
        NgForOf
    ],
    templateUrl: './filter-post-change.component.html',
})
export class FilterPostChangeComponent implements OnInit {

    queryForm!: FormGroup;
    statusOptions = Object.values(StatusEnum);

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.queryForm = this.fb.group({
            status: [null],
            date: [null]
        });
    }

    onDateChange($event: { date: Date | null; mode: "date" | "month" | "year" }) {
        const {day, month, year} = extractDateComponents($event.date, $event.mode);
        this.queryForm.patchValue({date: {day, month, year}});
    }
}
