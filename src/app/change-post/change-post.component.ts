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
import {NzNotificationService} from 'ng-zorro-antd/notification';

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
    is_loading_CreateOrUpdate = false;
    visibleCreate = false;
    visibleUpdate = false;
    visibleFilter: boolean = false;
    changePostResponse!: ChangePostResponse;

    constructor(private postChangeService: PostChangeService,
                private notification: NzNotificationService) {
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
        this.is_loading_CreateOrUpdate = true;
        if (this.createOrUpdatePostComponent) {
            // Accessing changePostForm safely
            this.postChangeService.createChangePost(this.createOrUpdatePostComponent.changePostForm.value).subscribe({
                next: (response: ChangePostResponse) => {
                    console.log('Post created:', response);
                    this.is_loading_CreateOrUpdate = false;
                    this.notification.success('Post created',
                        'The post was created successfully',
                        {nzPlacement: 'bottomLeft'});
                    this.loadChangePosts();
                },
                error: (error) => {
                    console.error('Error creating post:', error);
                    this.is_loading_CreateOrUpdate = false;
                    this.notification.error('Error creating post',
                        'There was an error creating the post',
                        {nzPlacement: 'bottomLeft'});
                }
            }); // Handle response
        }
    }

    OnUpdatePost() {
        if (this.createOrUpdatePostComponent) {
            this.is_loading_CreateOrUpdate = true;
            const id = this.changePostResponse.id;
            const data = this.createOrUpdatePostComponent.changePostForm.value;
            console.log('Updating post:', id, data);
            this.postChangeService.updateChangePost(id, data).subscribe({
                next: (response: ChangePostResponse) => {
                    console.log('Post updated:', response);
                    this.is_loading_CreateOrUpdate = false;
                    this.notification.success('Post updated',
                        'The post was updated successfully',
                        {nzPlacement: 'bottomLeft'});
                    this.loadChangePosts();
                },
                error: (error) => {
                    console.error('Error updating post:', error);
                    this.is_loading_CreateOrUpdate = false;
                    this.notification.error('Error updating post',
                        'There was an error updating the post',
                        {nzPlacement: 'bottomLeft'});
                }
            });

        }
    }

    OnDeletePost() {
        if (this.changePostResponse) {
            this.is_loading_CreateOrUpdate = true;
            this.postChangeService.deleteChangePost(this.changePostResponse.id).subscribe({
                next: () => {
                    console.log('Post deleted');
                    this.is_loading_CreateOrUpdate = false;
                    this.notification.success('Post deleted',
                        'The post was deleted successfully',
                        {nzPlacement: 'bottomLeft'});
                    this.loadChangePosts();
                },
                error: (error) => {
                    console.error('Error deleting post:', error);
                    this.is_loading_CreateOrUpdate = false;
                    this.notification.error('Error deleting post',
                        'There was an error deleting the post',
                        {nzPlacement: 'bottomLeft'});
                }
            });
        }
    }

    openUpdate(post: ChangePostResponse) {
        this.changePostResponse = post;
        this.visibleUpdate = true;
    }
}
