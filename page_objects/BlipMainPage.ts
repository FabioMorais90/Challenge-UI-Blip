import { expect, type Locator, type Page } from '@playwright/test';

const homePageText : string = "code for_  [greatness]";

export class BlipMainPage {
    private  page : Page;
    readonly mainPageLocator : Locator;
    readonly jobsButtonLocator : Locator;
    readonly menuButtonLocator : Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainPageLocator = this.page.locator('//h1[@class="hero-heading-home"]');
        this.menuButtonLocator = this.page.locator('//button[contains(@aria-label,\'navigation\')]');
        ////a[@href="/jobs/"][1] | a[contains(text(), 'Jobs')]
        this.jobsButtonLocator = this.page.locator('//a[contains(text(), "Jobs")]');

    }

    async goto() {
        await this.page.goto('https://www.blip.pt');
        await expect(this.mainPageLocator).toContainText(homePageText);
    }

    async openJobs() {
        if(await this.menuButtonLocator.isVisible()){
            await this.menuButtonLocator.click();
        }
        await expect(this.jobsButtonLocator).toBeVisible();
        await this.jobsButtonLocator.click();
        const searchFormLocator = this.page.locator('//div[@class="search-form"]')
        await expect(searchFormLocator).toBeVisible();
    }

}