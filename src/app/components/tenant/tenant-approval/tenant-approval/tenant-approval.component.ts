import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../../../../services/supervisor-service/supervisor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tenant-approval',
  templateUrl: './tenant-approval.component.html',
  styleUrls: ['./tenant-approval.component.scss']
})
export class TenantApprovalComponent implements OnInit {

  constructor(private supervisorService: SupervisorService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.supervisorService.approvateTenant(encodeURIComponent(params['username']),
        encodeURIComponent(params['building']),
        encodeURIComponent(params['apartmentNo'])).subscribe(res => {
          this.router.navigate(['']);
      }, err => {
          this.router.navigate(['']);
      });
    });
  }

}
