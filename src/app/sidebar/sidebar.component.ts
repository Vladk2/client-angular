import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Početna',  icon: 'pe-7s-graph', class: '' },
    { path: 'profile', title: 'Vaš profil',  icon: 'pe-7s-user', class: '' },
    { path: 'lists', title: 'Lista',  icon: 'pe-7s-note2', class: '' },
    { path: 'news/building', title: 'Dodavanje',  icon: 'pe-7s-plus', class: '' },
    { path: 'message', title: 'Poruke',  icon: 'pe-7s-global', class: '' }
];

export const ROUTES_FIRM: RouteInfo[] = [
    { path: 'dashboard', title: 'Početna',  icon: 'pe-7s-graph', class: '' },
    { path: 'firm', title: 'Lista zaposlenih',  icon: 'pe-7s-user', class: '' },
    { path: 'employee', title: 'Dodati zaposlenog',  icon: 'pe-7s-note2', class: '' },
    { path: 'message', title: 'Kvarovi',  icon: 'pe-7s-edit', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    // this.menuItems1 = ROUTES_FIRM.filter(menuItems1 => menuItems1);
    // this.provera = true;
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }


  onLogout() {
    this.authService.logout_service();
  }
}
