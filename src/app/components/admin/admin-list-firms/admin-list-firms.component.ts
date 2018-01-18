import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';

@Component({
  selector: 'app-admin-list-firms',
  templateUrl: './admin-list-firms.component.html',
  styleUrls: ['./admin-list-firms.component.scss']
})
export class AdminListFirmsComponent implements OnInit {

  private firms: any = [];
  message;
  progres;
  private currentTimeout;
  constructor(private adminService: AdminService) {
    this.message = false; this.progres = false;
  }

  ngOnInit() {
      this.adminService.getAllFirms().subscribe(res => {
      this.firms = res;
    });
  }

  onRemoveFirm(event) {
    this.adminService.removeFirm(event).subscribe(resp =>  {

      this.progres = true;
      this.currentTimeout = setTimeout(() => {
        this.adminService.getAllFirms().subscribe(res => {
          this.message = true;
          this.progres = false;
          this.firms = res;
        });
      }, 1000);

    });
  }

}
