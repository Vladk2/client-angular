import {LoginPage} from './login.po';
import {browser} from 'protractor';
import {fakeAsync, tick} from '@angular/core/testing';

describe('Login Page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should display message for signing in', () => {
    page.navigateTo();
    expect(page.getPanelTitle()).toEqual('Prijava');
  });

  it('should result in bad login', () => {
    page.navigateTo();
    const messageDiv = page.getMessageDiv();
    const usernameInput = page.getUsernameInput();
    const passwordInput = page.getPasswordInput();
    const submitButton = page.getSubmitButton();

    usernameInput.sendKeys('riggy');
    passwordInput.sendKeys('1233');
    submitButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/login');
  });

  it('should result in successful login', () => {
    page.navigateTo();
    const messageDiv = page.getMessageDiv();
    const usernameInput = page.getUsernameInput();
    const passwordInput = page.getPasswordInput();
    const submitButton = page.getSubmitButton();

    usernameInput.sendKeys('riggy');
    passwordInput.sendKeys('123');
    submitButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/');
  });
});
