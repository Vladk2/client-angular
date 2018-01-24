import { Component, OnInit, Input } from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-parliament-voting',
  templateUrl: './parliament-voting.component.html',
  styleUrls: ['./parliament-voting.component.scss']
})
export class ParliamentVotingComponent implements OnInit {

  @Input() parlId: any;
  @Input() tenantId: any;
  private loading = true;
  private agendaPoints: any;
  private agendaVotes: any = [];
  private tenantVoted: boolean;
  private isSupervisor: boolean;

  constructor(private parliamentService: ParliamentService,
    private alertService: AlertService,
    private location: Location) {
  }

  ngOnInit() {
    this.isSupervisor = this.isTenantSupervisor(this.tenantId);
    this.getVotingStatus();
    localStorage.setItem('navbarTitle', 'Skupština stanara: Glasanje ');
    this.getProposedAgendaPoints();
  }

  getProposedAgendaPoints() {
    this.loading = true;
    this.parliamentService.getProposedAgendaPoints(this.tenantId, this.parlId).subscribe((res: any) => {
      this.agendaPoints = res.slice().reverse();
      for (const point of this.agendaPoints) {
        point.upVotes = 0;
        point.downVotes = 0;
      }
      this.loading = false;

    });
  }

  getVotingStatus() {
    this.loading = true;
    this.parliamentService.getVotingStatus(this.tenantId, this.parlId).subscribe((res: any) => {
      if (res.alreadyVoted === true) {
        this.tenantVoted = true;
        this.getAllVotes();
      } else {
        this.tenantVoted = false;
      }
      this.loading = false;
    });
  }

  getAllVotes() {
    this.loading = true;
    this.parliamentService.getAllVotes(this.tenantId, this.parlId).subscribe((res: any) => {

      for (const point of this.agendaPoints) {
        point.upVotes = 0;
        point.downVotes = 0;
      }
      for (const vote of res) {
        // tslint:disable-next-line:triple-equals
        if (vote.tenant.id == this.tenantId) {
          if (vote.vote === 'YES') {
            const button = document.getElementById('upVote' + vote.agendaPoint.id);
            button.className += ' btn-fill';
          }
          if (vote.vote === 'NO') {
            const button = document.getElementById('downVote' + vote.agendaPoint.id);
            button.className += ' btn-fill';
          }
        }
        for (const point of this.agendaPoints) {
          if (vote.agendaPoint.id === point.id) {
            if (vote.vote === 'YES') {
              if (point.upVotes !== 0) {
                point.upVotes += 1;
              } else {
                point.upVotes = 1;
              }
            } else if (vote.vote === 'NO') {
              if (point.downVotes !== 0) {
                point.downVotes += 1;
              } else {
                point.downVotes = 1;
              }
            }
          }
        }
      }
      this.loading = false;
    });
  }

  isAlreadyVoted(pointId) {
    if (this.tenantVoted === true) {
      return true;
    }
    for (const point of this.agendaVotes) {
      if (point.agendaPoint.id === pointId) {
        return true;
      }
    }
    return false;
  }

  voteUp(pointId) {
    if (!this.isAlreadyVoted(pointId)) {
      const button = document.getElementById('upVote' + pointId);
      button.className += ' btn-fill';
      const agendaPoint = { 'vote': 'YES', 'agendaPoint': { 'id': pointId } };
      this.agendaVotes.push(agendaPoint);
    }
  }
  voteDown(pointId) {
    if (!this.isAlreadyVoted(pointId)) {
      const button = document.getElementById('downVote' + pointId);
      button.className += ' btn-fill';
      const agendaPoint = { 'vote': 'NO', 'agendaPoint': { 'id': pointId } };
      this.agendaVotes.push(agendaPoint);
    }
  }

  postVotes() {
    this.loading = true;
    this.parliamentService.postVotes(this.tenantId, this.parlId, this.agendaVotes).subscribe(res => {
      this.getAllVotes();
      this.getVotingStatus();
      const responseMessage = JSON.parse(JSON.stringify(res)).message;
      this.loading = false;
      // ovo mozda otkomentarisati kada se doda iks za zatvaranje na alert divu
      // this.alertService.success(responseMessage", true);
    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja glasova.');
        this.loading = false;
      });
  }

  finishVoting() {

    this.loading = true;
    this.parliamentService.getVoteResults(this.tenantId, this.parlId).subscribe((res: any) => {
      console.log(res);
      location.reload();
    });

  }

  isTenantSupervisor(tenantId) {
    const token = JSON.parse(localStorage.getItem('token'));
    for (const tenant of token.tenants) {
      if (tenant.tenant === tenantId) {
        if (tenant.supervisor) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

}
