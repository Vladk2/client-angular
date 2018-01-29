import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {ParliamentHomeComponent} from './parliament-home.component';
import {ParliamentService} from '../../../services/parliament-service/parliament.service';
import {ActivatedRoute} from '@angular/router';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';


describe('ParliamentHomeComponent', () => {
  let component: ParliamentHomeComponent;
  let fixture: ComponentFixture<ParliamentHomeComponent>;
  let parliamentService: ParliamentService;
  let activeRoute: ActivatedRoute;
  beforeEach(async(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    const status = {'status': 'VOTING', 'parlId': 3};

    const parliamentServiceMock = {
      checkParliamentStatus: jasmine.createSpy('checkParliamentStatus').and.returnValue(Observable.from([status])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ParliamentHomeComponent],
      providers: [
        {provide: ParliamentService, useValue: parliamentServiceMock},
        {provide: ActivatedRoute}
      ],
      imports: [FormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentHomeComponent);
    parliamentService = TestBed.get(ParliamentService);
    activeRoute = TestBed.get(ActivatedRoute);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get parliament status', () => {
   /* component.tenants_id = 1;
    const token = {
      'username': 'riggy', tenans: [
        {'tenant': 1, 'supervisor': 1, 'owner': true},
        {'tenant': 5, 'owner': false}
      ]
    };
    localStorage.setItem('token', JSON.stringify(token));
    component.getParliamentStatus();
    tick();
    expect(parliamentService.checkParliamentStatus).toHaveBeenCalled();*/
  });
});
