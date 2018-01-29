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

  user: any = {};
  abode: any = {};
  isSuccess: any;
  buildings: any = [];
  loading = false;

  constructor(private auth: AuthService,
              private router: Router,
              private alertService: AlertService) {
    this.isSuccess = true;
  }

  ngOnInit() {
    this.auth.getAllBuildings().subscribe(res => {
      this.buildings = res;
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
        this.alertService.success('Registracija uspešna! ' +
          'Poslat Vam je verifikacioni mejl. Da biste aktivirali profil,' +
          ' kliknite na link u mejlu.', true);
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error('GREŠKA: Korisnik već postoji.');
        this.loading = false;
      });
  }
}
