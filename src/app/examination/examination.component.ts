import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-examination',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule
  ],
  templateUrl: './examination.component.html',
})
export class ExaminationComponent implements  OnInit {

  searchQuery: string = '';
  teamName: string = '';
  teamType: string = '';
  teamSize: string = '';
  amount: number = 1000;
  category: string = '';
  groupType: string = '';

  showDropdown: boolean = false;
  showDropdownOne: boolean = false;
  showDropdownTwo: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  selectTeamType(type: string): void {
    this.teamType = type;
    this.showDropdown = false;
  }

  selectTeamSize(size: string): void {
    this.teamSize = size;
  }

  changeAmount(change: number): void {
    this.amount = Math.max(0, this.amount + change);
  }

  selectCategory(category: string): void {
    this.category = category;
    this.showDropdownOne = false;
  }

  selectGroupType(groupType: string): void {
    this.groupType = groupType;
    this.showDropdownTwo = false;
  }
}
