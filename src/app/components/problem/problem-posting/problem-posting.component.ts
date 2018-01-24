import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProblemService } from '../../../services/problem-service/problem.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Problem } from '../../../models/problem/problem.model';
@Component({
  selector: 'app-problem-posting',
  templateUrl: './problem-posting.component.html',
  styleUrls: ['./problem-posting.component.scss'],

})
export class ProblemPostingComponent implements OnInit {

  private problem: Problem;
  private images: File[];
  private tenantId;
  constructor(private problemService: ProblemService,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService) {
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
    console.log(this.images);
    this.problemService.postProblem(this.tenantId, this.problem).subscribe((res: any) => {

      const responseMessage = res.message;

      // ovo mozda otkomentarisati kada se doda iks za zatvaranje na alert divu
      // this.alertService.success(responseMessage", true);
    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja kvara.');
      });

  }

  // puts uploaded images into property images
  uploadImages(event) {
    this.images = event.files;
    console.log(event.files);

  }

}
