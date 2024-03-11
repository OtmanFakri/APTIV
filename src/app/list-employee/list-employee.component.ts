import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../Components/pagination/pagination.component";

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    PaginationComponent,
  ],
  templateUrl: './list-employee.component.html'
})
export class ListEmployeeComponent {
  users : {
    role: string;
    imageUrl: string;
    name: string;
    title: string;
    department: string;
    email: string;
    status: string
  }[] = [
    {
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'lindsay.walton@example.com',
      title: 'Front-end Developer',
      department: 'Optimization',
      status: 'Active',
      role: 'Member'
    },
    {
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'lindsay.walton@example.com',
      title: 'Front-end Developer',
      department: 'Optimization',
      status: 'Active',
      role: 'Member'
    },
    {
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'lindsay.walton@example.com',
      title: 'Front-end Developer',
      department: 'Optimization',
      status: 'Active',
      role: 'Member'
    },
    {
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'lindsay.walton@example.com',
      title: 'Front-end Developer',
      department: 'Optimization',
      status: 'Active',
      role: 'Member'
    },
    {
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'lindsay.walton@example.com',
      title: 'Front-end Developer',
      department: 'Optimization',
      status: 'Active',
      role: 'Member'
    },


    ]
  searchTerm: string = '';
}
