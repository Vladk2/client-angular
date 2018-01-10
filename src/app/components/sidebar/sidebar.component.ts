import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES_ADMIN: RouteInfo[] = [
    { path: '/admin', title: 'Početna',  icon: 'pe-7s-graph', class: '' },
    { path: '/admin/lists', title: 'Lista',  icon: 'pe-7s-note2', class: '' },
    { path: '/admin/news', title: 'Dodavanje',  icon: 'pe-7s-plus', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuRoles: any[];
  title = '';
  tenants_id;
  employee_id;
  ROUTES_TENANT: any[];
  ROUTES_SUPERVISOR: any[];
  ROLES: any[];
  ROUTES_EMPLOYEE: any[];

  constructor(private authService: AuthService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    if(localStorage.getItem('sidebar')){
      const token = localStorage.getItem('sidebar');
      if(token === 'admin') {
        this.menuItems = ROUTES_ADMIN;
        this.title = "ADMIN PANEL";
      } else if(token === 'employee') {
        let employee_id;
        this.activeRoute.params.subscribe(params => {
          this.employee_id = (params['id']);

        });
        this.title = "ZAPOSLENI";
        this.ROUTES_EMPLOYEE = [
          { path: '/employee/'+this.employee_id, title: 'Početna',  icon: 'pe-7s-graph', class: '' },
          { path: '/employee/'+this.employee_id, title: 'Popravke',  icon: 'pe-7s-note2', class: '' },
        ]

      } else if(token === 'tenant') {
        this.title = "STANAR";
        let tenants_id;
        this.activeRoute.params.subscribe(params => {
                 this.tenants_id = (params['id']);

              });

        this.ROUTES_TENANT = [
          { path: '/tenant/' + this.tenants_id, title: 'Početna',  icon: 'pe-7s-home', class: '' },
          { path: '/tenant/' + this.tenants_id + "/kvarovi", title: 'Kvarovi',  icon: 'pe-7s-tools', class: '' },
        ];
        this.menuItems = this.ROUTES_TENANT;
      }
    }
  }

  
/*
  onSupervisor(event) {
    this.ROUTES_SUPERVISOR = [
      { path: '', title: 'Profil',  icon: 'pe-7s-graph', class: '' },
      { path: 'supervisor/' + event, title: 'Početna',  icon: 'pe-7s-graph', class: '' },
      { path: 'supervisor/nesto/' + event, title: 'novi supervisor',  icon: 'pe-7s-user', class: '' },
    ];

    this.menuItems = this.ROUTES_SUPERVISOR.filter(menuItem => menuItem);
    document.getElementById('myRole').style.display = 'none';
    this.title = 'SUPERVISOR ' + event;
    
    localStorage.setItem("sidebar", "supervisor");
    localStorage.setItem("supervisorSide", event);
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

    localStorage.setItem("sidebar", "tenant");
    localStorage.setItem("tenantSide", event);
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
      this.menuItems = ROUTES_ADMIN.filter(menuItem => menuItem);
      document.getElementById('myRole').style.display = 'none';
      this.title = 'ADMIN';
      localStorage.setItem("sidebar", "admin");
    }
    if (role === 'EMPLOYEE') {
      this.menuItems = ROUTES_EMPLOYEE.filter(menuItem => menuItem);
      document.getElementById('myRole').style.display = 'none';
      this.title = 'EMPLOYE';
      localStorage.setItem("sidebar", "emloyee");
    }
    if (event === 'tenant') {
      document.getElementById('myTenant').style.display = 'block';
    }
    if (event === 'supervisor') {
      document.getElementById('mySupervisor').style.display = 'block';
    }
  }
  */
  logout() {
    this.authService.logout_service();
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
