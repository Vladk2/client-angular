import { browser, by, element } from 'protractor';

export class UserPage {
  navigateTo() {
    return browser.get('/profile');
  }

  getNavbarTitle() {
    return element(by.className('navbar-brand')).getText();
  }

  getLastNameInput() {
    return element(by.css('input[name=last_name]'));
  }

  getEmailInput() {
    return element(by.css('input[name=email]'));
  }

  getNameInput() {
    return element(by.css('input[name=name]'));
  }

  getSubmitButton() {
    return element(by.css('.btn btn-info fill button-big-jasta'));
  }

  getSuccessDiv() {
    return element(by.css('.alert alert-success'));
  }

  getEmailWarning() {
    return element(by.css('alert alert-info'));
  }

  getPasswordWarning() {
    return element(by.css('alert alert-warning'));
  }

  getPasswordDialog() {
    return element(by.id('edit-pw'));
  }

  getDeleteDialogButton() {
    return element(by.id('rm-acc'));
  }

  getDeleteAccountButton() {
    return element(by.id('destroy'));
  }

  getPasswordUpdateButton() {
    return element(by.id('pw-update'));
  }

  getPasswordInputOne() {
    return element(by.css('input[name=password]'));
  }

  getPasswordInputTwo() {
    return element(by.css('input[name=repassword]'));
  }
}
