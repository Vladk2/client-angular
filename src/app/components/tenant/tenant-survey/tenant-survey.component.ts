import { Component, OnInit } from '@angular/core';

import { TenantService } from "../../../services/tenant-service/tenant.service";

@Component({
  selector: 'app-tenant-survey',
  templateUrl: './tenant-survey.component.html',
  styleUrls: ['./tenant-survey.component.scss']
})
export class TenantSurveyComponent implements OnInit {

  private surveys: any = [];

  constructor(private tenantService: TenantService) { }

  ngOnInit() {
    this.surveys.push({
      'name_survey': 'anketa1', 'description': 'opis',
      'create_survey': '23.12.2017', 'time_duration': '11.01.2018'
    });
  }

}
