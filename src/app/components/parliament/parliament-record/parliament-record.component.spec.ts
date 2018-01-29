import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ParliamentRecordComponent } from './parliament-record.component';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { Observable } from 'rxjs/Observable';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('ParliamentRecordComponent', () => {
  let component: ParliamentRecordComponent;
  let fixture: ComponentFixture<ParliamentRecordComponent>;
  let alertService: AlertService;
  let parliamentService: ParliamentService;
  let router: Router;
  beforeEach(async(() => {

    let parliamentServiceMock = {
    
        postAgendaRecord: jasmine.createSpy('postAgendaRecord').and.returnValue(Observable.from([{}])),
        RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    let alertServiceMock = {
      success: jasmine.createSpy('success').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    TestBed.configureTestingModule({
      declarations: [ParliamentRecordComponent],
      providers: [
        { provide: ParliamentService, useValue: parliamentServiceMock },
        { provide: AlertService, useValue: alertServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      imports: [RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentRecordComponent);
    parliamentService = TestBed.get(ParliamentService);
    alertService = TestBed.get(AlertService);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post an agenda record', fakeAsync(() => {
    component.record = [{'title': 'naslov', 'content': 'opis'}];
    component.postRecord();
    tick();
    expect(parliamentService.postAgendaRecord).toHaveBeenCalled();
  })); 
});
