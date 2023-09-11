import {expect, test} from '@playwright/test'

test.describe.configure({mode: 'parallel'});
test("Pop up validations", async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   
    /*
    //navigate pages within same tab
    await page.goto('https://www.google.com');
    await page.goBack();
    await page.goForward();
    await page.goBack(); 
    */

    await expect(page.locator('#displayed-text')).toBeVisible();
    expect(page.locator('#displayed-text').isVisible).toBeTruthy();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    //handling event listener (pop-up)
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();

    //handling frames
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('[href*="lifetime-access"]').nth(1).click();
    const text = await framePage.locator('.text h2:visible').textContent();
    console.log(text?.split(" ")[1]);

});


test('Screenshot test', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'locatorScreenshot.jpg'})
    expect(page.locator('#displayed-text').isVisible).toBeTruthy();
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshotFullPage.jpg'})
    await expect(page.locator('#displayed-text')).toBeHidden();
})


test('Visual test', async({page})=>{
    await page.goto('https://www.google.com');
    expect(await page.screenshot()).toMatchSnapshot('visualTest.png');
})