import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {ProfileService} from "../profile/profile.service";
import {FormData, PersonInformation, ProfessionalInformation} from "../profile/profile.module";


@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    PaginationComponent,
    NgOptimizedImage,
    RouterLink,
    NgIf,
  ],
  templateUrl: './list-employee.component.html'
})
export class ListEmployeeComponent implements OnInit {

  users: FormData[] = [

  ]

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.getProfile().forEach((profile) => {
      this.users.push(profile);
      console.log(profile);
    });
  }


  getRandomColor(name: string | undefined): string {
    const colors = ['#FF4500', '#FFD700', '#32CD32', '#008080', '#800080', '#0000FF', '#FF1493'];
    if (!name) {
      name = 'default'; // or any default string
    }
    const charCodeSum = name.charCodeAt(0) + (name.length > 1 ? name.charCodeAt(1) : 0);
    const index = charCodeSum % colors.length;
    return colors[index];
  }

  searchTerm: string = '';
  isFilterOpen: boolean = false;



}
