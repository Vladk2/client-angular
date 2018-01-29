import { browser, by, element } from 'protractor';

export class ProblemPostingPage {
  navigateTo() {
    return browser.get('/tenant/5/problems/report');
  }

  getNavbarTitle() {
    return element(by.className('navbar-brand')).getText();
  }

  getReportProblemButton() {
    return element(by.className('probSub'));
  }

  getProblemTitle() {
    return element(by.className('probTit'));
  }

  getProblemDesc() {
    return element(by.className('probDes'));
  }


}
