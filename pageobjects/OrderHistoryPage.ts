import { Locator, Page } from "@playwright/test";

export class OrderHistoryPage{

    private page: Page;
    private ordersTable: Locator;
    private orderIDS: Locator;
    private productOrderId: Locator;

    constructor(page: Page){
        this.page = page;
        this.ordersTable = page.locator('h1');
        this.orderIDS = page.locator('tbody tr');
        this.productOrderId = page.locator(".col-text");
    }

    async searchOrderAndSelect(orderID){
        await this.ordersTable.waitFor();
        const orderIDS = await this.orderIDS.locator('th').allTextContents();
        for(let i=0; i<orderIDS.length; i++){
            if(orderIDS[i] === orderID){
                await this.orderIDS.nth(i).locator('button').first().click();
                break;
            }
        }

    };

    async retrieveOrderId(){
        return await this.productOrderId.textContent();
    }

}