import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UploadingFileService} from "../../../Components/uploading-file/uploading-file.service";
import {CertificatesService} from "../../../list-certification/certificates.service";
import {ShiftSelectorComponent} from "../../../Components/shift-selector/shift-selector.component";
import {ShiftEnum} from "../../../enum/ShiftEnum";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {InjuryService} from "../../../list-injury/injury.service";
import {InjuryQueryParams, listInjury} from "../../../list-injury/InterfacesInjury";
import {SelectDateComponent} from "../../../Components/select-date/select-date.component";
import {extractDateComponents} from "../../../helper/getCurrentFormattedDate";

@Component({
    selector: 'app-info-accidents',
    standalone: true,
    imports: [
        ShiftSelectorComponent,
        NgForOf,
        DatePipe,
        NgIf,
        SelectDateComponent
    ],
    templateUrl: './info-accidents.component.html',
})
export class InfoAccidentsComponent implements OnInit {
    userId: any;
    injuries!: listInjury;
    isLoading: boolean = false;

    constructor(private route: ActivatedRoute,
                private injuryService: InjuryService) {
    }

    fetchInjuries(params: InjuryQueryParams = {
        year: new Date().getFullYear(),
    }) {
        this.isLoading = true;
        const queryParams: InjuryQueryParams = {
            employee_id: this.userId,
            ...params
        };
        this.injuryService.getInjuries(queryParams).subscribe(data => {
            this.injuries = data;
            this.isLoading = false;
        });
    }

    ngOnInit(): void {
        if (this.route.parent) {
            this.route.parent.paramMap.subscribe(params => {
                this.userId = params.get('id');
                this.fetchInjuries();
            });
        } else {
            console.error('Parent route is not available.');
        }
    }

    onShiftSelected($event: ShiftEnum) {
        console.log('Selected shift:', $event);
        this.fetchInjuries({shift: $event});
    }

    selectedDate($event: { date: Date | null; mode: 'date' | 'month' | 'year' }) {
        if ($event.date) {
            const {day, month, year} = extractDateComponents($event.date, $event.mode);
            this.fetchInjuries({
                day: day ?? undefined,
                month: month ?? undefined,
                year: year ?? undefined
            });
        }
    }
}