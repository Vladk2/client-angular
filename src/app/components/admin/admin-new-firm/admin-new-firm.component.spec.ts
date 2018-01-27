import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewFirmComponent } from './admin-new-firm.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AdminService } from '../../../services/admin-service/admin.service';

import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AdminNewFirmComponent', () => {
  let component: AdminNewFirmComponent;
  let fixture: ComponentFixture<AdminNewFirmComponent>;
  let sidebar: ComponentFixture<SidebarComponent>;
  let navbar: ComponentFixture<NavbarComponent>;
  let adminService: AdminService;

  beforeEach(async(() => {

    let adminServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminNewFirmComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientModule, HttpModule ],
      providers: [ {provide: AdminService, useValue: adminServiceMock} ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewFirmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
