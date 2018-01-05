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
    { path: '', title: 'Profil',  icon: '', class: '' },
    { path: 'admin', title: 'Početna',  icon: 'pe-7s-graph', class: '' },
    { path: 'admin/lists', title: 'Lista',  icon: 'pe-7s-note2', class: '' },
    { path: 'admin/news', title: 'Dodavanje',  icon: 'pe-7s-plus', class: '' }
];

export const ROUTES_EMPLOYEE: RouteInfo[] = [
    { path: 'employee', title: 'Početna',  icon: 'pe-7s-graph', class: '' },
    { path: 'employee/lists', title: 'Lista',  icon: 'pe-7s-note2', class: '' },
    { path: 'employee/news', title: 'Dodavanje',  icon: 'pe-7s-plus', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuRoles: any[];
  title = '';
  ROUTES_TENANT: any[];
  ROUTES_SUPERVISOR: any[];
  ROLES: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSupervisor(event) {
    this.ROUTES_SUPERVISOR = [
      { path: '', title: 'Profil',  icon: 'pe-7s-graph', class: '' },
      { path: 'supervisor/' + event, title: 'Početna',  icon: 'pe-7s-graph', class: '' },
      { path: 'supervisor/nesto/' + event, title: 'novi supervisor',  icon: 'pe-7s-user', class: '' },
    ];

    this.menuItems = this.ROUTES_SUPERVISOR.filter(menuItem => menuItem);
    document.getElementById('myRole').style.display = 'none';
    this.title = 'SUPERVISOR ' + event;
    

  }

  onTenant(event) {
    this.ROUTES_TENANT = [
      { path: '', title: 'Profil',  icon: 'pe-7s-graph', class: '' },
      { path: 'tenant', title: 'Početna',  icon: 'pe-7s-graph', class: '' },
      { path: 'tenant/' + event, title: 'novi tenant',  icon: 'pe-7s-user', class: '' },
    ];

    this.menuItems = this.ROUTES_TENANT.filter(menuItem => menuItem);
    document.getElementById('myRole').style.display = 'none';
    this.title = 'TENANT ' + event;
  }

  onRole() {
    document.getElementById('myRole').style.display = 'block';
    const token = JSON.parse(localStorage.getItem('token'));
    this.ROLES = [
        { role: token.roles.admin, button: '', id: '', elementID: '' },
        { role: token.roles.employee, button: '', id: '', elementID: '' },
        { role: token.roles.supervisor, button: 'supervisor', idSupervisors: token.supervisors_id, elementID: 'mySupervisor' },
        { role: token.roles.tenant, button: 'tenant', idTenants: token.tenants_id, elementID: 'myTenant' }
    ];
    this.menuRoles = this.ROLES.filter(menuItem => menuItem);
  }

  onShow(role, event) {
    if (role === 'ADMIN') {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      document.getElementById('myRole').style.display = 'none';
      this.title = 'ADMIN';
    }
    if (role === 'EMPLOYEE') {
      this.menuItems = ROUTES_EMPLOYEE.filter(menuItem => menuItem);
      document.getElementById('myRole').style.display = 'none';
      this.title = 'EMPLOYE';
    }
    if (event === 'tenant') {
      document.getElementById('myTenant').style.display = 'block';
    }
    if (event === 'supervisor') {
      document.getElementById('mySupervisor').style.display = 'block';
    }
  }
  
  onLogout() {
    this.authService.logout_service();
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
