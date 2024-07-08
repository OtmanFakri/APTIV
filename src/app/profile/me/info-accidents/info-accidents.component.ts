import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UploadingFileService} from "../../../Components/uploading-file/uploading-file.service";
import {CertificatesService} from "../../../list-certification/certificates.service";
import {InjuryService} from "../../../Injury/injury.service";
import {InjuryInterfcae, InjuryQueryParams} from "../../../Injury/InjuryInterfcae";
import {ShiftSelectorComponent} from "../../../Components/shift-selector/shift-selector.component";
import {ShiftEnum} from "../../../enum/ShiftEnum";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-info-accidents',
  standalone: true,
  imports: [
    ShiftSelectorComponent,
    NgForOf
  ],
  templateUrl: './info-accidents.component.html',
})
export class InfoAccidentsComponent implements OnInit {
  userId: any;
  injuries!: InjuryInterfcae;

  constructor(private route: ActivatedRoute,
              private injuryService: InjuryService) {

  }

  fetchInjuries() {
    const queryParams: InjuryQueryParams = {
      employeeId: this.userId,
      //shift: 'night',
      //day: 1,
      //month: 1,
      //year: 2023,
    };

    this.injuryService.getInjuries(queryParams).subscribe(data => {
      //this.injuries = data;
      console.log("Injuries:", this.injuries);
    });
  }

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.paramMap.subscribe(params => {
        this.userId = params.get('id');
      });
    } else {
      // Handle the case where parent is null if necessary
      console.error('Parent route is not available.');
    }
  }

  onShiftSelected($event: ShiftEnum) {
    console.log('Selected shift:', $event);

  }
}
