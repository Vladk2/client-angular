import { Component, OnInit, Input } from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { AgendaPoint } from '../../../models/parliament/agendapoint.model';

@Component({
  selector: 'app-parliament-proposals',
  templateUrl: './parliament-proposals.component.html',
  styleUrls: ['./parliament-proposals.component.scss']
})
export class ParliamentProposalsComponent implements OnInit {

  @Input() parlId: any;
  @Input() tenantId: any;
  private loading = true;
  private agendaPoints: AgendaPoint [];
  private agendaProposal: any = '';

  constructor(private parliamentService: ParliamentService,
    private alertService: AlertService) { }

  ngOnInit() {
    localStorage.setItem('navbarTitle', 'Skupština stanara: Predlaganje tačaka');
    this.getProposedAgendaPoints();
  }

  getProposedAgendaPoints() {
    this.parliamentService.getProposedAgendaPoints(this.tenantId, this.parlId).subscribe((res: any) => {
      this.agendaPoints = res.slice().reverse();
      this.loading = false;

    });
  }

  postProposal() {

    this.loading = true;
    const point = new AgendaPoint();
    point.point = this.agendaProposal;

    this.parliamentService.postProposal(this.tenantId, this.parlId, point).subscribe((res: any) => {

      const responseMessage = res.message;
      this.agendaProposal = '';
      this.getProposedAgendaPoints();

      // ovo mozda otkomentarisati kada se doda iks za zatvaranje na alert divu
      // this.alertService.success(responseMessage", true);
    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja predloga.');
        this.loading = false;
      });

  }


}
