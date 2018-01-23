import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProblemService } from '../../../services/problem-service/problem.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-problem-posting',
  templateUrl: './problem-posting.component.html',
  styleUrls: ['./problem-posting.component.scss'],

})
export class ProblemPostingComponent implements OnInit {

  private problem: any = {};
  private images: File[];
  private tenantId;
  constructor(private problemService: ProblemService,
             private activeRoute: ActivatedRoute,
             private alertService: AlertService) { }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Prijava kvara');

    this.activeRoute.params.subscribe(params => {
      this.tenantId = (params['id']);
    });
  }

  postProblem() {
    console.log(this.images);
    const problem = {
      'title': this.problem.title,
      'description': this.problem.desc,
      'openForAll': this.problem.openForAll,
      'images': this.images
    };
    this.problemService.postProblem(this.tenantId, problem).subscribe((res: any) => {

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
