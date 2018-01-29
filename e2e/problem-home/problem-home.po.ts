import { browser, by, element } from 'protractor';

export class ProblemHomePage {
  navigateToTenant() {
    return browser.get('/tenant/5/problems');
  }

  navigateToEmployee() {
    return browser.get('/employee/1/problems');
  }

  navigateToBadUrl() {
    return browser.get('/employee/42/problems');
  }

  getNavbarTitle() {
    return element(by.className('navbar-brand')).getText();
  }

  getReportProblemButton() {
    return element(by.id('postProblemBtn'));
  }

  getForwardProblemButton() {
    return element(by.className('forward'));
  }

  getFirmToForward() {
    return element(by.className('firmToForward')).getText();
  }


}
