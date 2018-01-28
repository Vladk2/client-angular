import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../services/tenant-service/tenant.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert-service/alert.service';
import { Router } from '@angular/router';
import { Announcement } from '../../../models/announcement/announcement.model';

@Component({
  selector: 'app-tenant-home',
  templateUrl: './tenant-home.component.html',
  styleUrls: ['./tenant-home.component.scss']
})
export class TenantHomeComponent implements OnInit {

  announcements: Announcement[];
  announcement: Announcement;
  loading: boolean;
  tenants_id: any;
  parlRecord: any = [];
  parlRecords: any = [];

  constructor(private tenantService: TenantService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
    this.announcement = new Announcement();
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Početna');
    this.activeRoute.params.subscribe(params => {
      this.tenants_id = (params['id']);
    });
    this.loading = true;
    this.announcement.message = '';
    this.getAnnouncements();

  }

  getAnnouncements() {
    this.tenantService.getAnnouncements(this.tenants_id).subscribe(res => {
      this.announcements = res.slice().reverse();
      for (const ann of this.announcements) {
        if (ann.title === 'ZAPISNIK SA SKUPŠTINE') {
          const stringRecord = ann.message.split('<|>');
          for (let i = 0; i < stringRecord.length - 1; i += 2) {
            const point: any = {};
            point.title = stringRecord[i];
            point.content = stringRecord[i + 1];
            this.parlRecord.push(point);
          }
          ann.parlRecord = this.parlRecord;
          this.parlRecord = [];
          ann.assembly = true;
        } else {
          ann.assembly = false;
        }
      }
      this.loading = false;
    });
  }

  postAnnouncement() {
    if (this.announcement.title === 'ZAPISNIK SA SKUPŠTINE') {
      this.announcement.title = 'Zapisnik sa skupštine';
    }
    if (this.announcement.title === 'SKUPŠTINA STANARA') {
      this.announcement.title = 'Skupština stanara';
    }
    this.loading = true;
    this.announcement.isAnonymous = false;
    this.tenantService.postAnnouncement(this.tenants_id, this.announcement).subscribe((res: any) => {

      this.announcement.title = '';
      this.announcement.message = '';
      this.getAnnouncements();

    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja obaveštenja.');
        this.loading = false;
      });
  }
}

