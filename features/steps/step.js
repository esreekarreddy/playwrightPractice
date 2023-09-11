import { Given, When, Then } from '@cucumber/cucumber'
import { PageObjectManager } from '../../pageobjects/PageObjectManager';
import { test, expect, chromium } from '@playwright/test'


Given('{string} and {string} to login an Ecommerce application', { timeout: 10 * 1000 }, async function (username, password) {

  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  this.username = username

  this.pageObjectManager = new PageObjectManager(page);
  const loginPage = this.pageObjectManager.getLoginPage();
  await loginPage.landOnLoginPage();
  await loginPage.validateLoginCredentials(this.username, password);

});

When('{string} is added to the cart', async function (productRequired) {

  const dashboardPage = this.pageObjectManager.getDashboardPage();
  await dashboardPage.addProductToCart(productRequired.toLowerCase());
});

Then('verify {string} is displayed on cart page or not', async function (productRequired) {

  const cartPage = this.pageObjectManager.getCartPage();
  await cartPage.verifyProductOnCartPage(productRequired);
  await cartPage.clickCheckout();
});

When('valid details are entered and order is placed', async function () {
  const checkoutDetailsPage = this.pageObjectManager.getCheckoutDetailsPage();
  await checkoutDetailsPage.selectCountry('ind', "India");
  await checkoutDetailsPage.verifyEmailID(this.username);
  this.orderID = await checkoutDetailsPage.submitAndRetrieveOrderID()
  await checkoutDetailsPage.navigateToOrders();
});

Then('verify order is present in OrderHistory page', async function () {

  const orderHistoryPage = this.pageObjectManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(this.orderID);
  expect(await orderHistoryPage.retrieveOrderId() === this.orderID).toBeTruthy();
});