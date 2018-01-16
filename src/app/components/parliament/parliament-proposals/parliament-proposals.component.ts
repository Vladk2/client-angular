import { Component, OnInit, Input } from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from "../../../services/alert-service/alert.service";

@Component({
  selector: 'app-parliament-proposals',
  templateUrl: './parliament-proposals.component.html',
  styleUrls: ['./parliament-proposals.component.scss']
})
export class ParliamentProposalsComponent implements OnInit {

  @Input() parlId : any;
  @Input() tenantId : any;
  private loading : boolean = true;
  private agendaPoints : any;
  private agendaProposal : any = "";

  constructor(private parliamentService : ParliamentService,
              private alertService : AlertService) { }

  ngOnInit() {
    localStorage.setItem("navbarTitle", "Skupština stanara: Predlaganje tačaka");
    this.getProposedAgendaPoints();
  }

  getProposedAgendaPoints(){
    this.parliamentService.getProposedAgendaPoints(this.tenantId, this.parlId).subscribe(res =>{
      console.log(res);
      this.agendaPoints = res;
      this.agendaPoints = this.agendaPoints.slice().reverse();
      this.loading = false;
      const token = JSON.parse(localStorage.getItem('token'));
       
    });
  }

  postProposal(){

    this.loading = true;
    let point = {
      'point' : this.agendaProposal
    }
    
    this.parliamentService.postProposal(this.tenantId, this.parlId, point).subscribe(res => {
      
      let responseMessage = JSON.parse(JSON.stringify(res)).message;
      console.log("PORUKA JE " + responseMessage); 
      this.agendaProposal = "";
      this.getProposedAgendaPoints();

      // ovo mozda otkomentarisati kada se doda iks za zatvaranje na alert divu
      //this.alertService.success(responseMessage", true); 

      
    },
    error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja predloga.');
        this.loading = false;
    });
  
  }
  

}
