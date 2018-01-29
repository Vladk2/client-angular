import { browser, by, element } from 'protractor';

export class ParliamentPage {
  navigateTo() {
    return browser.get('/tenant/1/parliament');
  }

  getNavbarTitle() {
    return element(by.className('navbar-brand')).getText();
  }

}
