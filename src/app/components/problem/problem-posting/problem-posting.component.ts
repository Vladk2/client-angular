import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProblemService } from '../../../services/problem-service/problem.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem } from '../../../models/problem/problem.model';
@Component({
  selector: 'app-problem-posting',
  templateUrl: './problem-posting.component.html',
  styleUrls: ['./problem-posting.component.scss'],

})
export class ProblemPostingComponent implements OnInit {

  problem: Problem;
  tenantId: any;
  postClicked = false;
  loading = false;
  image: any;
  constructor(private problemService: ProblemService,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router) {
    this.problem = new Problem();
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Prijava kvara');
    this.activeRoute.params.subscribe(params => {
      this.tenantId = (params['id']);
    });
  }

  postProblem() {
    this.postClicked = true;
    this.loading = true;
    const that = this;
    this.problemService.postProblem(this.tenantId, this.problem).subscribe((res: any) => {
      setTimeout(function () {
        that.alertService.success('Kvar uspešno postavljen!', true);
        that.router.navigate(['tenant/' + that.tenantId + '/problems']);
      }, 3000);
    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja kvara.');
      });
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  // puts uploaded images into property images
  uploadImages(event) {
    this.problem.images = [];
    const that = this;
    for (const img of event.files) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function () {
        that.problem.images.push(reader.result);
        // console.log(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }
}
