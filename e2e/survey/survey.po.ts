import { browser, by, element } from 'protractor';

export class SurveyPage {
  navigateTo() {
    return browser.get('/tenant/1/surveys');
  }

  getNavbarTitle() {
    return element(by.className('navbar-brand')).getText();
  }

  getMessageDeleteButton() {
    return element(by.id('survey-deleted'));
  }

  getSurveysTable() {
    return element(by.css('table'));
  }

  getFillDialogButton() {
    return element(by.id('fill-button'));
  }

  getReportDialogButton() {
    return element(by.id('report-button'));
  }

  getDeleteDialogButton() {
    return element(by.id('delete-button'));
  }

  getNewDialogButton() {
    return element(by.id('new-survey'));
  }

  getFillDialog() {
    return element(by.id('fill-survey-dialog'));
  }

  getReportDialog() {
    return element(by.id('report-survey-dialog'));
  }

  getNewDialog() {
    return element(by.id('new-survey-dialog'));
  }

  getDeleteDialog() {
    return element(by.id('delete-survey-dialog'));
  }
}
