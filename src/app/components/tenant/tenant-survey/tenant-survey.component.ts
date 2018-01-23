import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { TenantService } from "../../../services/tenant-service/tenant.service";
import { SurveyService } from "../../../services/survey-service/survey.service";

import { Survey } from "../../../models/survey/survey.model";

@Component({
  selector: 'app-tenant-survey',
  templateUrl: './tenant-survey.component.html',
  styleUrls: ['./tenant-survey.component.scss']
})
export class TenantSurveyComponent implements OnInit {

  private fillDialog: boolean = false;
  private createSurveyDialog: boolean = false;

  private selectedSurvey: Survey;

  private surveys: Survey[] = [];
  private tenant: any = {};

  constructor(private tenantService: TenantService,
    private surveyService: SurveyService,
    private activeRoute: ActivatedRoute) {

    this.selectedSurvey = new Survey();
  }

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
    this.surveyService.getSurveys(this.tenant.building.id).subscribe((res: Array<any>) => {
      res.forEach(s => {
        this.surveys.push(this.surveyService.convert(s));
      });
    });
  }

  report(surveyId) {

  }

  openFillDialog(surveyId) {
    this.surveys.forEach(s => {
      if (s.id === surveyId) {
        this.selectedSurvey = s;
      }
    });
    this.fillDialog = true;
  }

  hideFillDialog() {
    this.fillDialog = false;
  }

}
