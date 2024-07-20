import {SafeHtml} from "@angular/platform-browser";

export interface MenuGroup {
    title: string;
    items: MenuItem[];
}

export interface MenuItem {
    routerLink: string;
    icon: SafeHtml;
    label: string;
}