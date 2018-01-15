import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantProblemComponent } from './tenant-problem.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';


describe('TenantProblemComponent', () => {
  let component: TenantProblemComponent;
  let fixture: ComponentFixture<TenantProblemComponent>;
  let sidebar: ComponentFixture<SidebarComponent>;
  let navbar: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantProblemComponent, SidebarComponent, NavbarComponent ],
      imports: [ RouterModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantProblemComponent);
    sidebar = TestBed.createComponent(SidebarComponent);
    navbar = TestBed.createComponent(NavbarComponent);
    authService = TestBed.get(AuthService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
