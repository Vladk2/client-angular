import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private user: any = {};
  private message: any;
  private building:any = [];

  constructor(private auth: AuthService) { }

  ngOnInit() {

    this.building = [
      {id: '1', address: {id:'1', street: 'dr. svetilava kasapinovica', number: '21', city: 'Novi Sad', zip: '21000'}},
      {id: '2', address: {
        id:'2', street: 'dr. svetilava kasapinovica', number: '22', city: 'Novi Sad', zip: '21000'
      }}
    ]
  }

  onRegistration() {
    this.auth.registration_service(this.user).subscribe(res => {
      this.message = res;
    }, err => {
      console.log(err);
      this.message = false;
    })
  }

}
