import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemService } from '../../../services/problem-service/problem.service';
import { AuthService } from '../../../services/auth-service/auth.service';
import { AlertService } from '../../../services/alert-service/alert.service';

@Component({
  selector: 'app-problem-home',
  templateUrl: './problem-home.component.html',
  styleUrls: ['./problem-home.component.scss']
})
export class ProblemHomeComponent implements OnInit {

  private role_id: any;
  private current_role: String;
  private images: any[] = [];
  private comments;
  private problems = [];
  private newComment = {};
  private firms;
  private is_supervisor: boolean;
  private visibleComments = {};

  constructor(private activeRoute: ActivatedRoute,
    private problemService: ProblemService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router) { }

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
      this.newComment = {};
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

      for (const problem of res) {
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
      console.log(this.visibleComments);

    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom dobavljanja kvarova.');
      });
  }

  resolveProblem(prob_id) {

  }

  forwardProblem(prob_id) {

  }

  setRepairDate(prob_id) {

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
