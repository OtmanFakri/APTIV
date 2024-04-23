import {Component, OnInit} from '@angular/core';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";
import {Observable, switchMap} from "rxjs";
import {CertificationInterface, CertificationsResponseInterface} from "../../interfaces/ListCertificationInterface";
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../doctor.service";

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    NzDescriptionsComponent,
    NzDescriptionsItemComponent
  ],
  templateUrl: './doctor.component.html',
})
export class DoctorComponent implements OnInit{
  certifications$: Observable<CertificationInterface> = new Observable<CertificationInterface>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.certifications$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = parseInt(<string>params.get('id'), 10);
        return this.doctorService.getCertifications(id);
      }),
      switchMap((response: CertificationsResponseInterface) => response.items)
    );
  }
}
