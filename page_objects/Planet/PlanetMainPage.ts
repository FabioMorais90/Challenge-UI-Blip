import { expect, type Locator, type Page } from '@playwright/test';

const pageLink: string = 'https://www.weareplanet.com/'
const homePageTitle : string = "Connecting payments and software";
const contactPageTitle : string = "How can we help you today?";

export class PlanetMainPage {
    private  page : Page;
    readonly cookiebuttonLocator: Locator;
    readonly mainPageLocator : Locator;
    readonly contactButton1Locator : Locator;
    readonly contactButton2Locator : Locator;
    readonly contactPageLocator : Locator;


    constructor(page: Page) {
        this.page = page;
        this.cookiebuttonLocator = this.page.locator('//button[@id="onetrust-accept-btn-handler"]')
        this.mainPageLocator = this.page.locator('//h1[contains(text(), "Connecting")]');
        this.contactButton1Locator = this.page.locator('//div[@id="block-cohesion-theme-content"]//a[contains(text(), "Contact") and @href="/contact"]');
        this.contactButton2Locator = this.page.locator('//div[@id="block-cohesion-theme-content"]//a[contains(text(), "touch") and @href="/contact"]');
        this.contactPageLocator = this.page.locator('//h2[contains(text(), "help you")]');



    }

    async goto() {
        await this.page.goto(pageLink);
        await this.page.waitForTimeout(2000);
        //await expect(this.cookiebuttonLocator).toBeVisible();
        if(await this.cookiebuttonLocator.isVisible()) {
            await this.cookiebuttonLocator.click();
        }
        await expect(this.mainPageLocator).toBeVisible();
        await expect(this.mainPageLocator).toContainText(homePageTitle);
    }

    async reset() {
        await this.goto();
    }

    async clickContact() {
        //check if they are visible on the page
        await expect(this.contactButton1Locator).toBeVisible();
        await expect(this.contactButton2Locator).toBeVisible();

        //test button1 
        await this.contactButton1Locator.click()
        await expect(this.contactPageLocator).toBeVisible();
        await expect(this.contactPageLocator).toContainText(contactPageTitle);

        //go back to main page
        await this.goto()

        //test button2
        await this.contactButton2Locator.click()
        await expect(this.contactPageLocator).toBeVisible();
        await expect(this.contactPageLocator).toContainText(contactPageTitle);

    }

    async openJobs() {
        /*
        if(await this.menuButtonLocator.isVisible()){
            await this.menuButtonLocator.click();
        }
        await expect(this.jobsButtonLocator).toBeVisible();
        await this.jobsButtonLocator.click();
        let newPage = await this.jobsButtonLocator.getAttribute("href");
        await this.page.goto('https://www.blip.pt' + newPage); //work around some problem with the button click
        await expect(this.searchFormLocator).toBeVisible();
        */
    }

}