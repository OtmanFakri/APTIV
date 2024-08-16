import {Component, OnInit} from '@angular/core';
import {ExportationService} from "./exportation.service";
import {DataExport} from "./InterfaceExportation";
import {Page} from "../../../change-post/InterfaceChnagePost";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NgForOf, NgIf} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";

@Component({
    selector: 'app-exportation',
    standalone: true,
    imports: [
        NzSpinComponent,
        NgIf,
        NgForOf,
        NzPaginationComponent
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

    fetchExportations(page: number = 1) {
        this.IsLoading = true;
        this.exportationService.getExportations(page).subscribe(
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

    getFullApiUrl(path: string): string {
        const cleanedPath = this.cleanPath(path);
        return `${environment.Url}${cleanedPath}`;
    }

    onPageIndexChange($event: number) {
        this.fetchExportations($event);
    }
}
