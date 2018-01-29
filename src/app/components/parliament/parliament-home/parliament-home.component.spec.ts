import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ParliamentHomeComponent } from './parliament-home.component';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { ActivatedRoute } from '@angular/router';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ParliamentHomeComponent', () => {
  let component: ParliamentHomeComponent;
  let fixture: ComponentFixture<ParliamentHomeComponent>;
  let parliamentService: ParliamentService;
  let activeRoute: ActivatedRoute;
  beforeEach(async(() => {

    const status = {'status': 'VOTING', 'parlId': 3};

    let parlamentServiceMock = {
      getParliamentStatus: jasmine.createSpy('getProblems').and.returnValue(Observable.from([status])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ ParliamentHomeComponent ],
      providers: [
        {provide: ParliamentService, useValue: parlamentServiceMock},
        {provide: ActivatedRoute}
      ],
      imports: [FormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentHomeComponent);
    parliamentService  = TestBed.get(ParliamentService);
    activeRoute = TestBed.get(ActivatedRoute);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get parliament status', fakeAsync(() => {
    component.getParliamentStatus();
    // expect(component.loading).toEqual(false);
    expect(parliamentService.checkParliamentStatus).toHaveBeenCalled();
    tick();
  }));
});
