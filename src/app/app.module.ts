import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './guards/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './admin/sidebar/sidebar.module';
import { NavbarModule } from './admin/shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';
import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './admin/home/admin.component';
import { TokenService } from './guards/token.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    SidebarModule,
    NavbarModule
  ],
  providers: [
    AdminGuard,
    TokenService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
