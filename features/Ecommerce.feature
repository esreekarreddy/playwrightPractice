Feature: Ecommerce order app

  Scenario: Login and place an order 
    Given "2000sreekar@gmail.com" and "7Sreekar@" to login an Ecommerce application
    When "ADIDAS ORIGINAL" is added to the cart
    Then verify "ADIDAS ORIGINAL" is displayed on cart page or not
    When valid details are entered and order is placed
    Then verify order is present in OrderHistory page