import { Locator, Page } from "@playwright/test";

export class LoginPage{

    private page: Page;
    private username: Locator;
    private password: Locator;
    private signIn: Locator;

    constructor(page: Page){
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signIn = page.locator('#login');
    }

    async landOnLoginPage(){
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async validateLoginCredentials(username: string, password: string){
        await this.username.type(username);
        await this.password.type(password);
        await this.signIn.click();
        await this.page.waitForLoadState('networkidle');
    }

}