import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../services/tenant-service/tenant.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert-service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-home',
  templateUrl: './tenant-home.component.html',
  styleUrls: ['./tenant-home.component.scss']
})
export class TenantHomeComponent implements OnInit {

  private announcements: any[];
  private announcement: any = {};
  private loading: boolean;
  private tenants_id: any;
  private parlRecord: any = [];

  constructor(private tenantService: TenantService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

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
          ann.assembly = true;
        } else {
          ann.assembly = false;
        }
      }
      this.loading = false;
      console.log(this.announcements);
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
    const announcement = {
      'title': this.announcement.title,
      'message': this.announcement.message,
      'isAnonymous': false,
    };

    this.tenantService.postAnnouncement(this.tenants_id, announcement).subscribe((res: any) => {

      this.announcement.title = '';
      this.announcement.message = '';
      const responseMessage = res.message;
      // ovo mozda otkomentarisati kada se doda iks za zatvaranje na alert divu
      // this.alertService.success(responseMessage);
      this.getAnnouncements();

    },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja obaveštenja.');
        this.loading = false;
      });
  }
}

