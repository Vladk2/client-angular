import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location, LocationStrategy } from '@angular/common';

import { ParliamentVotingComponent } from './parliament-voting.component';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { Observable } from 'rxjs/Observable';
import { AgendaPoint } from '../../../models/parliament/agendapoint.model';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AgendaVote } from '../../../models/parliament/agendavote.model';
import { Tenant } from '../../../models/user/tenant.model';

describe('ParliamentVotingComponent', () => {
  let component: ParliamentVotingComponent;
  let fixture: ComponentFixture<ParliamentVotingComponent>;
  let alertService: AlertService;
  let parliamentService: ParliamentService;

  beforeEach(async(() => {
    const tenant = new Tenant();
    tenant.id = 2;
    tenant.userId = 5;
    tenant.buildingId = 3;
    const vote = new AgendaVote();
    const point = new AgendaPoint();
    point.agendaStatus = 'PENDING';
    point.point = 'Interfon da se ugradi';
    const points = [];
    const votes = [];
    points.push(point);
    vote.agendaPoint = point;
    vote.tenant = tenant;
    vote.vote = 'YES';
    votes.push(vote);
    const status = {'alreadyVoted': true};
    const parlamentServiceMock = {
      getProposedAgendaPoints: jasmine.createSpy('getProposedAgendaPoints').and.returnValue(Observable.from([points])),
      getAllVotes: jasmine.createSpy('getAllVotes').and.returnValue(Observable.from([votes])),
      getVotingStatus: jasmine.createSpy('getVotingStatus').and.returnValue(Observable.from([status])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    const alertServiceMock = {
      success: jasmine.createSpy('success').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ ParliamentVotingComponent ],
      providers: [
        {provide: ParliamentService, useValue: parlamentServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: LocationStrategy}
      ],
      imports: [FormsModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentVotingComponent);
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
  
  it('should get all votes', fakeAsync(() => {
    component.getAllVotes();
    component.tenantId = 3;
    component.parlId = 1;
    tick();
    expect(parliamentService.getAllVotes).toHaveBeenCalled();
  }));

  it('should get voting status', fakeAsync(() => {
    component.getVotingStatus();
    component.tenantId = 3;
    component.parlId = 1;
    tick();
    expect(parliamentService.getVotingStatus).toHaveBeenCalled();
  }));

  it('shows if you already voted', () => {
    component.tenantVoted = true;
    component.isAlreadyVoted(2);
    expect(component.isAlreadyVoted(2)).toBeTruthy();
  });

  /*it('should give a vote up for a point', () => {
    component.tenantVoted = false;
    component.agendaVotes = [];
    component.voteUp(2);
    expect(component.voteUp(2)).toBeTruthy();
    expect(component.agendaVotes).toBeGreaterThan(0);
  }); */


});
