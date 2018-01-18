import { Component, OnInit, Input } from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parliament-record',
  templateUrl: './parliament-record.component.html',
  styleUrls: ['./parliament-record.component.scss']
})
export class ParliamentRecordComponent implements OnInit {

  @Input() parlId: any;
  @Input() tenantId: any;
  private record: any = [];

  constructor(private parliamentService: ParliamentService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
    this.parliamentService.getBlankRecord(this.tenantId, this.parlId).subscribe((res: any) => {
      const stringRecord = res.record.split('<|>');
      for (let i = 0; i < stringRecord.length - 1; i++) {
        const point: any = {};
        point.title = stringRecord[i];
        this.record.push(point);
      }
    });
  }

  postRecord() {
    let recordString = '';
    for (const point of this.record) {
     if (point.title !== undefined) {
       point.title = point.title.trim();
     } else {
       point.title = '';
     }
     if (point.content !== undefined) {
      point.content = point.content.trim();
    } else {
      point.content = '';
    }
     recordString += point.title + '<|>' + point.content + '<|>';
    }
    const record = { 'record' : recordString };

    this.parliamentService.postAgendaRecord(this.tenantId, this.parlId, record).subscribe((res: any) => {

      const responseMessage = (res).message;
      console.log('PORUKA JE ' + responseMessage);
      this.alertService.success(responseMessage, true);
      this.router.navigate(['tenant/' + this.tenantId]);

    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja zapisnika.');
      });

  }

}
