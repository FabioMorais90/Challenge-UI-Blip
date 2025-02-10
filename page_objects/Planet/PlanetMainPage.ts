import { expect, type Locator, type Page } from '@playwright/test';

const pageLink: string = 'https://www.weareplanet.com/'
const homePageTitle : string = "Connecting payments and software";
const contactPageTitle : string = "How can we help you today?";

export class PlanetMainPage {
    private  page : Page;
    readonly cookiebuttonLocator: Locator;
    readonly mainPageLocator : Locator;
    readonly headerMenuLocator: Locator;
    readonly headerProductsButtonLocator : Locator;
    readonly headerSolutionsButtonLocator : Locator;
    readonly headerResourcesButtonLocator : Locator;
    readonly headerCompanyButtonLocator: Locator;
    readonly headerProductsCollapseMenuLocator : Locator;
    readonly headerSolutionsCollapseMenuLocator : Locator;
    readonly headerResourcesCollapseMenuLocator : Locator;
    readonly headerCompanyCollapseMenuLocator : Locator;    
    readonly megaMenuLocator: Locator;
    readonly megaMenuProductsButtonLocator : Locator;
    readonly megaMenuSolutionsButtonLocator : Locator;
    readonly megaMenuResourcesButtonLocator : Locator;
    readonly megaMenuCompanyButtonLocator: Locator;    
    readonly menuButtonLocator: Locator;
    readonly contactButton1Locator : Locator;
    readonly contactButton2Locator : Locator;
    readonly contactPageLocator : Locator;


    constructor(page: Page) {
        this.page = page;
        this.cookiebuttonLocator = this.page.locator('//button[@id="onetrust-accept-btn-handler"]')
        this.mainPageLocator = this.page.locator('//h1[contains(text(), "Connecting")]');

        //header locators
        this.headerMenuLocator = this.page.locator('//div[@class="header-menus"]');
        this.headerProductsButtonLocator = this.page.locator('//div[@class="header-menus"]//img[@id="products_img"]');
        this.headerSolutionsButtonLocator = this.page.locator('//div[@class="header-menus"]//img[@id="solutions_img"]');
        this.headerResourcesButtonLocator = this.page.locator('//div[@class="header-menus"]//img[@id="resources_img"]');
        this.headerCompanyButtonLocator = this.page.locator('//div[@class="header-menus"]//img[@id="company_img"]');
        this.headerProductsCollapseMenuLocator = this.page.locator('//div[@class="megamenu-products__desktop"]');
        this.headerSolutionsCollapseMenuLocator = this.page.locator('//div[@class="megamenu-solutionss__desktop"]');
        this.headerResourcesCollapseMenuLocator = this.page.locator('//div[@class="megamenu-resources__desktop"]');
        this.headerCompanyCollapseMenuLocator = this.page.locator('//div[@class="megamenu-company__desktop"]');    
        
        //megamenu locators
        this.menuButtonLocator = this.page.locator('//img[@alt="Hamburger Menu"]');
        this.megaMenuLocator = this.page.locator('//div[@class="megamenu-mobile-and-tablets"]')

        //page locators
        this.contactButton1Locator = this.page.locator('//div[@id="block-cohesion-theme-content"]//a[contains(text(), "Contact") and @href="/contact"]');
        this.contactButton2Locator = this.page.locator('//div[@id="block-cohesion-theme-content"]//a[contains(text(), "touch") and @href="/contact"]');
        //other pages locators
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
        await this.page.goto(pageLink);
    }

    async checkMenu() {

        if (await this.headerMenuLocator.isVisible()){
            await expect(this.headerProductsButtonLocator).toBeVisible();
            await expect(this.headerSolutionsButtonLocator).toBeVisible();
            await expect(this.headerResourcesButtonLocator).toBeVisible();
            await expect(this.headerCompanyButtonLocator).toBeVisible();

            await this.headerProductsButtonLocator.click();
            await expect(this.headerProductsCollapseMenuLocator).toBeVisible();
            await this.headerSolutionsButtonLocator.click();
            await expect(this.headerSolutionsCollapseMenuLocator).toBeVisible();
            await this.headerResourcesButtonLocator.click();
            await expect(this.headerResourcesCollapseMenuLocator).toBeVisible();
            await this.headerCompanyButtonLocator.click();
            await expect(this.headerCompanyCollapseMenuLocator).toBeVisible();
        }
        else {
            //TODO: put here the megamenu tests
        }

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
        await this.reset()

        //test button2
        await this.contactButton2Locator.scrollIntoViewIfNeeded();
        await this.contactButton2Locator.click();
        await expect(this.contactPageLocator).toBeVisible();
        await expect(this.contactPageLocator).toContainText(contactPageTitle);

    }


    async CheckToogles() {

    }

}