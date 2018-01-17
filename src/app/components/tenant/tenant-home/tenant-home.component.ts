import {Component, OnInit} from '@angular/core';
import {TenantService} from '../../../services/tenant-service/tenant.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../services/alert-service/alert.service';
import {Router} from '@angular/router';

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

  constructor(private tenantService: TenantService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Početna');
    this.activeRoute.params.subscribe(params => {
      this.tenants_id = (params['id']);
    });
    this.loading = true;
    this.tenantService.getAnnouncements(this.tenants_id).subscribe(res => {
      console.log(res);
      this.announcements = res;
      this.loading = false;
    });

  }

  postAnnouncement() {
    this.loading = true;
    const announcement = {
      'title': this.announcement.title,
      'message': this.announcement.message,
      'isAnonymous': false,
    };

    this.tenantService.postAnnouncement(this.tenants_id, announcement).subscribe(res => {

        this.announcement.title = '';
        this.announcement.message = '';
        const responseMessage = JSON.parse(JSON.stringify(res)).message;
        // ovo mozda otkomentarisati kada se doda iks za zatvaranje na alert divu
        // this.alertService.success(responseMessage);
        this.tenantService.getAnnouncements(this.tenants_id).subscribe(res => {
          console.log(res);
          this.announcements = res;
          this.loading = false;
        });

      },
      error => {
        this.alertService.error('GREŠKA: Greška prilikom postavljanja obaveštenja.');
        this.loading = false;
      });
  }
}

