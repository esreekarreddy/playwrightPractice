import { Locator, Page, expect } from "@playwright/test";

export class CheckoutDetails{

    private page: Page;
    private countryPlaceholder: Locator;
    private dropdownCountryList: Locator;
    private emailID: Locator;
    private submit: Locator;
    private confirmationText: Locator;
    private orderID: Locator;
    private goToOrders: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.countryPlaceholder = page.locator('[placeholder*="Country"]');
        this.dropdownCountryList = page.locator('.ta-results');
        this.emailID = page.locator('.user__name label');
        this.submit = page.locator('text=Place Order ');
        this.confirmationText = page.locator('.hero-primary');
        this.orderID = page.locator('td .ng-star-inserted label');
        this.goToOrders = page.locator('[routerlink*="myorders"]').first();

    }

    async selectCountry(countryCode, countryName){
        await this.countryPlaceholder.type(countryCode, {delay: 20});
        await this.dropdownCountryList.first().waitFor();
        const dropdownOptionsCount = await this.dropdownCountryList.locator('button').count();
        for(let i=0; i<dropdownOptionsCount; i++){
            var text = await this.dropdownCountryList.locator('button').nth(i).textContent() as string;
            if(text.trim() === countryName){
                await this.dropdownCountryList.locator('button').nth(i).click();
                break;
            }
        }
    }

    async verifyEmailID(username){
        await expect(this.emailID).toHaveText(username);
    }

    async submitAndRetrieveOrderID(){
        await this.submit.click();
        await expect(this.confirmationText).toContainText('Thankyou');
        var orderId = await this.orderID.textContent() as string;
        return orderId.split("|")[1].trim();
    }

    async navigateToOrders(){
        return this.goToOrders.click();
    }

}