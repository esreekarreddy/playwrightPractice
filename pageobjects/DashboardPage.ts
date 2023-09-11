import { Locator, Page } from "@playwright/test";

export class DashboardPage{
    
    private page: Page;
    private products: Locator;
    private goToCart: Locator;

    constructor(page: Page){
        this.page = page;
        this.products = page.locator('.card-body');
        this.goToCart = page.locator('[routerlink="/dashboard/cart"]');
    }

    async addProductToCart(productRequired: string){
        const noOfProducts = await this.products.count();
        for(let i=0; i<noOfProducts; i++){
            if(await this.products.nth(i).locator("b").textContent() === productRequired){
                await this.products.nth(i).locator('text=" Add To Cart"').click();
                break;
            }
        }
        await this.goToCart.click();
    }

    
}