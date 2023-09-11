import { test, expect } from "@playwright/test";

test('Basic Web Automation', async ({page})=> {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const username = page.locator('#username');
    const password = page.locator('#password')
    const signIn = page.locator('[name="signin"]');
    const cardTitles = page.locator('.card-title a');

    console.log(await page.title());
    await username.type('esreekarreddy', {delay: 20})
    await password.type('learning', {delay: 20});
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    expect(await page.locator("[style*='block']").textContent()).toContain("Incorrect");

    await username.fill('');
    await username.type('rahulshettyacademy', {delay: 20});

    //race condition wait for non-service oriented
    await Promise.all([
        page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop'),
        signIn.click(),
    ])
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent())
});


test('UI Automation', async ({page}) =>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const dropdown = page.locator('.form-control').last();
    const documentBlinkingLink = page.locator('[href*="documents-request"]');

    await username.type('esreekarreddy', {delay: 20})
    await password.type('learning', {delay: 20});

    //dropdown selection, checkbox validation
    dropdown.selectOption("consult");
    await page.locator('.checkmark').last().click();
    await expect(page.locator('.checkmark').last()).toBeChecked();
    await page.locator('#okayBtn').click();
        //await page.pause();
    
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await page.locator('#terms').click();

    //blinking text validation
    await expect(documentBlinkingLink).toHaveAttribute('class', 'blinkingText');
});


test('Child Window', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const documentBlinkingLink = page.locator('[href*="documents-request"]');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentBlinkingLink.click()
    ]);
    const redText = await newPage.locator('.red').textContent() as string;
    const domain = redText.split("@")[1].split(" ")[0];

    await username.type(domain, {delay: 20});
    console.log(await username.textContent());

});