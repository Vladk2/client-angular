import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { TenantService } from "../../../services/tenant-service/tenant.service";
import { SurveyService } from "../../../services/survey-service/survey.service";

@Component({
  selector: 'app-tenant-survey',
  templateUrl: './tenant-survey.component.html',
  styleUrls: ['./tenant-survey.component.scss']
})
export class TenantSurveyComponent implements OnInit {

  private surveys: any = [];
  private tenant: any = {};

  constructor(private tenantService: TenantService,
    private surveyService: SurveyService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Početna');

    this.activeRoute.params.subscribe(params => {
      this.tenant['id'] = params['id'];
      this.tenantService.getUsersTenants().subscribe(res => {
        this.tenant = res.filter(t => t.building.id === +this.tenant.id)[0];
        this.getSurveys();
      });
    });
  }

  getSurveys() {
    this.surveyService.getSurveys(this.tenant.building.id).subscribe(res => {
      console.log(res);
      this.surveys = res;
    });
  }

  report(surveyId) {
    
  }

}
