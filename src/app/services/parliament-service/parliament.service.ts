import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParliamentService {

  constructor(private http: HttpClient) {}

  announceParliament(tenantId, date) {
    return this.http.post('http://localhost:8080/api/parliaments/scheduleMeeting/' + tenantId, date);
  }

  checkParliamentStatus(tenantId) {
    return this.http.get('http://localhost:8080/api/parliaments/' + tenantId + '/status');
  }

  getProposedAgendaPoints(tenantId, parlId) {
    return this.http.get('http://localhost:8080/api/parliaments/agendaVote/' + tenantId + '/' + parlId);
  }

  postProposal(tenantId, parlId, point) {
    return this.http.post('http://localhost:8080/api/parliaments/proposePoint/' + tenantId + '/' + parlId, point);
  }

  postVotes(tenantId, parlId, votes) {
    return this.http.post('http://localhost:8080/api/parliaments/agendaVote/' + tenantId + '/' + parlId, votes);
  }

  getVotingStatus(tenantId, parlId) {
    return this.http.get('http://localhost:8080/api/parliaments/' + tenantId + '/isVoted/' + parlId);
  }

  getAllVotes(tenantId, parlId) {
    return this.http.get('http://localhost:8080/api/parliaments/' + tenantId + '/' + parlId + '/votes');
  }

  getVoteResults(tenantId, parlId) {
    return this.http.get('http://localhost:8080/api/parliaments/finishVoting/' + tenantId + '/' + parlId);
  }

  getBlankRecord(tenantId, parlId) {
    return this.http.get('http://localhost:8080/api/parliaments/agendaRecord/' + tenantId + '/' + parlId);
  }


}
