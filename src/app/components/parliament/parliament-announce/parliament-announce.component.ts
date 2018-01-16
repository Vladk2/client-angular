import { Component, OnInit, Input } from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from "../../../services/alert-service/alert.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parliament-announce',
  templateUrl: './parliament-announce.component.html',
  styleUrls: ['./parliament-announce.component.scss']
})
export class ParliamentAnnounceComponent implements OnInit {

  @Input() tenantId : any;
  private date : Date;
  private announceDate : any;
  private loading : boolean;
  private parl_status : String;

  constructor(private parliamentService: ParliamentService, 
              private alertService: AlertService,
              private activeRoute: ActivatedRoute,
              private router : Router ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.tenantId = (params['id']);
   });
   
   
  }
 

  announceParliament(){
    this.announceDate = this.date.toLocaleString('en-GB');
    let dateSplit = this.announceDate.split(',');
    this.announceDate = dateSplit[0] + dateSplit[1].slice(0,-3);
    this.loading = true;
    let date = {
      'date' : this.announceDate
    }
    
    this.parliamentService.announceParliament(this.tenantId, date).subscribe(res => {
      
      let responseMessage = JSON.parse(JSON.stringify(res)).message;
      console.log("PORUKA JE " + responseMessage); 
      // ovo mozda otkomentarisati kada se doda iks za zatvaranje na alert divu
      this.alertService.success(responseMessage + " Do početka skupštine možete predlagati tačke dnevnog reda sa ostalim stanarima.", true); 
      this.router.navigate(['tenant/'+ this.tenantId]);
      
    },
    error => {
        this.alertService.error('GREŠKA: Greška prilikom zakazivanja skupštine. Proverite uneti datum.');
        this.loading = false;
    });
  
  }

}
