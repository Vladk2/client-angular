import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {SupervisorService} from './supervisor.service';

describe('SupervisorService', () => {

  let service: SupervisorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupervisorService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    service = TestBed.get(SupervisorService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(true).toBe(true);
  });

  it('should remove supervisor #removeSupervisor', () => {
    const supervisorId = 1;

    service.removeSupervisor(supervisorId).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const request = httpMock.expectOne('http://localhost:8080/api/supervisors/' + supervisorId);

    expect(request.request.method).toBe('DELETE');

    request.flush({status: 200});
  });

  it('should register new tenant #approveTenant', () => {
    const tenantUsername = 'misko';
    const buildingId = 1;
    const apartmentNo = 17;

    service.approvateTenant(tenantUsername, buildingId, apartmentNo).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/supervisors/tenants/'
      + tenantUsername + '/buildings/' + buildingId + '/' + apartmentNo);

    expect(request.request.method).toBe('GET');
  });
});
