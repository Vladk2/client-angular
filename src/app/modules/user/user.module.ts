import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VerificationComponent} from '../../components/profile-verification/verification/verification.component';
import {UserService} from '../../services/user-service/user.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    VerificationComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
