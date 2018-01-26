import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user.model';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent implements OnInit {
  private user: User;
  private message;

  constructor(private auth: AuthService) {
  	this.user = new User();
    this.message = false;
  }

  ngOnInit() {
  }

  onCreate() {
  	this.auth.registration_service(this.user).subscribe(res => {
      this.message = true;
    });
  }

}
