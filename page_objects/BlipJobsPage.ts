import { expect, type Locator, type Page } from '@playwright/test';
import test from 'node:test';

interface SearchDataEntry {
    position : string,
    firstFilter : string,
    secondFilter : string,
    noResult: string,
    qaResult: string,
    ptResult: string
}

const testData : SearchDataEntry = {
    position : "QA",
    firstFilter : "United Kingdom",
    secondFilter: "Portugal",
    noResult : "Sorry, no jobs were found matching your criteria.",
    qaResult: "Showing 1 to 6 of 20 matching jobs",
    ptResult: "Showing 1 to 6 of 19 matching jobs"
}

export class BlipJobsPage {
    private page : Page;
    private saveRole : string;
    private availableQATotal : number;
    readonly searchFormLocator: Locator;
    readonly keywordInputLocator: Locator;
    readonly countrySelectorLocator: Locator;
    readonly applyFiltersLocator: Locator;
    readonly menuButtonLocator: Locator;
    readonly savedJobsButtonLocator: Locator;
    readonly savedJobsTitleLocator: Locator;

    constructor(page: Page, newRole) {
        this.page = page;
        this.saveRole = newRole;
        this.searchFormLocator = this.page.locator('//div[@class="search-form"]');
        this.keywordInputLocator = this.page.locator('//input[@placeholder="Keyword"]');
        this.countrySelectorLocator = this.page.locator('//textarea[@class="select2-search__field"]');
        this.applyFiltersLocator = this.page.locator('//button[contains(@type,"submit")]');
        
        this.menuButtonLocator = this.page.locator('//button[contains(@aria-label,\'navigation\')]');
        ////a[@href="/jobs/"][1] | a[contains(text(), 'Jobs')]
        this.savedJobsButtonLocator = this.page.locator('//a[@aria-label="Saved Jobs"]');
        this.savedJobsTitleLocator = this.page.locator('//h1[contains(text(),"Saved Jobs")]');
    }

    async searchQA(){
        //Open Filters
        await  this.searchFormLocator.click();
        await expect(this.keywordInputLocator).toBeVisible();

        //fill in data
        await this.keywordInputLocator.fill(testData.position);

        //Apply Filters
        await this.applyFiltersLocator.click();

        //test result
        let searchResults = await this.page.locator('//p[@class="job-count"]');
        await expect(searchResults).toBeVisible();
        await expect(searchResults).toContainText(testData.qaResult);

        //Save number of available jobs
        // let numberQA = await searchResults.locator("/strong[3]").allTextContents();
        // if (numberQA)
        //     this.availableQATotal = parseInt(numberQA[0]);
        // console.log(this.availableQATotal);

        //Regular Expression
        //const r = '/"title": "[a-zA-Z]{0-10}"';
        //const regexp = new RegExp(r);
    }

    async filterUK() {
        //Open Filters
        await  this.searchFormLocator.click();
        await expect(this.keywordInputLocator).toBeVisible();

        //Select Filter
        await this.countrySelectorLocator.click();
        let countryNameSelector = await this.page.locator('//li[contains(text(),"' + testData.firstFilter + '")]');
        await countryNameSelector.click();

        //Apply Filters
        await this.applyFiltersLocator.click();
        
        //test result
        let searchResults = await this.page.locator('//section[@id="results"]//h3');
        await expect(searchResults).toBeVisible();
        await expect(searchResults).toContainText(testData.noResult);
    }

    async filterPT(){
        //Open Filters
        await  this.searchFormLocator.click();
        await expect(this.keywordInputLocator).toBeVisible();
        
        //Remove UK
        let countryRemoveButton = await this.page.locator('//button[@aria-label="Remove item"]');
        await countryRemoveButton.click();

        //Fill Portugal
        let countryNameSelector = await this.page.locator('//li[contains(text(),"' + testData.secondFilter + '")]');
        await countryNameSelector.click();

        //Apply Filters
        await this.applyFiltersLocator.click();

        //test result
        let searchResults = await this.page.locator('//p[@class="job-count"]');
        await expect(searchResults).toBeVisible();
        await expect(searchResults).not.toContainText(testData.qaResult);
        await expect(searchResults).toContainText(testData.ptResult);
        //get number and comparae with all available
        // let numberPT = await searchResults.locator("/strong[3]").textContent();
        // await expect(numberPT).toBeLessThanOrEqual(this.availableQATotal);
    }

    async findQAEngineer(){
        //problem with recently viewed jobs as this becomes second result
        let jobCardLocator = await this.page.locator('//a[contains(text(),"' + this.saveRole + '")]/ancestor::div[@class="card-body"]');
        let saveJobButton = await jobCardLocator.locator('//button[@title="Save"]');
        let removeJobButton = await jobCardLocator.locator('//button[@title="Remove"]');
        await saveJobButton.click();
        await expect(saveJobButton).not.toBeVisible();
        await expect(removeJobButton).toBeVisible();
    }

    async gotoSavedJobs() {
        if(await this.menuButtonLocator.isVisible()){
            await this.menuButtonLocator.click();
        }
        await expect(this.savedJobsButtonLocator).toBeVisible();
        await this.savedJobsButtonLocator.click();
        await expect(this.savedJobsTitleLocator).toBeVisible();
    }
}