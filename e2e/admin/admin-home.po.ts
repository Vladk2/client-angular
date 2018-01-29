import { browser, by, element } from 'protractor';

export class AdminHomePage {
  navigateTo() {
    return browser.get('/admin/');
  }

  getNavbarTitle() {
    return element(by.className('navbar-brand')).getText();
  }

}
