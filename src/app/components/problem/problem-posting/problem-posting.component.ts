import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-problem-posting',
  templateUrl: './problem-posting.component.html',
  styleUrls: ['./problem-posting.component.scss'],

})
export class ProblemPostingComponent implements OnInit {

  private problem: any = {};
  private images: any;
  constructor() { }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Prijava kvara');
  }

  postProblem() {

    const problem = {'title': this.problem.title,
                    'description': this.problem.desc,
                    'openForAll': this.problem.openForAll,
                    'images': this.images };
    console.log(problem);
  }

  // puts uploaded images into property images
  uploadImages(event) {
    this.images = event.files;
}

}
