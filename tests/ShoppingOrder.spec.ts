import { test, expect } from "@playwright/test";

test('Make an Order', async ({page})=> {
    
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const mailID = '2000sreekar@gmail.com';
    const logIn = page.locator('#login');
    const productELemetsList = page.locator('.card-body');
    const productRequired: string = "ADIDAS ORIGINAL".toLowerCase();

    await page.goto('https://rahulshettyacademy.com/client/')

    await username.fill(mailID);
    await password.type('7Sreekar@');
    await logIn.click();
    //wait until all API calls are made, network oriented
    await page.waitForLoadState('networkidle');
    const contents = await page.locator('.card-body h5').allTextContents();

    const noOfProducts = await productELemetsList.count();
    for(let i=0; i<noOfProducts; i++){
        if(await productELemetsList.nth(i).locator("b").textContent() === productRequired){
            await productELemetsList.nth(i).locator('text=" Add To Cart"').click();
            break;
        }
    }

    await page.locator('[routerlink="/dashboard/cart"]').click();
    await page.locator('div li').first().waitFor();
    expect(await page.locator('h3:has-text("adidas original")').isVisible()).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.locator('[placeholder*="Country"]').type("ind", {delay: 20});
    const dropdown = page.locator('.ta-results');
    await dropdown.first().waitFor();
    const dropdownOptionsCount = await dropdown.locator('button').count();
    for(let i=0; i<dropdownOptionsCount; i++){
        var text = await dropdown.locator('button').nth(i).textContent() as string;
        if(text.trim() === "India"){
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    
    await expect(page.locator('.user__name label')).toHaveText(mailID);
    await page.locator('text=Place Order ').click();
    await expect(page.locator('.hero-primary')).toContainText('Thankyou');
    var orderId = await page.locator('td .ng-star-inserted label').textContent() as string;
    var orderId = orderId.split("|")[1].trim() 

    await page.locator('[routerlink*="myorders"]').first().click(),
    await page.locator('h1').waitFor()
    const orderIDS = await page.locator('tbody tr th').allTextContents();
    const orderIDSCount = orderIDS.length;
    for(let i=0; i<orderIDSCount; i++){
        if(orderIDS[i] === orderId){
            await page.locator('tbody tr td button').nth(i).first().click()
            break
        }
    }
    await expect(page.locator('.-main')).toHaveText(orderId);
});