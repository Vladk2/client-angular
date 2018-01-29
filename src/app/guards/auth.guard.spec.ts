import { TestBed, async, inject } from '@angular/core/testing';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth-service/auth.service';

describe('AuthGuard', () => {
  let router = {
  	navigate: jasmine.createSpy('navigate')
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      	{provide: Router, useValue: router},
      	{provide: HttpClient, deps: [MockBackend]},
      	AuthGuard,
      	AuthService
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

});
