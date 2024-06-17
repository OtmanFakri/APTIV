import {Component, OnInit, ViewChild, viewChild} from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CreateMedicamentComponent} from "./create-medicament/create-medicament.component";
import {MedicamentService} from "./medicament.service";
import {JsonPipe, NgForOf, NgTemplateOutlet} from "@angular/common";
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {MedicamentDetail} from "./InterfacesMedicaments";

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
  ],
  templateUrl: './list-medicament.component.html',

})
export class ListMedicamentComponent implements OnInit {
  @ViewChild(CreateMedicamentComponent) childComponent!: CreateMedicamentComponent;
  listMedicament: any = [];
  CreateisVisible = false;
  titleDrawwe = '';
  DetailMedicament!: MedicamentDetail;

  constructor(private medicamentService: MedicamentService) {
  }


  ngOnInit(): void {
    this.fetchMedicament();
  }

  async fetchMedicament() {
    this.medicamentService.readMedicament().subscribe((data: any) => {
      // Ensure your data has the required structure
      this.listMedicament = data.items.map((item: any) => ({
        name: item.name,
        id: item.id,
        id_product: item.id_product,
        cover: "https://cdn-icons-png.flaticon.com/512/4320/4320344.png" // Ensure this matches your actual data field
      }));
    });
  }

  CreateshowModal(): void {
    this.CreateisVisible = true;
  }

  CreatehandleOk(): void {
    if (this.childComponent) {
      this.childComponent.onSubmit();
      this.fetchMedicament();
    }
    this.fetchMedicament();

    this.CreateisVisible = false;
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

}
