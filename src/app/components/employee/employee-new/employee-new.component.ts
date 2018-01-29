import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin-service/admin.service';

import { User } from '../../../models/user/user.model';
import { Firm } from '../../../models/firm/firm.model';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss']
})
export class EmployeeNewComponent implements OnInit {

  users: User[];
  firm: any = {};
  employeeId;
  message;
  username;
  constructor(
  	private employeeService: EmployeeService,
  	private activeRoute: ActivatedRoute,
  	private adminService: AdminService,
  	private router: Router
  ) {
  	this.firm = new Firm();
  	this.message = false;
  }

  ngOnInit() {
  	this.activeRoute.params.subscribe(params => {
      this.employeeId = (params['id']);
    });

    this.adminService.getAllUser().subscribe((res: any) => {
      
      this.users = res;
    });
  }

  onAddEmployee(id_user) {
  	this.employeeService.addEmployFirms(this.employeeId, id_user).subscribe((res: any) => {
  		this.message = true;
  		setTimeout(() => {
  			this.router.navigate(['/employee/' + this.employeeId +'/list']);

  		}, 1000);

  	});
  };


}
