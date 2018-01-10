import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private user: any = {};
  private abode: any = {};
  private message: any;
  private isNotSave: any;
  private building:any = [];

  constructor(private auth: AuthService) { this.isNotSave = false }

  ngOnInit() {

    this.auth.getAllBuildings().subscribe(res => {
      console.log(res);
      this.building = res;
    })

  }

  onRegistration() {
    let information = {
      'username':this.user.username,
      'password':this.user.password,
      'name':this.user.name,
      'last_name':this.user.last_name,
      'email':this.user.email,
      'abode':{
        'buildingId':this.abode.buildingId,
        'apartmentNo':this.abode.apartmentNo
      }
    }
    this.auth.registration_service(information).subscribe(res => {
      this.message = res;
      console.log(res);
      if(!res) {
        this.isNotSave = false;
      }
    })
  }

}
