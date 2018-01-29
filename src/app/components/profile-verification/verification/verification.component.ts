import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user-service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.userService.verifyAccount(encodeURIComponent(params['token'])).subscribe(res => {
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      });
    });
  }

}
