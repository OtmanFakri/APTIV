import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";

@Component({
    selector: 'app-pagination',
    standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    SlicePipe
  ],
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {

    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;
    @Input() size: number = 0;
    @Input() total: number = 0
    @Output() pageChange: EventEmitter<number> = new EventEmitter();

    navigateToPage(page: number): void {
        this.pageChange.emit(page);
    }

}
