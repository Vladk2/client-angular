import { Component, OnInit, Input } from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';

@Component({
  selector: 'app-parliament-record',
  templateUrl: './parliament-record.component.html',
  styleUrls: ['./parliament-record.component.scss']
})
export class ParliamentRecordComponent implements OnInit {

  @Input() parlId: any;
  @Input() tenantId: any;

  constructor(private parliamentService: ParliamentService) { }

  ngOnInit() {
    this.parliamentService.getBlankRecord(this.tenantId, this.parlId).subscribe((res: any) => {
      console.log(res);
    });
  }

}
