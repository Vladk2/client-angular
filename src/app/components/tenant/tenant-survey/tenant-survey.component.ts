import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {TenantService} from '../../../services/tenant-service/tenant.service';
import {SurveyService} from '../../../services/survey-service/survey.service';
import {AlertService} from '../../../services/alert-service/alert.service';

import {Survey} from '../../../models/survey/survey.model';
import {Tenant} from '../../../models/user/tenant.model';
import {SurveyResponse} from '../../../models/survey/survey-response.model';
import {UserResponse} from '../../../models/survey/user-response.model';

import {ConfirmationService} from 'primeng/primeng';
import {Answer} from '../../../models/survey/answer.model';
import {Question} from '../../../models/survey/question.model';

@Component({
  selector: 'app-tenant-survey',
  templateUrl: './tenant-survey.component.html',
  styleUrls: ['./tenant-survey.component.scss']
})
export class TenantSurveyComponent implements OnInit {

  private messageDeleted: boolean = false;
  private messageFilled: boolean = false;
  private messageCreated: boolean = false;

  private fillDialog: boolean = false;
  private reportDialog: boolean = false;
  private deleteDialog: boolean = false;
  private createSurveyDialog: boolean = false;

  private selectedSurvey: Survey = new Survey();

  private newSurvey: Survey = new Survey();
  private newQuestion: Question =
    new Question('', '', '');

  private RESULTS: any = [];
  private tenant: Tenant = new Tenant();

  private userResponse: UserResponse = new UserResponse();

  constructor(private tenantService: TenantService,
              private surveyService: SurveyService,
              private alertService: AlertService,
              private confirmationService: ConfirmationService,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Početna');

    this.activeRoute.params.subscribe(params => {
      this.tenant.id = params['id'];

      this.tenantService.getUsersTenants().subscribe(res => {
        const resTenant = res.filter(t => t.building.id === +this.tenant.id)[0];

        this.tenant.userId = resTenant.user.id;
        this.tenant.buildingId = resTenant.building.id;

        const tenantsFromToken = JSON.parse(localStorage.getItem('token'));

        tenantsFromToken.tenants.forEach(t => {
          if (t.tenant === this.tenant.id) {
            this.tenant.owner = t.owner;
            if (t.supervisor) {
              this.tenant.supervisor = true;
            }
          }
        });
        this.getSurveys();
      });
    });
  }

  getSurveys() {
    this.surveyService.getSurveys(this.tenant.buildingId).subscribe((res: Array<any>) => {
      this.RESULTS = res;
    });
  }

  destroy() {
    this.surveyService.delete(this.selectedSurvey.id).subscribe(res => {
      let index = this.RESULTS.findIndex(s => s.survey.id === this.selectedSurvey.id);
      this.RESULTS.splice(index, 1);

      this.messageDeleted = true;
      this.deleteDialog = false;
    }, error => {
      alert('error');
    });
  }

  openFillDialog(survey) {
    this.selectedSurvey = survey;
    this.fillResponseWithQuestions();
    this.fillDialog = true;
  }

  submit() {
    this.surveyService.fillOut(this.userResponse).subscribe(res => {
      alert('jes');
    }, err => {
      alert('nene');
    });
  }

  hideFillDialog() {
    this.fillDialog = false;
  }

  openReportDialog(survey) {
    this.reportDialog = true;
    this.RESULTS.forEach(r => {
      if (r.survey.id = survey.id) {

      }
    });
  }

  hideReportDialog() {
    this.reportDialog = false;
  }

  openCreateDialog() {
    this.newSurvey.questionDTO = new Array<Question>();

    this.createSurveyDialog = true;
  }

  hideCreateDialog() {
    this.createSurveyDialog = false;
  }

  addQuestion() {
    this.newSurvey.questionDTO.push(new Question(this.newQuestion.id,
      this.newQuestion.question,
      this.newQuestion.typeQuestion));
  }

  createSurvey() {
    console.log(this.newSurvey);
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

  private fillResponseWithQuestions() {
    this.userResponse.survey = this.selectedSurvey.id;
    this.selectedSurvey.questionDTO.forEach(q => {
      this.userResponse.answers.push(new Answer(q));
    });
  }

}
