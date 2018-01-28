import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {UserService} from './user.service';
import {User} from '../../models/user/user.model';

describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(true).toBe(true);
  });

  it('get', () => {
    service.get().subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/users/');

    expect(request.request.method).toBe('GET');
  });

  it('update', () => {
    const user = new User();
    user.email = 'misko@gmail.com';
    user.id = 1;
    user.name = 'misa';
    user.last_name = 'misic';
    user.username = 'disko_misic';

    service.update(user).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/users/');

    expect(request.request.method).toBe('PUT');

    request.flush(user);
  });

  it('updatePassword', () => {
    const password = {'password': '123'};

    service.updatePassword(password).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/users/password');

    expect(request.request.method).toBe('POST');

    request.flush(password);
  });

  it('destroy', () => {
    service.destroy().subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/users/');

    expect(request.request.method).toBe('DELETE');
  });

  it('verifyAccount', () => {
    const token = 'wdaadww%wda%223ewdawad2';

    service.verifyAccount(token).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/users/verify?token=' + token);

    expect(request.request.method).toBe('GET');
  });
});
