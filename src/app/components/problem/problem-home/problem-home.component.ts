import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemService } from '../../../services/problem-service/problem.service';
import { AuthService } from '../../../services/auth-service/auth.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { AdminService } from '../../../services/admin-service/admin.service';
import { Date } from '../../../models/date/date.model';
import { Comment } from '../../../models/problem/comment.model';
import { Problem } from '../../../models/problem/problem.model';

@Component({
  selector: 'app-problem-home',
  templateUrl: './problem-home.component.html',
  styleUrls: ['./problem-home.component.scss']
})
export class ProblemHomeComponent implements OnInit {

  private role_id: any;
  private current_role: String;
  private images: any[] = [];
  private comments: Comment[] = [];
  private problems: Problem[] = [];
  private newComment: Comment;
  private firms;
  private allFirms = [];
  private is_supervisor: boolean;
  private visibleComments = {};
  private clickedProblem;
  private clickedFirm;
  private displayResolveDialog = false;
  private displayForwardDialog = false;
  private displayRepairDateDialog = false;
  private repairDate;
  private chosenRepairDate;


  constructor(private activeRoute: ActivatedRoute,
    private problemService: ProblemService,
    private alertService: AlertService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private location: Location,
    private adminService: AdminService) {
    this.clickedFirm = { 'id': '', 'name': '' };
    this.newComment = new Comment();
  }

  ngOnInit() {

    this.activeRoute.params.subscribe(params => {
      this.role_id = (params['id']);
    });
    if (this.isTenantOrEmployee()) {
      this.current_role = this.isTenantOrEmployee();
    }
    if (this.current_role === 'tenant') {
      this.isSupervisor();
      localStorage.setItem('sidebar', 'tenant');
      localStorage.setItem('navbarTitle', 'Kvarovi');
    } else if (this.current_role === 'employee') {
      localStorage.setItem('navbarTitle', 'Popravke');
      localStorage.setItem('sidebar', 'employee');
    }
    this.getProblems();
    this.getComments();
    this.images.push({ source: 'assets/img/not-found.jpg' });
    this.images.push({ source: 'assets/img/face-3.jpg' });
  }

  isTenantOrEmployee() {
    if ((this.router.url.split('/'))[1] === 'tenant') {
      return 'tenant';
    } else if ((this.router.url.split('/'))[1] === 'employee') {
      return 'employee';
    } else { return null; }
  }

  postComment(prob_id) {
    this.problemService.postComment(prob_id, this.newComment).subscribe((res: any) => {
      this.getComments();
      this.newComment = new Comment();
    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja komentara.');
      });
  }

  getComments() {
    this.problemService.getComments().subscribe((res: any) => {
      this.comments = res;
    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom dobavljanja komentara.');
      });
  }

  showComments(prob_id) {
    this.visibleComments['problem' + prob_id] = true;
  }

  getProblems() {
    this.problemService.getProblems().subscribe((res: any) => {
      const allProblems: Problem[] = res;
      for (const problem of allProblems) {
        // tslint:disable-next-line:triple-equals
        if (this.current_role === 'tenant' && (problem.tenant.id == this.role_id || (problem.firm == null && this.is_supervisor))) {
          this.problems.push(problem);
          for (const prob of this.problems) {
            this.visibleComments['problem' + prob.id] = false;
          }
        } else if (this.current_role === 'employee') {
          // uzimamo sve firme u kojima zaposleni radi, da bi proverili ima li kvarova prosledjenih toj firmi
          this.authService.findFirm().subscribe((firms: any) => {
            for (const firm of firms) {
              if (problem.firm && firm.id === problem.firm.id) {
                this.problems.push(problem);
              }
            }
            for (const prob of this.problems) {
              this.visibleComments['problem' + prob.id] = false;
            }
          });
        }
      }

    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom dobavljanja kvarova.');
      });
  }

  resolveProblemConfirm(prob_id) {
    this.displayResolveDialog = true;
    this.clickedProblem = prob_id;
    this.confirmationService.confirm({
      message: 'Ukoliko potvrdite, kvar će biti uklonjen sa liste aktivnih kvarova.',
      header: 'Kvar je rešen?',
      icon: 'fa fa-question-circle',
    });
  }

  resolveProblem() {

    this.problemService.resolveProblem(this.clickedProblem).subscribe((res: any) => {
      this.alertService.success(res.message);
      this.displayResolveDialog = false;
      this.problems = [];
      this.getProblems();
    },
      error => {
        this.displayResolveDialog = false;
        this.alertService.error('GREŠKA: Greška prilikom rešavanja kvara.');
      });
  }

  forwardProblemDialog(prob_id, firm_id) {
    this.displayForwardDialog = true;
    this.clickedProblem = prob_id;
    this.allFirms = [];
    this.adminService.getAllFirms().subscribe((res: any) => {
      for (const firm of res) {
        for (const prob of this.problems) {
          if (prob.firm && firm.id !== prob.firm.id) {
            this.allFirms.push(firm);
            break;
          } else if (!prob.firm) {
            this.allFirms.push(firm);
            break;
          }
        }
      }
    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom učitavanja firmi.');
      });
  }
  firmChosen(firm_id, firm_name) {
    this.clickedFirm = { 'id': firm_id, 'name': firm_name };
  }
  forwardProblem() {
    if (this.clickedFirm.id !== '') {
      this.problemService.forwardProblem(this.clickedProblem, this.clickedFirm.id).subscribe((res: any) => {
        this.alertService.success(res.message);
        this.displayForwardDialog = false;
        this.clickedFirm = {};
        this.problems = [];
        this.getProblems();
      },
        error => {
          this.displayForwardDialog = false;
          this.alertService.error('GREŠKA: Greška prilikom rešavanja kvara.');
        });
    }
  }
  repairDateDialog(prob_id) {
    this.displayRepairDateDialog = true;
    this.clickedProblem = prob_id;
  }

  showDate() {
    const date = new Date(this.repairDate.toLocaleString('en-GB'));
    const dateSplit = date.date.split(',');
    this.chosenRepairDate = dateSplit[0] + dateSplit[1].slice(0, -3);
  }
  setRepairDate() {
    const repairDate = new Date(this.chosenRepairDate);
    if (this.chosenRepairDate) {
      this.problemService.setRepairDate(this.clickedProblem, repairDate).subscribe((res: any) => {
        this.alertService.success(res.message);
        this.displayRepairDateDialog = false;
        this.problems = [];
        this.getProblems();
      },
        error => {
          this.displayRepairDateDialog = false;
          this.alertService.error('GREŠKA: Greška prilikom zakazivanja popravke. Proverite uneti datum.');
        });
    }
  }
  isSupervisor() {
    const token = JSON.parse(localStorage.getItem('token'));
    for (const tenant of token.tenants) {
      if (tenant.tenant === this.role_id) {
        if (tenant.supervisor) {
          this.is_supervisor = true;
        } else {
          this.is_supervisor = false;
        }
      }
    }
  }
}
