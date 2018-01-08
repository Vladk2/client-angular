import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-home',
  templateUrl: './tenant-home.component.html',
  styleUrls: ['./tenant-home.component.scss']
})
export class TenantHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem("sidebar", "tenant");
    localStorage.setItem("navbarTitle", "Početna");
  }

}
