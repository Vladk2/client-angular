import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';
import { Firm } from '../../../models/firm/firm.model';
import {ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'app-admin-list-firms',
  templateUrl: './admin-list-firms.component.html',
  styleUrls: ['./admin-list-firms.component.scss']
})
export class AdminListFirmsComponent implements OnInit {

  private firms: Firm[];
  message;
  progres;
  deleteDialog;
  id_user: any;
  private currentTimeout;
  constructor(private adminService: AdminService,
              private confirmationService: ConfirmationService,) {
    this.message = false; this.progres = false; this.deleteDialog = false;
  }

  ngOnInit() {
      this.adminService.getAllFirms().subscribe(res => {
      this.firms = res;
    });
  }

  openDeleteDialog(id_user) {
    this.deleteDialog = true;
    this.id_user = id_user;
    this.confirmationService.confirm({
      message: 'Da li ste sigurni da želite da obrišete firmu?',
      header: 'Potvrda',
      icon: 'fa fa-question-circle'
    });
  }

  onRemoveFirm() {
    this.adminService.removeFirm(this.id_user).subscribe(resp =>  {

      this.progres = true;
      this.deleteDialog = false;
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
