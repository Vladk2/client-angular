import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Firm } from '../../../models/firm/firm.model';
import { Address } from '../../../models/address/address.model';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {

  firm: Firm;
  addressDTO: Address;
  message;
  employeeId;
  constructor(private employeeService: EmployeeService, private activeRoute: ActivatedRoute) {
    this.firm = new Firm();
    this.addressDTO = new Address();
    this.message = false;
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'employee');
    localStorage.setItem('navbarTitle', 'Početna');
    this.activeRoute.params.subscribe(params => {
      this.employeeId = (params['id']);
    });

    this.showFirm();
  }

  showFirm() {
    this.employeeService.showFirm(this.employeeId).subscribe((res: any) => {
      this.firm = res;
      this.addressDTO = res.address;
    });
  }

  onUpdate() {
    this.firm.address = this.addressDTO;
    this.employeeService.updateFirm(this.firm).subscribe((res: any) => {
      this.message = true;
    });
  }

}
