import {browser, by, element} from 'protractor';
import {fakeAsync, tick} from '@angular/core/testing';
import {SurveyPage} from './survey.po';


describe('User update UserPage', () => {
  let page: SurveyPage;

  beforeEach(() => {
    page = new SurveyPage();

  });

  it('should display surveys page', () => {
    page.navigateTo();
    const table = page.getSurveysTable();
    const newButton = page.getNewDialogButton();
    const reportButton = page.getReportDialogButton();
    const fillButton = page.getFillDialogButton();
    const deleteButton = page.getDeleteDialogButton();

    expect(page.getNavbarTitle()).toEqual('Ankete');
    expect(table.isPresent()).toBeTruthy();
    expect(newButton).toBeTruthy();
    expect(reportButton).toBeTruthy();
    expect(fillButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });

  it('should open fill dialog', () => {
    page.navigateTo();
    const fillButton = page.getFillDialogButton();
    fillButton.click();

    expect(page.getFillDialog()).toBeTruthy();
  });

  it('should open report dialog', () => {
    page.navigateTo();
    const reportButton = page.getReportDialogButton();
    reportButton.click();

    expect(page.getReportDialog).toBeTruthy();
  });

  it('should open delete dialog', () => {
    page.navigateTo();
    const deleteButton = page.getDeleteDialogButton();
    deleteButton.click();

    expect(page.getReportDialog).toBeTruthy();
  });

  it('should open new dialog', () => {
    page.navigateTo();
    const newButton = page.getNewDialogButton();
    newButton.click();

    expect(page.getNewDialog).toBeTruthy();
  });

});
