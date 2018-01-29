import { TenantHomePage } from './tenant-home.po';
import { browser, by, element, protractor } from 'protractor';
import { fakeAsync, tick } from '@angular/core/testing';

describe('Tenant HomePage', () => {
    let page: TenantHomePage;

    beforeEach(() => {

        page = new TenantHomePage();

    });

    it('should display correct navbar title', () => {

        page.navigateTo();
        expect(page.getNavbarTitle()).toEqual('Početna');
    });


    it('should display 404 page', () => {
        page.navigateToBadUrl();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/%3F');
    });

    it('should successfully post an announcement', () => {
        page.navigateTo();
        const textArea = page.getAnnouncementTextArea();
        const postButton = page.getPostAnnouncementButton();
        textArea.sendKeys('Obavestenje neko lepo je ovo');
        postButton.click();
        expect(page.getAnnouncementDesc()).toEqual('Obavestenje neko lepo je ovo');
    });

    it('should go back on home screen', () => {
        page.navigateTo();
        const changeRoleButton = page.getChangeRoleButton();
        changeRoleButton.click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:49152/');
    }); 


});
