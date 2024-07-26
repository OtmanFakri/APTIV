import {Component, OnInit} from '@angular/core';
import {ExportationService} from "./exportation.service";
import {DataExport} from "./InterfaceExportation";
import {Page} from "../../../change-post/InterfaceChnagePost";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-exportation',
    standalone: true,
    imports: [
        NzSpinComponent,
        NgIf,
        NgForOf
    ],
    templateUrl: './exportation.component.html',
})
export class ExportationComponent implements OnInit {

    exportations: Page<DataExport> | null = null;
    IsLoading = false;

    constructor(private exportationService: ExportationService) {
    }

    ngOnInit() {
        this.fetchExportations();
    }

    fetchExportations() {
        this.IsLoading = true;
        this.exportationService.getExportations().subscribe(
            (data) => {
                this.exportations = data;
                this.IsLoading = false;
            },
            (error) => {
                console.error('Error fetching exportations:', error);
                this.IsLoading = false;
            }
        );
    }

    cleanPath(path: string): string {
        return path.startsWith('./') ? path.substring(1) : path;
    }
}
