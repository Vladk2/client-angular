import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problem-home',
  templateUrl: './problem-home.component.html',
  styleUrls: ['./problem-home.component.scss']
})
export class ProblemHomeComponent implements OnInit {

  private tenant_id: any;
  images: any[] = [];

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Kvarovi');
    this.activeRoute.params.subscribe(params => {
      this.tenant_id = (params['id']);
    });
    this.images.push({source: 'assets/img/not-found.jpg'});
    this.images.push({source: 'assets/img/face-3.jpg'});
  }

}
