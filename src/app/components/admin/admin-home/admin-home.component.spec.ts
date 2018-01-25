import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';

import { AuthService } from '../../../services/auth-service/auth.service';
import { AdminService } from '../../../services/admin-service/admin.service';

import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  let sidebar: ComponentFixture<SidebarComponent>;
  let navbar: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let adminService: AdminService;

  beforeEach(async(() => {

    let adminHomeServiceMock = {
      ReqenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    }

    TestBed.configureTestingModule({
      declarations: [ AdminHomeComponent, SidebarComponent, NavbarComponent ],
      providers: [ {provide: AuthService, useValue: adminHomeServiceMock}],
      imports: [ RouterTestingModule,FormsModule ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    sidebar = TestBed.createComponent(SidebarComponent);
    navbar = TestBed.createComponent(NavbarComponent);
    authService = TestBed.get(AuthService);
    adminService = TestBed.get(AdminService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
