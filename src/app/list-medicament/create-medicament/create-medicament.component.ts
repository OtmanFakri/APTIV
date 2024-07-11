import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MedicamentService} from "../medicament.service";
import {AutocompleteComponentComponent} from "../autocomplete-component/autocomplete-component.component";
import {Datum, MedicamentDetail} from "../InterfacesMedicaments";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {NzNotificationModule, NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-create-medicament',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        AutocompleteComponentComponent,
        NzDrawerModule,
        JsonPipe,
        NgForOf,
        NgIf,
        NzNotificationModule
    ],
    templateUrl: './create-medicament.component.html',
})
export class CreateMedicamentComponent {
    medicamentForm: FormGroup;
    selectedValues!: Datum;
    DetailMedicament!: MedicamentDetail;
    extractedNumber: number | null = null;

    constructor(private fb: FormBuilder,
                private medicamentService: MedicamentService,
                private notification: NzNotificationService
    ) {
        this.medicamentForm = this.fb.group({
            name: ['', Validators.required],
            quantity: [0, Validators.required],
            id_product: [0, Validators.required]
        });
    }

    handleValueSelected(event: any) {
        this.selectedValues = event;
        this.extractNumberFromSnapshot();
        this.medicamentForm.patchValue({
            name: this.selectedValues.name,
            id_product: this.selectedValues.id,
            quantity: this.extractedNumber ?? 0
        })
    }

    visibleMoreDetail = false;

    openMoreDetail(): void {
        if (this.selectedValues !== undefined && this.selectedValues !== null) {
            this.visibleMoreDetail = true;
            this.medicamentService.informationMedicament(this.selectedValues.id).subscribe(response => {
                this.DetailMedicament = response;
            });
        }
    }

    closeMoreDetail(): void {
        this.visibleMoreDetail = false;
    }

    onSubmit(callback?: () => void) {
        if (this.medicamentForm.valid) {
            this.medicamentService.createMedicament(this.medicamentForm.value).subscribe(response => {
                console.log('Medicament created:', response);
                this.notification.success('Success',
                    'Medicament created successfully!',
                    {nzPlacement: 'bottomLeft'});
                if (callback) {
                    callback();
                }
            }, error => {
                console.error('Error creating medicament:', error);
                this.notification.error('Error',
                    'Failed to create medicament.',
                    {nzPlacement: 'bottomLeft'});
            });
        }
    }


    extractNumberFromSnapshot(): void {
        if (this.selectedValues && this.selectedValues.snapshot &&
            this.selectedValues.snapshot.includes('Boîte') || this.selectedValues.snapshot.includes('Boite')) {
            const snapshotValue = this.selectedValues.snapshot;
            const numberMatch = snapshotValue.match(/\d+/);
            if (numberMatch) {
                this.extractedNumber = parseInt(numberMatch[0], 10);
            } else {
                this.extractedNumber = null;
            }
        } else {
            this.extractedNumber = null;
        }
    }
}
