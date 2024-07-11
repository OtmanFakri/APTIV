import {Component, OnInit, TemplateRef, ViewChild, viewChild} from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CreateMedicamentComponent} from "./create-medicament/create-medicament.component";
import {MedicamentService} from "./medicament.service";
import {JsonPipe, NgForOf, NgTemplateOutlet} from "@angular/common";
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {MedicamentDetail} from "./InterfacesMedicaments";
import {NzNotificationComponent, NzNotificationModule, NzNotificationService} from 'ng-zorro-antd/notification';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {ListMedicaments} from "./InteracesMedicaments";
import {FormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
    selector: 'app-list-medicament',
    standalone: true,
    imports: [
        NzModalModule,
        CreateMedicamentComponent,
        NgForOf,
        NzCardModule,
        NzIconDirective,
        NzDrawerModule,
        NgTemplateOutlet,
        JsonPipe,
        NzButtonComponent,
        PaginationComponent,
        FormsModule,
    ],
    templateUrl: './list-medicament.component.html',

})
export class ListMedicamentComponent implements OnInit {
    @ViewChild(CreateMedicamentComponent) childComponent!: CreateMedicamentComponent;
    @ViewChild('notificationBtnTpl', {static: true}) btnConfrmationDelete!: TemplateRef<{
        $implicit: NzNotificationComponent
    }>;
    searchTerm = '';
    listMedicament!: ListMedicaments;
    CreateisVisible = false;

    titleDrawwe = '';
    private searchTerms = new Subject<string>();

    DetailMedicament!: MedicamentDetail;
    private drugToDelete: any;
    isConfirmLoading = false;

    constructor(private medicamentService: MedicamentService,
                private notification: NzNotificationService) {
    }

    ngOnInit(): void {
        this.initializeSearch();
        this.fetchMedicament();
    }

    initializeSearch() {
        this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(term => {
            this.fetchMedicament(1, term);
        });
    }

    onSearchChange(term: string) {
        this.searchTerms.next(term);
    }

    fetchMedicament(page: number = 1, term: string = this.searchTerm): void {
        this.medicamentService.readMedicament(page, term).subscribe((data: any) => {
            this.listMedicament = data;
        });
    }

    CreateshowModal(): void {
        this.CreateisVisible = true;
    }

    CreatehandleOk(): void {
        if (this.childComponent) {
            this.isConfirmLoading = true;
            this.childComponent.onSubmit(() => {
                this.fetchMedicament();
                this.CreateisVisible = false;
                this.isConfirmLoading = false;
            });
        } else {
            this.isConfirmLoading = true;
            this.fetchMedicament();
            this.CreateisVisible = false;
            this.isConfirmLoading = false;
        }
    }

    CreatehandleCancel(): void {
        this.CreateisVisible = false;
    }

    Detailvisible = false;

    Detailopen(drug: any): void {
        this.Detailvisible = true;
        this.titleDrawwe = drug.name;
        this.medicamentService.informationMedicament(drug.id_product).subscribe(response => {
            this.DetailMedicament = response;
        });
    }

    Detailclose(): void {
        this.Detailvisible = false;
    }

    onDelete(): void {
        if (this.drugToDelete && this.drugToDelete.id) {
            this.isConfirmLoading = true;
            this.medicamentService.DeleteMedicament(this.drugToDelete.id).subscribe({
                next: () => {
                    this.fetchMedicament();
                    this.notification.success('Success', 'Medicament deleted successfully', {
                        nzPlacement: 'bottomLeft'
                    });
                },
                error: (error) => {
                    console.error('Error deleting medicament:', error);
                    this.notification.error('Error', 'Failed to delete medicament', {
                        nzPlacement: 'bottomLeft'
                    });
                },
                complete: () => {
                    this.isConfirmLoading = false;
                }
            });
        } else {
            console.error('No drug selected for deletion');
            this.notification.warning('Warning', 'No drug selected for deletion', {
                nzPlacement: 'bottomLeft'
            });
        }
    }

    openNotification(drug: any): void {
        this.drugToDelete = drug;
        this.notification.blank(
            'Confirm Delete',
            'Are you sure you want to delete this drug?',
            {
                nzPlacement: 'bottomLeft',
                nzButton: this.btnConfrmationDelete
            }
        );
    }

    onPageChange(page: number) {
        this.fetchMedicament(page)
    }
}