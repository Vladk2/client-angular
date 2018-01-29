import { browser, by, element } from 'protractor';

export class RegistrationPage {
  navigateTo() {
    return browser.get('/registration');
  }

  getNameInput() {
    return element(by.css('input[name=name]'));
  }

  getUsernameInput() {
    return element(by.css('input[name=username]'));
  }

  getPasswordInput() {
    return element(by.css('input[name=password]'));
  }

  getLastNameInput() {
    return element(by.css('input[name=last_name]'));
  }

  getEmailInput() {
    return element(by.css('input[name=email]'));
  }

  getApartmentNoInput() {
    return element(by.css('input[name=apartmentNo]'));
  }

  getSubmitButton() {
    return element(by.css('input[type=submit]'));
  }

}
