import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem("sidebar", "employee");
    localStorage.setItem("navbarTitle", "Početna");
  }

}