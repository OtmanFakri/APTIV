import {Component, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {AddExaminiationComponent} from "./add-examiniation/add-examiniation.component";
import {NzListGridDirective, NzListItemComponent} from "ng-zorro-antd/list";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzListModule} from 'ng-zorro-antd/list';
import {ExaminitationService} from "./examinitation.service";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {Router} from "@angular/router";


@Component({
  selector: 'app-examination',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NzListModule,
    NzInputNumberModule,
    NzModalModule,
    FormsModule,
    NzUploadComponent,
    NzButtonComponent,
    NzRadioGroupComponent,
    NzRadioComponent,
    NgForOf,
    NzModalComponent,
    NgStyle,
    NzDatePickerComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    NzInputNumberComponent,
    AddExaminiationComponent,
    NzListGridDirective,
    NzRowDirective,
    NzColDirective,
    NzListItemComponent,
    NzCardComponent,
    NzDrawerModule,
    NzTagComponent
  ],
  templateUrl: './examination.component.html',
})
export class ExaminationComponent implements OnInit {

  @ViewChild(AddExaminiationComponent) addExaminiationComponent!: AddExaminiationComponent;
  data: any[] = [];


  constructor(private examinitationService: ExaminitationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.examinitationService.GetConsulation().subscribe(
      (data: any[]) => {
        this.data = data
      },
      (error) => {
        console.error('Error fetching consultation data:', error);
      }
    );
  }


  isCreate = false;


  showCreate()
    :
    void {
    this.isCreate = true;
  }

  handleCreateOk()
    :
    void {
    console.log('Button ok clicked!');
    this.addExaminiationComponent.onSubmit();
    this.isCreate = false;
  }

  handleCreateCancel()
    :
    void {
    console.log('Button cancel clicked!');
    this.isCreate = false;
  }

  protected readonly console = console;

  viewProjectDetails(item: any) {
    this.router.navigate(['/examination', item.id]);
  }
}
