import {Component, OnInit, ViewChild} from '@angular/core';
import {ChangePostResponse, Page, QueryParams} from "./InterfaceChnagePost";
import {PostChangeService} from "./post-change.service";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {FilterInjuryComponent} from "../list-injury/filter-injury/filter-injury.component";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {FilterPostChangeComponent} from "./filter-post-change/filter-post-change.component";
import {CreateOrUpdatePostComponent} from "./create-or-update-post/create-or-update-post.component";

@Component({
    selector: 'app-change-post',
    standalone: true,
    imports: [
        NzSpinComponent,
        NgForOf,
        DatePipe,
        NgIf,
        NzButtonComponent,
        FilterInjuryComponent,
        NzDrawerComponent,
        FilterPostChangeComponent,
        NzDrawerContentDirective,
        CreateOrUpdatePostComponent
    ],
    templateUrl: './change-post.component.html',
})
export class ChangePosdahtComponent implements OnInit {
    @ViewChild(FilterPostChangeComponent) filterPostChangeComponent!: FilterPostChangeComponent;
    @ViewChild(CreateOrUpdatePostComponent) createOrUpdatePostComponent!: CreateOrUpdatePostComponent;

    changePosts!: Page<ChangePostResponse>;
    QueryParams!: QueryParams;
    is_loading = false;
    visibleCreate = false;
    visibleUpdate = false;
    visibleFilter: boolean = false;
    changePostResponse!: ChangePostResponse;

    constructor(private postChangeService: PostChangeService) {
    }


    ngOnInit() {
        this.loadChangePosts();
    }

    loadChangePosts(QueryParams: QueryParams = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
    }): void {
        this.is_loading = true;
        this.postChangeService.getChangePosts(QueryParams).subscribe({
            next: (response: Page<ChangePostResponse>) => {
                this.changePosts = response;
                this.is_loading = false;
            },
            error: (error) => {
                console.error('Error fetching change posts:', error);
                this.is_loading = false;
            }
        });
    }

    openFilter() {
        this.visibleFilter = true;
    }

    createNew() {
        this.visibleCreate = true;
    }

    Update() {
        this.visibleUpdate = true;
    }

    closeFilter() {
        this.visibleFilter = false;
    }

    closeCretae() {
        this.visibleCreate = false;
    }

    closeUpdate() {
        this.visibleUpdate = false;
    }

    OnsubmetFilter() {
        const filter = this.filterPostChangeComponent.queryForm.value
        this.loadChangePosts(filter);
    }

    OnCreatePost() {
        if (this.createOrUpdatePostComponent) {
            // Accessing changePostForm safely
            console.log(this.createOrUpdatePostComponent.changePostForm.value);
        }
    }

    OnUpdatePost() {
        this.createOrUpdatePostComponent.changePostForm.value
    }

    OnDeletePost() {
    }

    openUpdate(post: ChangePostResponse) {
        this.changePostResponse = post;
        this.visibleUpdate = true;
    }
}
