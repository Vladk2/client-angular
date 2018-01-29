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

  it('updateInfo() should query current service url', () => {

    const userInfo = {
      name: 'Novica',
      last_name: 'Nikolic',
      email: 'nole@gmial.com'
    };

    service.updateInfo(userInfo).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res).toEqual(userInfo);
    });
    
    const request = httpMock.expectOne('http://localhost:8080/api/users/');

    expect(request.request.method).toBe('PUT');

    request.flush(userInfo);
  });

  it('updatePassword() should query current servce url', () => {

    const userPassword = {
      password: '123456'
    };
    const userPasswordFake = {
      password: '11111'
    };
    service.updatePassword(userPassword).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res).not.toBe(userPasswordFake);
      expect(res).toEqual(userPassword);
    })
    const request = httpMock.expectOne('http://localhost:8080/api/users/password');

    expect(request.request.method).toBe('POST');

    request.flush(userPassword);
  });
  it('addBuilding() should query current servce url', () => {

    const buildingPost = {
      addsess: {id: 1, street: 'Moja ulica', number: 25, city: 'Novi sad', zip: '21000'}
    };

    service.addBuilding(buildingPost).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res).toEqual(buildingPost);
    })
    const request = httpMock.expectOne('http://localhost:8080/api/admins/building/');

    expect(request.request.method).toBe('POST');

    request.flush(buildingPost);
  });
  it('getAllUser() should query current servce url', () => {
    const usersPost = [
      {id: 1, username: 'nole1', password: '123', name: 'Novica', last_name: 'Nikolic', email: 'nole0223@gmail.com'},
      {id: 2, username: 'nole2', password: '123', name: 'Novica1', last_name: 'Nikolic', email: 'nole022@gmail.com'},
      {id: 3, username: 'nole3', password: '123', name: 'Novica2', last_name: 'Nikolic', email: 'nole02@gmail.com'},
      {id: 4, username: 'nole4', password: '123', name: 'Novica3', last_name: 'Nikolic', email: 'nole0@gmail.com'}
    ];

    service.getAllUser().subscribe(res => {
      expect(res.length).toEqual(4);
      expect(res).toEqual(usersPost);
    })

    const request = httpMock.expectOne('http://localhost:8080/api/admins/users/');

    expect(request.request.method).toBe('GET');

    request.flush(usersPost);
  });
  it('addFirm() should query current servce url', () => {
    const firmPost = {
      firm_name: 'moja firma', address: {id: 1}
    }; 
    const user_id = 1;

    service.addFirm(firmPost, user_id).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res).toEqual(firmPost);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/firm/'+user_id+'/null');

    expect(request.request.method).toBe('POST');
    
    request.flush(firmPost);
  });
  it('addAdmin() should query current servce url', () => {

    const user_id = 1;

    service.addAdmin(user_id).subscribe((res: any) => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/admin/'+user_id);

    expect(request.request.method).toBe('PATCH');

    //request.flush(firmPost);
  });
  it('removeAdmin() should query current servce url', () => {

    const user_id = 1;
    service.removeAdmin(user_id).subscribe((res: any) => {
      expect(res.message).toEqual('succesfull');
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/admin/remove/'+user_id);

    expect(request.request.method).toBe('PATCH');

    request.flush({message: 'succesfull'});
  });
  it('getAllBuildings() should query current servce url', () => {
    
    const buildingsPost = [
      {id: 1, address: {id: 1, street: 'Moja ulica', number: 25, city: 'Novi Sad', zip: '21000'}},
      {id: 2, address: {id: 2, street: 'Moja ulica', number: 23, city: 'Novi Sad', zip: '21000'}},
      {id: 4, address: {id: 3, street: 'Moja ulica', number: 24, city: 'Novi Sad', zip: '21000'}}
    ];
    service.getAllBuildings().subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res).toEqual(buildingsPost);
      expect(res[0].id).toEqual(1);
      expect(res[1].address.id).toEqual(2);
      expect(res[2].address.number).toEqual(24);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/buildings/');

    expect(request.request.method).toBe('GET');

    request.flush(buildingsPost);
  });

  it('getAllFirms() should query current servce url', () => {

    const firmsPost = [
      {id: 1, firm_name: 'moja firma1', address: {id: 1, street: 'Moja ulica', number: 25, city: 'Novi Sad', zip: '21000'}},
      {id: 11, firm_name: 'moja firma2', address: {id: 5, street: 'Moja ulica', number: 24, city: 'Novi Sad', zip: '21000'}},
      {id: 115, firm_name: 'moja firma3', address: {id: 10, street: 'Moja ulica', number: 23, city: 'Novi Sad', zip: '21000'}},
      {id: 116, firm_name: 'moja firma4', address: {id: 15, street: 'Moja ulica', number: 22, city: 'Novi Sad', zip: '21000'}},
      {id: 120, firm_name: 'moja firma5', address: {id: 20, street: 'Moja ulica', number: 21, city: 'Novi Sad', zip: '21000'}}
    ]
    service.getAllFirms().subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res).toEqual(firmsPost);
      expect(res.length).toEqual(5);

      expect(res[0].firm_name).toEqual('moja firma1');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/firms/');

    expect(request.request.method).toBe('GET');

    request.flush(firmsPost);
  });
  it('removeFirm() should query current servce url', () => {
    
    const id_firm = 1;

    service.removeFirm(id_firm).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res.message).toEqual('succesfull');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/firm/'+id_firm);

    expect(request.request.method).toBe('DELETE');

    request.flush({message: 'succesfull'});
  });
  it('getTenantsByBuilding() should query current servce url', () => {
    
    const buildingId = 1;
    const buildingPost = {
      id: 1,
      address: {
        id: 10,
        street: 'Moja ulica',
        number: 25,
        city: 'Novi Sad',
        zip: '21000'
      }
    };

    service.getTenantsByBuilding(buildingId).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res).toEqual(buildingPost);

      expect(res.id).toEqual(1);
      expect(res.address.number).toEqual(25);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/tenants/buildings/'+buildingId);

    expect(request.request.method).toBe('GET');

    request.flush(buildingPost);
  });
  it('makeSupervisor() should query current servce url', () => {

    const tenantId = 1;
    const buildingId = 1;

    service.makeSupervisor(tenantId, buildingId).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res.message).toEqual('succesfull');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/supervisors/tenants/'+tenantId+'/buildings/'+buildingId);

    expect(request.request.method).toBe('POST');

    request.flush({message: 'succesfull'});
  });
  it('deleteUser() should query current servce url', () => {

    const userId = 1;
    service.deleteUser(userId).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res.message).toEqual('succesfull');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/admins/users/'+userId);

    expect(request.request.method).toBe('DELETE');

    request.flush({message: 'succesfull'});
  });

});
