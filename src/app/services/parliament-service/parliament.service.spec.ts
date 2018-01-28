import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTime } from '../../models/date/datetime.model';
import { ParliamentService } from './parliament.service';
import { AgendaPoint } from '../../models/parliament/agendapoint.model';
import { AgendaVote } from '../../models/parliament/agendavote.model';
import { Tenant } from '../../models/user/tenant.model';
import { Parliament } from '../../models/parliament/parliament.model';

describe('ParliamentService', () => {

  let service: ParliamentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParliamentService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    service = TestBed.get(ParliamentService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(true).toBe(true);
  });

  it('should announce a parliament meeting', () => {

    const tenantId = 1;
    const date = new DateTime('28/12/2018 14:29');
    service.announceParliament(tenantId, date).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/parliaments/scheduleMeeting/' + tenantId);

    expect(request.request.method).toBe('POST');

  });

  it('should return current parliament status', () => {
    const parlStatus = [
      { 'status': 'ANNOUNCED', 'parlId': 3 }
    ];
    const tenantId = 2;
    service.checkParliamentStatus(tenantId).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res.length).toBe(1);
      expect(res[0].status).toBe('ANNOUNCED');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/parliaments/' + tenantId + '/status');

    expect(request.request.method).toBe('GET');

    request.flush(parlStatus);
  });

  it('should return proposed agenda points', () => {

    const tenantId = 2;
    const parlId = 3;
    service.getProposedAgendaPoints(tenantId, parlId).subscribe((res: any) => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/parliaments/agendaVote/' + tenantId + '/' + parlId);
    expect(request.request.method).toBe('GET');
  });

  it('should post an agenda point proposal', () => {

    const tenantId = 1;
    const parlId = 3;
    const point = new AgendaPoint();
    point.agendaStatus = 'PENDING';
    point.point = 'Interfon da se ugradi';
    service.postProposal(tenantId, parlId, point).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/parliaments/proposePoint/' + tenantId + '/' + parlId);

    expect(request.request.method).toBe('POST');

  });

  it('should post agenda votes', () => {

    const tenantId = 1;
    const parlId = 3;
    const votes = [];
    const vote = new AgendaVote();
    vote.agendaPoint = new AgendaPoint();
    vote.tenant = new Tenant();
    vote.vote = 'YES';
    const vote2 = new AgendaVote();
    vote2.agendaPoint = new AgendaPoint();
    vote2.tenant = new Tenant();
    vote2.vote = 'NO';
    votes.push(vote);
    votes.push(vote2);

    service.postVotes(tenantId, parlId, votes).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/parliaments/agendaVote/' + tenantId + '/' + parlId);

    expect(request.request.method).toBe('POST');

  });

  it('should get all votes', () => {

    const tenantId = 2;
    const parlId = 3;
    service.getAllVotes(tenantId, parlId).subscribe((res: any) => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/parliaments/' + tenantId + '/' + parlId + '/votes');
    expect(request.request.method).toBe('GET');
  });


  it('should get vote results', () => {

    const tenantId = 2;
    const parlId = 3;
    service.getVoteResults(tenantId, parlId).subscribe((res: any) => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/parliaments/finishVoting/' + tenantId + '/' + parlId);
    expect(request.request.method).toBe('GET');
  });

  it('should write and post agenda record', () => {

    const tenantId = 2;
    const parlId = 1;
    const parl = new Parliament();
    parl.record = 'Zapisnik';
    service.postAgendaRecord(tenantId, parlId, parl).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/parliaments/agendaRecord/' + tenantId + '/' + parlId);

    expect(request.request.method).toBe('PATCH');

  });


});
