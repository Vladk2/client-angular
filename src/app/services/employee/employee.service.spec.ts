import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {

  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService],
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.get(EmployeeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(true).toBe(true);
  });

  it('showFirm() should query current service url', () => {
  	const firmPost = {
  		id: 1,
  		firm_name: 'moja firma',
  		address: {id: 1, street: 'moja ulica', number: 21, city: 'Novi Sad', zip: '21000'}
  	};
  	const id_firm = 1;

  	service.showFirm(id_firm).subscribe((res: any) => {
  		expect(res.id).toEqual(1);
  		expect(res.firm_name).toEqual('moja firma');
  		expect(res.address.id).toEqual(1);

  		expect(res).toEqual(firmPost);
  	});

  	const request = httpMock.expectOne('http://localhost:8080/api/firms/' + id_firm + '/');

  	expect(request.request.method).toBe('GET');

  	request.flush(firmPost);
  });

  it('addEmployFirms() should query current service url', () => {

  	const id_firm = 1;
    const id_user = 1;
  	service.addEmployFirms(id_firm, id_user).subscribe((res: any) => {
  		expect(res).not.toBe(null);
  		expect(res.message).toEqual('succesfull');
  	});

  	const request = httpMock.expectOne('http://localhost:8080/api/firms/' + id_firm + '/' + id_user);

  	expect(request.request.method).toBe('POST');

  	request.flush({message: 'succesfull'});
  });

  it('removeEmployFirms() should query current service url', () => {

  	const id_firm = 1;
  	const id_user = 1;

  	service.removeEmployFirms(id_firm, id_user).subscribe((res: any) => {
  		expect(res).not.toBe(null);
  		expect(res.message).toEqual('succesfull');
  	});

  	const request = httpMock.expectOne('http://localhost:8080/api/firms/remove/' + id_firm + '/' + id_user);

  	expect(request.request.method).toBe('POST');

  	request.flush({message: 'succesfull'});
  });

  it('updateFirm() should query current service url', () => {
  	const firmPost = {
  		id: 1,
  		firm_name: 'moja firma1',
  		address: {id: 1, street: 'moja ulica', number: 21, city: 'Novi Sad', zip: '21000'}
  	};

  	service.updateFirm(firmPost).subscribe((res: any) => {
  		expect(res.id).toEqual(1);
  		expect(res.firm_name).toEqual('moja firma1');

  		expect(res.firm_name).not.toEqual('moja firma');

  		expect(res).toEqual(firmPost);
  	});

  	const request = httpMock.expectOne('http://localhost:8080/api/firms/update');

  	expect(request.request.method).toBe('POST');

  	request.flush(firmPost);
  });

  it('showFirmByUser() should query current service url', () => {
  	const firmPost = {
  		id: 1,
  		firm_name: 'moja firma',
  		address: {id: 1, street: 'moja ulica', number: 21, city: 'Novi Sad', zip: '21000'}
  	};

  	service.showFirmByUser().subscribe((res: any) => {
  		expect(res.id).toEqual(1);
  		expect(res.firm_name).toEqual('moja firma');
  		expect(res.address.id).toEqual(1);

  		expect(res).toEqual(firmPost);
  	});

  	const request = httpMock.expectOne('http://localhost:8080/api/firms/show');

  	expect(request.request.method).toBe('GET');

  	request.flush(firmPost);
  });

});
