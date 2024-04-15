import {Component, HostListener} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgIf, DashboardComponent, RouterLink, RouterLinkActive, NzDrawerComponent, NzDrawerContentDirective, NgClass, NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzHeaderComponent, NzLayoutComponent, NzIconDirective, NzMenuItemComponent, NzSiderComponent, NzMenuDirective, NzSubMenuComponent, NzContentComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  title = 'APTIV-Front';
  toggle_profile:boolean = false;
  close_side_bar:boolean = false;
  isCollapsed = false;


  constructor(private router: Router) { }


  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  toggleProfile(){
    this.toggle_profile = !this.toggle_profile;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.toggle_profile) {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        this.toggleProfile();
      }
    }
  }

  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
