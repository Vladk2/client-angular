import { browser, by, element } from 'protractor';

export class TenantHomePage {

    navigateTo() {
        return browser.get('/tenant/1');
    }

    navigateToBadUrl() {
        return browser.get('/tenant/23');
    }
    getNavbarTitle() {
        return element(by.className('navbar-brand')).getText();
    }

    getAnnouncementTextArea() {
        return element(by.id('announceTextArea'));
    }
    getPostAnnouncementButton() {
        return element(by.id('announceButton'));
    }
    getAnnouncementDesc() {
        return element(by.className('announcementDesc')).getText();
    }

    getChangeRoleButton() {
        return element(by.id('changeRole'));
    }

}
