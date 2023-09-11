import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutDetails } from "./CheckoutDetails";
import { OrderHistoryPage } from "./OrderHistoryPage";

export class PageObjectManager{

    private page: Page;
    private loginPage: LoginPage;
    private dashboardPage: DashboardPage;
    private cartPage: CartPage;
    private checkoutDetails: CheckoutDetails;
    private orderHistoryPage: OrderHistoryPage;

    constructor(page: Page){
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutDetails = new CheckoutDetails(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    public getLoginPage(): LoginPage{
        return this.loginPage;
    }

    public getDashboardPage(): DashboardPage{
        return this.dashboardPage;
    }

    public getCartPage(): CartPage{
        return this.cartPage;
    }

    public getCheckoutDetailsPage(): CheckoutDetails{
        return this.checkoutDetails;
    }

    public getOrderHistoryPage(): OrderHistoryPage{
        return this.orderHistoryPage;
    }
}
