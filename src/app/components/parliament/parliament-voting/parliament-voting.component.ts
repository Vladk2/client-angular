import { Component, OnInit, Input } from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';

@Component({
  selector: 'app-parliament-voting',
  templateUrl: './parliament-voting.component.html',
  styleUrls: ['./parliament-voting.component.scss']
})
export class ParliamentVotingComponent implements OnInit {

  @Input() parlId : any;
  @Input() tenantId : any;
  private loading : boolean = true;
  private agendaPoints : any;

  constructor(private parliamentService : ParliamentService) { }

  ngOnInit() {
    localStorage.setItem("navbarTitle", "Skupština stanara: Glasanje ");
    this.getProposedAgendaPoints();
  }

  getProposedAgendaPoints(){
    this.parliamentService.getProposedAgendaPoints(this.tenantId, this.parlId).subscribe(res =>{
      this.agendaPoints = res;
      this.agendaPoints = this.agendaPoints.slice().reverse();
      this.loading = false;
      const token = JSON.parse(localStorage.getItem('token'));
       
    });
  }
  

}
