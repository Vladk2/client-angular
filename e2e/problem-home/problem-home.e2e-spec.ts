import { browser, by, element } from 'protractor';
import { fakeAsync, tick } from '@angular/core/testing';
import { ProblemHomePage } from './problem-home.po';

describe('Problem HomePage', () => {
  let page: ProblemHomePage;


  beforeEach(() => {
    page = new ProblemHomePage();

  });

  it('should display correct navbar title for employee', () => {

    page.navigateToEmployee();
    expect(page.getNavbarTitle()).toEqual('Popravke');
  });

  
  it('should display correct navbar title for employee', () => {

    page.navigateToTenant();
    expect(page.getNavbarTitle()).toEqual('Kvarovi');
  });

  it('should display 404 page', () => {

    page.navigateToBadUrl();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/%3F');
  });

  it('should navigate to report a new problem page', () => {
    page.navigateToTenant();
    const newProblemBtn = page.getReportProblemButton();
    newProblemBtn.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/tenant/5/problems/report');
  }); 

 /* it('should show firms who are available to receive a problem', () => {
    page.navigateToTenant();
    const forwardBtn = page.getForwardProblemButton();
    forwardBtn.click();
    expect(page.getFirmToForward()).toEqual('Domus, Novi Sad');
  }); */ 

});

