import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListFirmsComponent } from './admin-list-firms.component';
import { FormsModule }   from '@angular/forms';
import { AdminService } from '../../../services/admin-service/admin.service';
import {ConfirmationService} from 'primeng/primeng';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AdminListFirmsComponent', () => {
  let component: AdminListFirmsComponent;
  let fixture: ComponentFixture<AdminListFirmsComponent>;

  beforeEach(async(() => {

    let adminServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminListFirmsComponent ],
      imports: [ FormsModule ],
      providers: [
        ConfirmationService,
        {provide: AdminService, useValue: adminServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListFirmsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
