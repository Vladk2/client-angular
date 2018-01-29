import {browser} from 'protractor';
import {fakeAsync, tick} from '@angular/core/testing';
import {RegistrationPage} from './registration.po';

describe('Registration Page', () => {
  let page: RegistrationPage;

  beforeEach(() => {
    page = new RegistrationPage();
  });
});
