import {browser, by, element} from 'protractor';
import {fakeAsync, tick} from '@angular/core/testing';
import {UserPage} from './user.po';


describe('User update UserPage', () => {
  let page: UserPage;


  beforeEach(() => {
    page = new UserPage();

  });

  it('should display user page', () => {
    page.navigateTo();
    const name = page.getNameInput();
    const lastname = page.getLastNameInput();
    const email = page.getEmailInput();
    const submit = page.getSubmitButton();

    expect(page.getNavbarTitle()).toEqual('riggy');


    expect(name).toBeTruthy();
    expect(lastname).toBeTruthy();
    expect(email).toBeTruthy();
    expect(submit).toBeTruthy();
  });

  it('should fail in update. email required', () => {
    page.navigateTo();
    const name = page.getNameInput();
    const lastname = page.getLastNameInput();
    const email = page.getEmailInput();
    const submit = page.getSubmitButton();
    email.clear();
    browser.waitForAngular();
  });

  it('should fail in update. email already taken', () => {
    page.navigateTo();
    const name = page.getNameInput();
    const lastname = page.getLastNameInput();
    const email = page.getEmailInput();
    const submit = page.getSubmitButton();
    email.clear();
    email.sendKeys('nnnnn@gmail.com');
    browser.waitForAngular();
    expect(page.getEmailWarning()).toBeTruthy();
  });

  it('should pass update', () => {
    page.navigateTo();
    const name = page.getNameInput();
    const lastname = page.getLastNameInput();
    const email = page.getEmailInput();
    const submit = page.getSubmitButton();
    email.clear();
    email.sendKeys('riggy.ruter2@gmail.com');
    browser.waitForAngular();
    expect(page.getSuccessDiv()).toBeTruthy();
  });

  it('should open password edit dialog', () => {
    page.navigateTo();
    page.getPasswordDialog().click();
    expect(element(by.css('.p-dialog'))).toBeTruthy();
  });

  it('should fail. passwords don`t match', () => {
    page.navigateTo();
    page.getPasswordDialog().click();
    page.getPasswordInputOne().sendKeys('123');
    page.getPasswordInputTwo().sendKeys('321');
    expect(page.getPasswordWarning()).toBeTruthy();
  });

  it('should pass in updating password', () => {
    page.navigateTo();
    page.getPasswordDialog().click();
    page.getPasswordInputOne().sendKeys('123');
    page.getPasswordInputTwo().sendKeys('123');
    expect(page.getPasswordWarning()).toBeTruthy();
  });

  it('should open delete account dialog', () => {
    page.navigateTo();
    page.getDeleteDialogButton().click();
    expect(element(by.css('.p-confirmDialog'))).toBeTruthy();
  });

  it('should delete account', () => {
    page.navigateTo();
    page.getDeleteDialogButton().click();
    page.getDeleteAccountButton().click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/login');
  });
});

