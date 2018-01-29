import { AppPage } from './app.po';
import { browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';


const origFn = browser.driver.controlFlow().execute;
browser.driver.manage().window().setSize(1200, 900);
browser.driver.controlFlow().execute = function () {
  const args = arguments;

    // queue 100ms wait
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(100);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
}; 



describe('client App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
});
