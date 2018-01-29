import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ParliamentAnnounceComponent } from './parliament-announce.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTime } from '../../../models/date/datetime.model';

describe('ParliamentAnnounceComponent', () => {
  let component: ParliamentAnnounceComponent;
  let fixture: ComponentFixture<ParliamentAnnounceComponent>;
  let parliamentService: ParliamentService;
  let activeRoute: ActivatedRoute;
  let alertService: AlertService;
  let router: Router;

  beforeEach(async(() => {

    let parliamentServiceMock = {
      announceParliament: jasmine.createSpy('announceParliament').and.returnValue(Observable.from([{}])),
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
  declarations: [ParliamentAnnounceComponent],
  providers: [
    { provide: ParliamentService, useValue: parliamentServiceMock },
    { provide: AlertService, useValue: alertServiceMock },
    {provide: Router, useValue: routerMock},
    { provide: ActivatedRoute }
  ],
  imports: [RouterTestingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
  .compileComponents();
  }));

beforeEach(() => {
  fixture = TestBed.createComponent(ParliamentAnnounceComponent);
  parliamentService = TestBed.get(ParliamentService);
  alertService = TestBed.get(AlertService);
  router = TestBed.get(Router);
  
  component = fixture.componentInstance;
});

it('should create', () => {
  expect(component).toBeTruthy();
});


it('should announce a parliament', fakeAsync(() => {
  component.date = new Date();
  component.tenantId = 2;
  component.announceParliament();
  tick();
  expect(parliamentService.announceParliament).toHaveBeenCalled();
})); 

});
