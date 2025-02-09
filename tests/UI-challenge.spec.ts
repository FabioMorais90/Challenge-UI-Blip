import { test, expect, type Page, BrowserContext } from '@playwright/test';
import { BlipMainPage } from '../page_objects/BlipMainPage';
import { BlipJobsPage } from '../page_objects/BlipJobsPage';
import { BlipSavedJobsPage } from '../page_objects/BlipSavedJobsPage';

test.describe('Final Challenge',() => {
    let context: BrowserContext;
    let page: Page;
    let mainPage: BlipMainPage;
    let jobsPage: BlipJobsPage;
    let savedJobsPage: BlipSavedJobsPage;

    test.beforeEach(async ({browser}) => {
        //Set the browser viewport size to 1024x768 for both browsers.
        context = await browser.newContext({
            viewport: {width:1024 ,height: 768}
        });
        page = await context.newPage();
    });

    test('Challenge UI', async ({}) => {

        //Navigate to the www.blip.pt website.
        mainPage = new BlipMainPage(page);
        await mainPage.goto();
        //Click on the "Jobs" tab in the header.
        await mainPage.openJobs();

        let lookForJob = "QA Engineer";

        jobsPage = new BlipJobsPage(page, lookForJob);
        //Enter "QA" in the search bar.
        await jobsPage.searchQA();
        //Filter the results by United Kingdom.
        await jobsPage.filterUK();
        //Change the filter to Portugal.
        await jobsPage.filterPT();
        //Find and save a "QA Engineer" role from the results. (This might involve clicking a "Save" button or similar.)
        await jobsPage.findQAEngineer();
        //Navigate to the "Saved Jobs" section of the website. (This might involve clicking a user profile icon or a dedicated "Saved Jobs" link.)
        await jobsPage.gotoSavedJobs();

        savedJobsPage = new BlipSavedJobsPage(page, lookForJob);
        //Assert that the previously saved "QA Engineer" job is listed in the saved jobs.
        await savedJobsPage.findRole();
        // Click on the "Remove all" button or option in the "Saved Jobs" section.
        await savedJobsPage.removeAll();

    });

    test.afterEach(async ({}) => {
        await page.close();
        await context.close();
    });
});