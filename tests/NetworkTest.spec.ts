import { test, expect, request, APIResponse } from "@playwright/test";
import APIUtils from "../utils/APIUtils";

const loginPayload = {userEmail: "2000sreekar@gmail.com", userPassword: "7Sreekar@"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa"}]}
let response: { tokenRetrieved: string; orderId: string; };
const fakeOrderPayload = {data:[], message:"No Orders"};

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(orderPayload); 
});


test('Validate an Order', async ({page})=> {
    
    //injecting login token
    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value)
    }, response.tokenRetrieved)

    await page.goto('https://rahulshettyacademy.com/client/')
    await page.pause();
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64a788607244490f9577dc79',
    async route => {
        const response = await page.request.fetch(route.request());
        let body = fakeOrderPayload;
        await route.fulfill({
            response,
            //body,
        })
    });
    
    
    await page.locator('[routerlink*="myorders"]').first().click();

    // page.locator('div button').waitFor();
    // console.log(await page.locator('.mt-4').textContent());
    // await expect(page.locator('.mt-4')).toContainText('You have No Orders to show at this time.');
});



