import { Locator, Page, expect } from "@playwright/test";

export class CartPage{

    private page: Page;
    private cartProducts: Locator;
    private checkout: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.cartProducts = page.locator('div li').first();
        this.checkout = page.locator('text=Checkout');
    }

    async clickCheckout(){
        await this.checkout.click();
    }

    getProductLocator(productName: string){
        return this.page.locator("h3:has-text('"+productName+"')")
    }

    async verifyProductOnCartPage(productName: string){
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }


}