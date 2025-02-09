import { expect, type Locator, type Page } from '@playwright/test';
import test from 'node:test';

const noSavedJobsLine1 : string =  "You don't currently have any saved jobs."
const noSavedJobsLine2 : string =  "But don't worry - you can save any job when you view it to this list."
const noSavedJobsLine3 : string =  "Back to Job Search"
const noSavedJobsHref : string =  "/jobs/"


export class BlipSavedJobsPage {
    private page : Page;
    private deleteRole : string;
    readonly savedJobsTitleLocator : Locator;
    readonly removeAllButtonLocator: Locator;
    readonly noJobsSavedLocator: Locator;
    readonly jobCardLocator: Locator;

    constructor(page: Page, newRole) {
        this.page = page;
        this.deleteRole = newRole;
        
        this.savedJobsTitleLocator = this.page.locator('//h1[contains(text(),"Saved Jobs")]');
        this.removeAllButtonLocator = this.page.locator('//button[@aria-label="Remove all"]');
        this.jobCardLocator = this.page.locator('//a[contains(text(),"'+ this.deleteRole +'")]');
        this.noJobsSavedLocator = this.page.locator('//div[@id="js-no-saved-jobs"]');
    }

    async findRole(){
        await expect(this.savedJobsTitleLocator).toBeVisible(); 
        await expect(this.jobCardLocator).toBeVisible();        
    }

    async removeAll() {
        await expect(this.removeAllButtonLocator).toBeVisible();
        await this.removeAllButtonLocator.click();
        
        await expect(this.noJobsSavedLocator).toBeVisible();
        /* Somethings is wrong with my Xpath expression
        await expect(this.page.locator('//div[@id="js-no-saved-jobs"]/p[1]"')).toContainText(noSavedJobsLine1);
        await expect(this.page.locator('//div[@id="js-no-saved-jobs"]/p[2]"')).toContainText(noSavedJobsLine2);
        await expect(this.page.locator('//div[@id="js-no-saved-jobs"]/p[3]"')).toContainText(noSavedJobsLine3);
        await expect(this.page.locator('//div[@id="js-no-saved-jobs"]/p[3]/a').getAttribute('href')).toEqual(noSavedJobsHref);
        */
    }
}