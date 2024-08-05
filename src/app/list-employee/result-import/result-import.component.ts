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
            success: [
                {"id": 23, "name": "TEST TEST"},
                {"id": 24, "name": "TEST TEST"},
                {"id": 2589, "name": "GADDOUR MOUNIR"},
                {"id": 2587, "name": "BOULAICH REDOUAN"},
                {"id": 43, "name": "EL HARRAK ABDENABI"},
                {"id": 4, "name": "TEST TEST"},
                {"id": 5, "name": "TEST TEST"},
                {"id": 6, "name": "TEST TEST"},
                {"id": 7, "name": "TEST TEST"},
                {"id": 46, "name": "BOUZID KHALID"},
                {"id": 50, "name": "HASSAR IMANE"},
                {"id": 88, "name": "AOULAD HMAIDI AMINA"},
                {"id": 96, "name": "SIF EDDINE HADJ ALI"},
                {"id": 104, "name": "MEKNASSI ABDELGHALLAB"},
                {"id": 123, "name": "BOUDGHYA MARIAM"},
                {"id": 131, "name": "RGHIOUI SENHAJI KARIM"},
                {"id": 142, "name": "AKALAY LAILA"},
                {"id": 172, "name": "BOULHANNA ISMAIL"},
                {"id": 174, "name": "AGHRIBI MOHAMMED"},
                {"id": 217, "name": "SOUJAA KHADIJA"},
                {"id": 219, "name": "AKHAZZAN ABDELMAJID"},
                {"id": 248, "name": "EL AMRIOUI HANANE"},
                {"id": 263, "name": "KHALIFA IHSSANE"},
                {"id": 283, "name": "AHADRI SANAE"},
                {"id": 318, "name": "HAOUAOUI HANANE"},
                {"id": 363, "name": "EL KHALFAOUI EL HASS HADDA"},
                {"id": 370, "name": "BEN EL MAAMMAR ABDELLATIF"},
                {"id": 374, "name": "BOUHSAIN ZOUHAIR"},
                {"id": 405, "name": "BERBIA AICHA"},
                {"id": 414, "name": "ELGHARBI KHADIJA"},
                {"id": 416, "name": "LAAKEL RHIMOU"},
                {"id": 426, "name": "GHRIBI LAROUSSI BACHIR"},
                {"id": 428, "name": "BENSTAHIR SERROUKH RACHIDA"},
                {"id": 437, "name": "BEDOUI HALIMA"},
                {"id": 460, "name": "ZEROUAL HASNA"},
                {"id": 461, "name": "ZEROUAL ASMAA"},
                {"id": 510, "name": "HADHOUD ZOHRA"},
                {"id": 533, "name": "EL NEJAR ABDELHAMID"},
                {"id": 543, "name": "EL HADDAD OURIAGHLI ABDELLATIF"},
                {"id": 609, "name": "BENHNIDA NAZHA"},
                {"id": 832, "name": "EL OUAHABI MOHAMMED"},
                {"id": 840, "name": "ELLEMTOUNI IMOUAHIDI JAMAL"},
                {"id": 844, "name": "KHATAB SOUMAYA"},
                {"id": 881, "name": "EL MALHI MALIKA"},
                {"id": 906, "name": "EL DIAZ SAID"},
                {"id": 1397, "name": "SOUSSI ZOHRA"},
                {"id": 973, "name": "EL AZHAR SOUAD"},
                {"id": 986, "name": "JAADI HANAN"},
                {"id": 987, "name": "JABRI MINA"},
                {"id": 1015, "name": "BARAKAT SAIDA"},
                {"id": 1024, "name": "BENFKIH HABIBA"},
                {"id": 1030, "name": "GHAJOUAN ABDELHADI"},
                {"id": 1037, "name": "EL BARNOUSSI SOUMIA"},
                {"id": 1041, "name": "TIJANI NADIA"},
                {"id": 1079, "name": "ABBAD ANDALOUSSI AOUATIF"},
                {"id": 1120, "name": "BENKHADRA KHADIJA"},
                {"id": 1132, "name": "GHARBI OMAR"},
                {"id": 1152, "name": "TAOURIRT RACHIDA"}
            ],
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
