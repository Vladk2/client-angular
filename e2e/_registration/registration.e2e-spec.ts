import { browser, by, element } from 'protractor';
import { fakeAsync, tick } from '@angular/core/testing';
import { RegistrationPage } from './registration.po';

describe('Registration Page', () => {
  let page: RegistrationPage;

  beforeEach(() => {
    page = new RegistrationPage();
    page.navigateTo();
  });

  it('should render page with form', () => {
    const username = page.getUsernameInput();
    const name = page.getNameInput();
    const lastname = page.getLastNameInput();
    const password = page.getPasswordInput();
    const email = page.getEmailInput();
    const apartmentNo = page.getApartmentNoInput();
    const submit = page.getSubmitButton();

    expect(username).toBeTruthy();
    expect(name).toBeTruthy();
    expect(lastname).toBeTruthy();
    expect(password).toBeTruthy();
    expect(email).toBeTruthy();
    expect(apartmentNo).toBeTruthy();
    expect(submit).toBeTruthy();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/registration');
  });

  it('should fail in registration process. building is required', () => {
    const username = page.getUsernameInput();
    const name = page.getNameInput();
    const lastname = page.getLastNameInput();
    const password = page.getPasswordInput();
    const email = page.getEmailInput();
    const apartmentNo = page.getApartmentNoInput();
    const submit = page.getSubmitButton();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/registration');

    username.sendKeys('riggy');
    name.sendKeys('riggy');
    lastname.sendKeys('ruter');
    password.sendKeys('123');
    email.sendKeys('rrr@rr.com');
    apartmentNo.sendKeys(22);

    submit.click();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/registration');
    expect(element(by.id('iks'))).toBeTruthy();
  });
});
