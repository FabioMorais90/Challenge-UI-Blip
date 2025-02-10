import { test, expect, type Page, BrowserContext } from '@playwright/test';
import { PlanetMainPage } from '../page_objects/PlanetMainPage';


test.describe('Planet Challenge',() => {
    let context: BrowserContext;
    let page: Page;
    let mainPage: PlanetMainPage;

    test.beforeEach(async ({browser}) => {
        //Set the browser viewport size to 1024x768 for both browsers.
        context = await browser.newContext({
            viewport: {width:1024 ,height: 768}
        });
        page = await context.newPage();
    });

    test('Test MainPage', async ({}) => {

        //Navigate to the www.wearepalnet.com website.
        mainPage = new PlanetMainPage(page);
        await mainPage.goto();

        //test the contact buttons
        await mainPage.clickContact();


    });

    test.afterEach(async ({}) => {
        await page.close();
        await context.close();
    });
});