import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ParliamentProposalsComponent } from './parliament-proposals.component';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AgendaPoint } from '../../../models/parliament/agendapoint.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ParliamentProposalsComponent', () => {
  let component: ParliamentProposalsComponent;
  let fixture: ComponentFixture<ParliamentProposalsComponent>;
  let alertService: AlertService;
  let parliamentService: ParliamentService;

  beforeEach(async(() => {

    const point = new AgendaPoint();
    point.agendaStatus = 'PENDING';
    point.point = 'Interfon da se ugradi';
    const points = [];
    points.push(point);
    let parliamentServiceMock = {
      getProposedAgendaPoints: jasmine.createSpy('getProposedAgendaPoints').and.returnValue(Observable.from([points])),
      postProposal: jasmine.createSpy('postProposal').and.returnValue(Observable.from([{}])),
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

    TestBed.configureTestingModule({
      declarations: [ParliamentProposalsComponent],
      providers: [
        { provide: ParliamentService, useValue: parliamentServiceMock },
        { provide: AlertService, useValue: alertServiceMock }
      ],
      imports: [RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentProposalsComponent);
    parliamentService = TestBed.get(ParliamentService);
    alertService = TestBed.get(AlertService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get proposed agenda points', fakeAsync(() => {
    component.getProposedAgendaPoints();
    component.tenantId = 5;
    component.parlId = 2;
    tick();
    expect(parliamentService.getProposedAgendaPoints).toHaveBeenCalled();
  }));

  it('should post agenda proposal', fakeAsync(() => {
    component.postProposal();
    tick();
    expect(parliamentService.postProposal).toHaveBeenCalled();
    expect(component.loading).toEqual(false);
  }));

});
