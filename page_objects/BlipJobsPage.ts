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
    private countryNameSelector: Locator;
    readonly searchFormLocator: Locator;
    readonly keywordInputLocator: Locator;
    readonly countrySelectorLocator: Locator;
    readonly applyFiltersLocator: Locator;
    readonly menuButtonLocator: Locator;
    readonly savedJobsButtonLocator: Locator;
    readonly savedJobsTitleLocator: Locator;
    readonly searchResults : Locator; 
    readonly noSearchResults : Locator;
    readonly countryRemoveButton : Locator;
    readonly jobCardLocator : Locator;

    constructor(page: Page, newRole) {
        this.page = page;
        this.saveRole = newRole;
        this.searchFormLocator = this.page.locator('//div[@class="search-form"]');
        this.keywordInputLocator = this.page.locator('//input[@placeholder="Keyword"]');
        this.countrySelectorLocator = this.page.locator('//textarea[@class="select2-search__field"]');
        this.applyFiltersLocator = this.page.locator('//button[contains(@type,"submit")]');
        this.searchResults =  this.page.locator('//p[@class="job-count"]');
        this.noSearchResults = this.page.locator('//section[@id="results"]//h3');
        this.menuButtonLocator = this.page.locator('//button[contains(@aria-label,\'navigation\')]');
        ////a[@href="/jobs/"][1] | a[contains(text(), 'Jobs')]
        this.savedJobsButtonLocator = this.page.locator('//a[@aria-label="Saved Jobs"]');
        this.savedJobsTitleLocator = this.page.locator('//h1[contains(text(),"Saved Jobs")]');
        this.countryRemoveButton = this.page.locator('//button[@aria-label="Remove item"]');
        //problem with recently viewed jobs as this becomes second result
        this.jobCardLocator = this.page.locator('//a[contains(text(),"' + this.saveRole + '")]/ancestor::div[@class="card-body"]');

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
        await expect(this.searchResults).toBeVisible();
        await expect(this.searchResults).toContainText(testData.qaResult);

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
        this.countryNameSelector = await this.page.locator('//li[contains(text(),"' + testData.firstFilter + '")]');
        await this.countryNameSelector.click();

        //Apply Filters
        await this.applyFiltersLocator.click();
        
        //test result
        await expect(this.noSearchResults).toBeVisible();
        await expect(this.noSearchResults).toContainText(testData.noResult);
    }

    async filterPT(){
        //Open Filters
        await  this.searchFormLocator.click();
        await expect(this.keywordInputLocator).toBeVisible();
        
        //Remove UK
        await this.countryRemoveButton.click();

        //Fill Portugal
        this.countryNameSelector = await this.page.locator('//li[contains(text(),"' + testData.secondFilter + '")]');
        await this.countryNameSelector.click();

        //Apply Filters
        await this.applyFiltersLocator.click();

        //test result
        await expect(this.searchResults).toBeVisible();
        await expect(this.searchResults).not.toContainText(testData.qaResult);
        await expect(this.searchResults).toContainText(testData.ptResult);
        //get number and compare with all available
        // let numberPT = await searchResults.locator("/strong[3]").textContent();
        // await expect(numberPT).toBeLessThanOrEqual(this.availableQATotal);
    }

    async findQAEngineer(){
        
        let saveJobButton = await this.jobCardLocator.locator('//button[@title="Save"]');
        let removeJobButton = await this.jobCardLocator.locator('//button[@title="Remove"]');
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