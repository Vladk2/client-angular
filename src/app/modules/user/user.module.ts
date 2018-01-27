import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VerificationComponent} from '../../components/profile-verification/verification/verification.component';
import {UserService} from '../../services/user-service/user.service';
import {RouterModule} from '@angular/router';
import {NavbarModule} from '../../components/navbar/navbar.module';
import {BrowserModule} from '@angular/platform-browser';
import {SidebarModule} from '../../components/sidebar/sidebar.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    NavbarModule,
    FormsModule,
    BrowserModule
  ],
  declarations: [
    VerificationComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
