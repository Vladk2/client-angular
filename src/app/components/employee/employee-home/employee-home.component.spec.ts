import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHomeComponent } from './employee-home.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../services/auth-service/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('EmployeeHomeComponent', () => {
  let component: EmployeeHomeComponent;
  let fixture: ComponentFixture<EmployeeHomeComponent>;
  let sidebar: ComponentFixture<SidebarComponent>;
  let navbar: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeHomeComponent, SidebarComponent, NavbarComponent ],
      imports: [ RouterTestingModule ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHomeComponent);
    sidebar = TestBed.createComponent(SidebarComponent);
    navbar = TestBed.createComponent(NavbarComponent);
    authService = TestBed.get(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
