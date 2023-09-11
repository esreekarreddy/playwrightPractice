import { test, expect, request } from "@playwright/test";
import APIUtils from "../utils/APIUtils"; 

const loginPayload = {userEmail: "2000sreekar@gmail.com", userPassword: "7Sreekar@"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa"}]}
let response: { tokenRetrieved: string; orderId: string; };

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
  
    //order id retrived from API and validation is done
    await page.locator('[routerlink*="myorders"]').first().click(),
    await page.locator('h1').waitFor()
    const orderIDS = await page.locator('tbody tr th').allTextContents();
    const orderIDSCount = orderIDS.length;
    for(let i=0; i<orderIDSCount; i++){
        if(orderIDS[i] === response.orderId){
            await page.locator('tbody tr td button').nth(i).first().click()
            break
        }
    }
    await expect(page.locator('.-main')).toHaveText(response.orderId);
});



