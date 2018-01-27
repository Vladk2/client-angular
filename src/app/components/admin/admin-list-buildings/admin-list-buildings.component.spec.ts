import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListBuildingsComponent } from './admin-list-buildings.component';
import { FormsModule }   from '@angular/forms';
import { AdminService } from '../../../services/admin-service/admin.service';
import { SupervisorService } from '../../../services/supervisor-service/supervisor.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AdminListBuildingsComponent', () => {
  let component: AdminListBuildingsComponent;
  let fixture: ComponentFixture<AdminListBuildingsComponent>;

  beforeEach(async(() => {

    let adminServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let supervisorServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminListBuildingsComponent ],
      providers: [
        {provide: AdminService, useValue: adminServiceMock},
        {provide: SupervisorService, useValue: supervisorServiceMock}
      ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListBuildingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
