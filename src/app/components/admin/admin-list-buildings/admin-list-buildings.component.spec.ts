import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import { AdminListBuildingsComponent } from './admin-list-buildings.component';
import { FormsModule }   from '@angular/forms';
import { AdminService } from '../../../services/admin-service/admin.service';
import { SupervisorService } from '../../../services/supervisor-service/supervisor.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { Building } from '../../../models/building/building.model';
import { Tenant } from '../../../models/user/tenant.model';

describe('AdminListBuildingsComponent', () => {
  let component: AdminListBuildingsComponent;
  let fixture: ComponentFixture<AdminListBuildingsComponent>;
  let adminService: any;
  let supervisorService: any;

  beforeEach(async(() => {

    const buildings = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
    ];

    const tenant = new Tenant();
    tenant.id = 1;
    tenant.userId = 1;
    tenant.supervisor = false;
    tenant.owner = true;
    tenant.buildingId = 1;

    let adminServiceMock = {
      getAllBuildings: jasmine.createSpy('getAllBuildings')
        .and.returnValue(Observable.from([buildings])),

      getTenantsByBuilding: jasmine.createSpy('getTenantsByBuilding')
        .and.returnValue(Observable.from([tenant])),

      makeSupervisor: jasmine.createSpy('makeSupervisor')
        .and.returnValue(Observable.from([])),

      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let supervisorServiceMock = {

      removeSupervisor: jasmine.createSpy('removeSupervisor')
        .and.returnValue(Observable.from([])),

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
    adminService = TestBed.get(AdminService);
    supervisorService = TestBed.get(SupervisorService);
    component = fixture.componentInstance;
  });

  it('should all buildings getAllBuildings()', fakeAsync(() => {
    component.ngOnInit();
    //console.log(component.buildings);
    expect(component.buildings[0].id).toEqual(1);
    expect(component.buildings[1].id).toEqual(2);
    expect(component.buildings[2].id).toEqual(3);
    expect(component.buildings[3].id).toEqual(4);
    tick();
  }));

  it('should openTenantsModal', fakeAsync(() => {
    component.openTenantsModal(1);
    expect(adminService.getTenantsByBuilding).toHaveBeenCalledWith(1);
    expect(component.tenantsModal).toEqual(true);
    tick();

  }));

  it('should makeSupervisor', () => {
    component.makeSupervisor(1, 1);
    expect(adminService.makeSupervisor).toHaveBeenCalledWith(1,1);
    expect(adminService.getTenantsByBuilding);
  });

  it('should hideModal()', () => {
    component.hideModal();

    expect(component.tenantsModal).toEqual(false);
  });

  it('should removeSupervisor1', () => {
    component.removeSupervisor1(1,10);

    expect(supervisorService.removeSupervisor).toHaveBeenCalledWith(1);
  });

});
