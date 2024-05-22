import {Component, Input, OnInit} from '@angular/core';
import {CertificateAnalyseTotal, ExaminitionGendre} from "../../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {ServiceGendreService} from "../service-gendre.service";
import {AnalyseCertitifcatesService} from "../../analyse-certitifcates.service";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent, NzTrDirective} from "ng-zorro-antd/table";
import {DecimalPipe, NgForOf} from "@angular/common";

@Component({
    selector: 'app-table-gendre',
    standalone: true,
    imports: [
        NzTableComponent,
        NzTheadComponent,
        NzTbodyComponent,
        NzTrDirective,
        NgForOf,
        DecimalPipe
    ],
    templateUrl: './table-gendre.component.html',
    styleUrl: './table-gendre.component.css'
})
export class TableGendreComponent implements OnInit {

    data: ExaminitionGendre[] = [];
    totals: CertificateAnalyseTotal | null = null;

    constructor(private serviceGendreService: ServiceGendreService,
                private analyseService: AnalyseCertitifcatesService) {
    }

    ngOnInit(): void {
        this.serviceGendreService.Listdata.subscribe(
            (response: ExaminitionGendre[]) => {
                this.data = response;
                this.totals = this.analyseService.calculateTotals(this.data);
            },
            (error) => {
                console.error('Error fetching data', error);
            }
        );
    }


}
