import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewBuildingComponent } from './admin-new-building.component';
import { FormsModule }   from '@angular/forms';
import { AdminService } from '../../../services/admin-service/admin.service';
import { RouterTestingModule } from '@angular/router/testing';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AdminNewBuildingComponent', () => {
  let component: AdminNewBuildingComponent;
  let fixture: ComponentFixture<AdminNewBuildingComponent>;

  beforeEach(async(() => {

    let adminServiceMock = {
      RegenerateDate$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminNewBuildingComponent ],
      providers: [
        {provide: AdminService, useValue: adminServiceMock}
      ],
      imports: [ FormsModule, RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewBuildingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
