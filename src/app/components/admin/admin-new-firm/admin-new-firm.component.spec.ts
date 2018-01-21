import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewFirmComponent } from './admin-new-firm.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AdminService } from '../../../services/admin-service/admin.service';

import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('AdminNewFirmComponent', () => {
  let component: AdminNewFirmComponent;
  let fixture: ComponentFixture<AdminNewFirmComponent>;
  let sidebar: ComponentFixture<SidebarComponent>;
  let navbar: ComponentFixture<NavbarComponent>;
  let adminService: AdminService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewFirmComponent, SidebarComponent, NavbarComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientModule, HttpModule ],
      providers: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewFirmComponent);
    sidebar = TestBed.createComponent(SidebarComponent);
    navbar = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    adminService = TestBed.get(AdminService);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
