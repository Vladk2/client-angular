import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-problem',
  templateUrl: './tenant-problem.component.html',
  styleUrls: ['./tenant-problem.component.scss']
})
export class TenantProblemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem("sidebar", "tenant");
    localStorage.setItem("navbarTitle", "Kvarovi");

  }

}
