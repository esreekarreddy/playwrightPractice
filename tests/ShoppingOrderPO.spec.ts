import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../pageobjects/PageObjectManager";
import testData from "../utils/testData.json"

//implementing using PageObject files
for(let data of testData){
    test(`Making order for ${data.productRequired}`, async ({page})=> {

        const pageObjectManager = new PageObjectManager(page);
    
        //logging in with valid credentials
        const loginPage = pageObjectManager.getLoginPage();
        await loginPage.landOnLoginPage();
        await loginPage.validateLoginCredentials(data.username, data.password);
    
        //adding a product on dashboard and navigating to cart
        const dashboardPage = pageObjectManager.getDashboardPage();
        await dashboardPage.addProductToCart(data.productRequired.toLowerCase());
    
    
        //verify order in the cart and checkout
        const cartPage = pageObjectManager.getCartPage();
        await cartPage.verifyProductOnCartPage(data.productRequired);
        await cartPage.clickCheckout();

        
        //select country, verify mail, place order & get order ID
        const checkoutDetailsPage = pageObjectManager.getCheckoutDetailsPage();
        await checkoutDetailsPage.selectCountry('ind',"India");
        await checkoutDetailsPage.verifyEmailID(data.username);
        const orderID = await checkoutDetailsPage.submitAndRetrieveOrderID()
        await checkoutDetailsPage.navigateToOrders();

        //validate order on orders page
        const orderHistoryPage = pageObjectManager.getOrderHistoryPage();
        await orderHistoryPage.searchOrderAndSelect(orderID);
        expect(await orderHistoryPage.retrieveOrderId() === orderID).toBeTruthy();
    });
}