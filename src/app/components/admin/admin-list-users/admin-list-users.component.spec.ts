import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import { AdminListUsersComponent } from './admin-list-users.component';
import { FormsModule }   from '@angular/forms';
import {AdminService} from '../../../services/admin-service/admin.service';
import {ConfirmationService} from 'primeng/primeng';
import {AuthService} from '../../../services/auth-service/auth.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AdminListUsersComponent', () => {
  let component: AdminListUsersComponent;
  let fixture: ComponentFixture<AdminListUsersComponent>;
  let adminService: any;

  beforeEach(async(() => {
    const users = [
      {id: 1, username: 'nole', password: '123', name: 'Novica', last_name: 'Nikolic', email: 'nole@gmail.com'},
      {id: 2, username: 'user1', password: '123', name: 'User1', last_name: 'User1', email: 'user1@gmail.com'},
      {id: 3, username: 'user2', password: '123', name: 'User2', last_name: 'User2', email: 'user2@gmail.com'},
    ];

    let adminServiceMock = {
      getAllUser: jasmine.createSpy('getAllUser')
        .and.returnValue(Observable.from([users])),

      addAdmin: jasmine.createSpy('adminService')
        .and.returnValue(Observable.from([{}])),

      removeAdmin: jasmine.createSpy('removeAdmin')
        .and.returnValue(Observable.from([{}])),

      deleteUser: jasmine.createSpy('deleteUser')
        .and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let authServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminListUsersComponent ],
      imports: [ FormsModule ],
      providers: [
        ConfirmationService,
        {provide: AdminService, useValue: adminServiceMock},
        {provide: AuthService, useValue: authServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListUsersComponent);
    adminService = TestBed.get(AdminService);
    component = fixture.componentInstance;
  });

  it('should get all users', () => {
    component.ngOnInit();

    expect(adminService.getAllUser).toHaveBeenCalled();

    expect(component.users.length).toEqual(3);

    expect(component.messageAdd).toEqual(false);
    expect(component.messageRemove).toEqual(false);
    expect(component.progress).toEqual(false);
    
  });

  it('should add new admin onAddAdmin()', () => {
    component.onAddAdmin(1);

    expect(adminService.addAdmin).toHaveBeenCalledWith(1);

    expect(component.messageAdd).toEqual(false);
    expect(component.messageRemove).toEqual(false);
    expect(component.progress).toEqual(true);
  });

  it('should remove admin onRemoveAdmin()', () => {
    component.onRemoveAdmin(1);

    expect(adminService.removeAdmin).toHaveBeenCalledWith(1);

    expect(component.messageAdd).toEqual(false);
    expect(component.messageRemove).toEqual(false);
    expect(component.progress).toEqual(true);
  });

  it('should destroy user destroyUser()', async() => {
    component.destroyUser();
    const id = 1;

    expect(adminService.deleteUser).toHaveBeenCalledWith(1);

    expect(component.deleteDialog).toEqual(true);
  });
});
