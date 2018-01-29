import { browser, by, element } from 'protractor';
import { fakeAsync, tick } from '@angular/core/testing';
import { LoginPage } from '../_login/login.po';
import { ParliamentPage } from './parliament.po';

describe('Parliament Page', () => {
  let page: ParliamentPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    page = new ParliamentPage();
    loginPage = new LoginPage();
  });

  it('should display correct navbar title', () => {

    loginPage = new LoginPage();
    loginPage.navigateTo();
    const usernameInput = loginPage.getUsernameInput();
    const passwordInput = loginPage.getPasswordInput();
    const submitButton = loginPage.getSubmitButton();
    usernameInput.sendKeys('riggy');
    passwordInput.sendKeys('123');
    submitButton.click();


    page.navigateTo();
    expect(page.getNavbarTitle()).toEqual('Skupština stanara');
  });





});

