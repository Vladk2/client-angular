import { Component, OnInit, Input } from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from '../../../models/date/datetime.model';

@Component({
  selector: 'app-parliament-announce',
  templateUrl: './parliament-announce.component.html',
  styleUrls: ['./parliament-announce.component.scss']
})
export class ParliamentAnnounceComponent implements OnInit {

  @Input() tenantId: any;
  date: Date;
  announceDate: any;
  loading: boolean;
  parl_status: String;

  constructor(private parliamentService: ParliamentService,
    private alertService: AlertService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.tenantId = (params['id']);
    });
  }

  announceParliament() {
    this.announceDate = this.date.toLocaleString('en-GB');
    const dateSplit = this.announceDate.split(',');
    this.announceDate = dateSplit[0] + dateSplit[1].slice(0, -3);
    this.loading = true;
    const date = new DateTime(this.announceDate);

    this.parliamentService.announceParliament(this.tenantId, date).subscribe((res: any) => {

      const responseMessage = res.message;
      // ovo mozda otkomentarisati kada se doda iks za zatvaranje na alert divu
      this.alertService.success(responseMessage + ' Do početka skupštine možete predlagati tačke dnevnog reda sa ostalim stanarima.', true);
      this.router.navigate(['tenant/' + this.tenantId]);

    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom zakazivanja skupštine. Proverite uneti datum.');
        this.loading = false;
      });

  }

}
