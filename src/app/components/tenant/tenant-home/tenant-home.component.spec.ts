import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantHomeComponent } from './tenant-home.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TenantService } from '../../../services/tenant-service/tenant.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AlertService } from "../../../services/alert-service/alert.service";
import { AuthService } from '../../../services/auth-service/auth.service';

describe('TenantHomeComponent', () => {
  let component: TenantHomeComponent;
  let fixture: ComponentFixture<TenantHomeComponent>;
  let sidebar: ComponentFixture<SidebarComponent>;
  let navbar: ComponentFixture<NavbarComponent>;
  let tenantService: TenantService;
  let alertService: AlertService
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantHomeComponent, SidebarComponent, NavbarComponent ],
      providers: [ TenantService, AlertService ],
      imports: [ FormsModule, RouterTestingModule, HttpClientModule, HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantHomeComponent);
    sidebar = TestBed.createComponent(SidebarComponent);
    navbar = TestBed.createComponent(NavbarComponent);
    authService = TestBed.get(AuthService)
    alertService = TestBed.get(AlertService)
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
