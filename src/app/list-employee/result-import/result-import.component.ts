import {Component, Input} from '@angular/core';
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {ImportResult} from "../../interfaces/ListEmployee";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {NzTableComponent, NzTheadComponent} from "ng-zorro-antd/table";


@Component({
    selector: 'app-result-import',
    standalone: true,
    imports: [
        NzTabSetComponent,
        NzTabComponent,
        NgForOf,
        JsonPipe,
        NgIf,
        NzTableComponent,
        NzTheadComponent
    ],
    templateUrl: './result-import.component.html',
})
export class ResultImportComponent {
    @Input() results: ImportResult = {
        message: 'Import successful',
        results: {
            success: [],
            existing: [],
            deleted: [],
            errors: []
        }
    };

    get successResults() {
        return this.results?.results.success || [];
    }

    get existingResults() {
        return this.results?.results.existing || [];
    }

    get deletedResults() {
        return this.results?.results.deleted || [];
    }

    get errorResults() {
        return this.results?.results.errors || [];
    }
}
