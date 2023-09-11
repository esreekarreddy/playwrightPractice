import { APIRequestContext } from "@playwright/test";

export default class APIUtils {
    private apiContext: APIRequestContext;
    private loginPayload: { userEmail: string; userPassword: string; }; 
    public response = {tokenRetrieved: "", orderId: ""};

    constructor(apiContext: APIRequestContext, loginPayload: { userEmail: string; userPassword: string; }){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginAPIResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: this.loginPayload});
        const apiResponseJson = await loginAPIResponse.json();
        this.response.tokenRetrieved = await apiResponseJson.token;
        return this.response.tokenRetrieved;
    }

    async createOrder(orderPayload){
        const orderAPIResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload,
        headers: {
            'Authorization': await this.getToken(),
            'Content-Type' : 'application/json',
        },
    })
    const orderAPIResponseJson = await orderAPIResponse.json();
    this.response.orderId = orderAPIResponseJson.orders[0];
    return this.response;
    }
}