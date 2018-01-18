import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private user: any = {};
  private abode: any = {};
  private isSuccess: any;
  private building: any = [];
  private loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService) { this.isSuccess = true; }

  ngOnInit() {

    this.auth.getAllBuildings().subscribe(res => {
      console.log(res);
      this.building = res;
    });

  }

  onRegistration() {
    this.loading = true;
    const information = {
      'username': this.user.username,
      'password': this.user.password,
      'name': this.user.name,
      'last_name': this.user.last_name,
      'email': this.user.email,
      'abode': {
        'buildingId': this.abode.buildingId,
        'apartmentNo': this.abode.apartmentNo
      }
    };
    this.auth.registration_service(information).subscribe(res => {

      this.alertService.success('Registracija novog korisnika uspešna! ' +
      'Poslat Vam je verifikacioni mejl. Da biste aktivirali profil, morate verifikovati e-mail.', true);
      this.router.navigate(['/login']);
    },
      error => {
        this.alertService.error('GREŠKA: Proverite unete podatke');
        this.loading = false;
      });
  }
}
