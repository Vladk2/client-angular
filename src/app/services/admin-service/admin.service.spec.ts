import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdminService } from './admin.service';

describe('AdminService', () => {

  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService],
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.get(AdminService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(true).toBe(true);
  });

  it('getAllBuildings() should query current service url', () => {
    const buildingPost = [
      {id: 1, addressDTO: {id: 1, street: 'Dr Svetislava Kasapinovica', number: 21, city: 'Novi Sad', zip: '21000'}},
      {id: 2, addressDTO: {id: 2, street: 'Dr Svetislava Kasapinovica', number: 25, city: 'Novi Sad', zip: '21000'}}
    ];
    service.getAllBuildings().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(buildingPost);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/buildings/');

    expect(request.request.method).toBe('GET');

    request.flush(buildingPost);
  });

  it('getProfile() should query current service url', () => {
    const userPost = {
      id: 1,
      username: 'nole',
      password: '123',
      name: 'Novica',
      last_name: 'Nikolic',
      email: 'nole0223@gmail.com'
    };
    service.getProfile().subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/users/');

    expect(request.request.method).toBe('GET');

    request.flush(userPost);
  });
});
