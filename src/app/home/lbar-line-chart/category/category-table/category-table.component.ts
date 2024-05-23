import {Component, OnInit} from '@angular/core';
import {CertificateAnalyseByCategory} from "../../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {CategoryAnalyseCertificationService} from "../category-analyse-certification.service";
import {DecimalPipe, NgForOf} from "@angular/common";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    NzTableComponent,
    NzTbodyComponent,
    NzTheadComponent
  ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent implements OnInit {
  data: CertificateAnalyseByCategory[] = [];

  constructor(private categoryAnalyseService: CategoryAnalyseCertificationService) {}

  ngOnInit(): void {
    this.categoryAnalyseService.categoryListData.subscribe(
      (response: CertificateAnalyseByCategory[]) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
}
