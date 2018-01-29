import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';

describe('AuthService', () => {

  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    });

    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('auth should pass simple', () => {
    expect(true).toBe(true);
  });

  it('registration_service() should query current service url', () => {
    const credentials = {
      username: 'nole',
      password: '123',
      name: 'Novica',
      last_name: 'Nikolic',
      email: 'nole0223@gmail.com'
    };
    service.registration_service(credentials).subscribe((res: any) => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/users/sign_up', 'post to api');

    expect(request.request.method).toBe('POST');

    request.flush(credentials);
  });

/*
  it('login_service() should query current service url', () => {
    const credentials = {
      username: 'nole',
      password: '123'
    };

    service.login_service(credentials).subscribe((res: any) => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/users/sign_in', 'post to api');

    expect(request.request.method).toBe('POST');

    request.flush(credentials);
  });
*/

  it('getAllUsers() should query current service url', () => {
    
    const usersPost = [
      {id: 1, username: 'nole', password: '123', name: 'Novica', last_name: 'Nikolic', email: 'nole0223@gmail.com'},
      {id: 2, username: 'nn', password: '123', name: 'NN', last_name: 'NN', email: 'nn@gmail.com'},
      {id: 3, username: 'nnnn', password: '123', name: 'NNNN', last_name: 'NNNN', email: 'nnnn@gmail.com'},
      {id: 4, username: 'riggy', password: '123', name: 'riggy', last_name: 'router', email: 'router@gmail.com'}
    ];
    service.getAllUsers().subscribe(res => {
      expect(res.length).toBe(4);
      expect(res).toEqual(usersPost);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/users/');

    expect(request.request.method).toBe('GET');

    request.flush(usersPost);
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

    const request = httpMock.expectOne('http://localhost:8080/api/buildings');

    expect(request.request.method).toBe('GET');

    request.flush(buildingPost);
  });

  it('findFirm() should query current service url', () => {
    
    const firmPost = {
      fimr_name: 'moja firma',
      address: {
        id: 1, 
        street: 'Dr Svetislava Kasapinovica',
        number: 21,
        city: 'Novi Sad',
        zip: '21000'
      }
    };
    service.findFirm().subscribe(res => {
      expect(res).not.toBe(null);
      expect(res).toEqual(firmPost);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/firms/show');

    expect(request.request.method).toBe('GET');

    request.flush(firmPost);
  });
});
