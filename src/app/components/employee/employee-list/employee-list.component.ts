import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Firm } from '../../../models/firm/firm.model';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  
  firm: Firm;
  employeeId;
  users: User[];
  owner;
  progres;
  korisnicko;
  constructor(private employeeService: EmployeeService, private activeRoute: ActivatedRoute) {
  	this.firm = new Firm();
    this.progres = false;
  }

  ngOnInit() {

  	this.activeRoute.params.subscribe(params => {
      this.employeeId = (params['id']);
    });
  	this.employeeService.showFirm(this.employeeId).subscribe((res: any) => {
    	this.users = res.userDTO;
    })

    const token = JSON.parse(localStorage.getItem('token'));
    this.korisnicko = token.username;
  }

  onRemoveEmployee(id_user) {
    this.employeeService.removeEmployFirms(this.employeeId, id_user).subscribe((res: any) => {
      this.progres = true;
      setTimeout(() => {
        this.progres = false;
        this.employeeService.showFirm(this.employeeId).subscribe((res: any) => {
          this.users = res.userDTO;
          this.owner = this.users.length;
        })
      }, 1000);
    });
  };

}
