import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TenantService } from './tenant.service';
import { Announcement } from '../../models/announcement/announcement.model';

describe('TenantService', () => {

  let service: TenantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    service = TestBed.get(TenantService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(true).toBe(true);
  });

  it('should post an announcement', () => {

    const tenantId = 1;
    const ann = new Announcement();
    ann.title = 'Naslov obavestenja';
    ann.message = 'Pouka';
    service.postAnnouncement(tenantId, ann).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/tenants/announcement/' + tenantId);

    expect(request.request.method).toBe('POST');
  });

  it('should register new abode', () => {

    const tenantId = 1;
    const abode = {'builId': 2, 'apartmentNo': 12};
    service.createNewTenant(abode).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/tenants/');

    expect(request.request.method).toBe('POST');

  });


  it('should get all annoucements for a logged-in tenant', () => {
    const anns = [];
    const ann = new Announcement();
    ann.title = 'Naslov obavestenja';
    ann.message = 'Pouka';
    const tenantId = 2;
    anns.push(ann);
    service.getAnnouncements(tenantId).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res.length).toBe(1);
      expect(res[0].message).toBe('Pouka');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/tenants/announcement/' + tenantId);

    expect(request.request.method).toBe('GET');

    request.flush(anns);
  });


});
