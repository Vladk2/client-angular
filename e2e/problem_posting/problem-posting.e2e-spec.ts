import { browser, by, element } from 'protractor';
import { fakeAsync, tick } from '@angular/core/testing';

import { ProblemPostingPage } from './problem-posting.po';

describe('Problem PostingPage', () => {
  let page: ProblemPostingPage;


  beforeEach(() => {
    page = new ProblemPostingPage();
  
  });

  it('should display correct navbar title for employee', () => {


    page.navigateTo();
    expect(page.getNavbarTitle()).toEqual('Prijava kvara');
  });

  it('should post a problem', () => {
    page.navigateTo();
    const probTit = page.getProblemTitle();
    const probDesc = page.getProblemDesc();
    const newProblemBtn = page.getReportProblemButton();
    probTit.sendKeys('Naslov kvara');
    probDesc.sendKeys('Opis kvara');
    newProblemBtn.click();
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/tenant/5/problems');
  }); 



});

