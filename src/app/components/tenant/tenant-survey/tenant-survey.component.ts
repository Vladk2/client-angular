import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { TenantService } from "../../../services/tenant-service/tenant.service";
import { SurveyService } from "../../../services/survey-service/survey.service";
import { AlertService } from "../../../services/alert-service/alert.service";

import { Survey } from "../../../models/survey/survey.model";

import { ConfirmationService } from "primeng/primeng";

@Component({
  selector: 'app-tenant-survey',
  templateUrl: './tenant-survey.component.html',
  styleUrls: ['./tenant-survey.component.scss']
})
export class TenantSurveyComponent implements OnInit {

  private messageDeleted: boolean = false;

  private fillDialog: boolean = false;
  private deleteDialog: boolean = false;
  private createSurveyDialog: boolean = false;

  private selectedSurvey: Survey;

  private surveys: Survey[] = [];
  private tenant: any = {};

  constructor(private tenantService: TenantService,
    private surveyService: SurveyService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
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

  destroy() {
    this.surveyService.delete(this.selectedSurvey.id).subscribe(res => {
      let index = this.surveys.findIndex(s => s.id === this.selectedSurvey.id);
      this.surveys.splice(index, 1);

      this.messageDeleted = true;
      this.deleteDialog = false;
    }, error => {
      alert('error');
    });
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

  confirm(survey) {
    this.deleteDialog = true;
    this.selectedSurvey = survey;
    this.confirmationService.confirm({
      message: 'Da li ste sigurni da želite da obrišete anketu?',
      header: 'Potvrda',
      icon: 'fa fa-question-circle'
    });
  }

  private resetMessageDivs() {
    this.messageDeleted = false;
  }

}
