# Ecommerce-Management-DBMS_Project

As a part of our University PTU Curriculum, we made this project for Database Management Systems (DBMS)<br>
This project contains theoretical as well as implementation in SQL.<br>
If you liked the repo do :star: it.  

## Pre-requisite
MariaDB  

## Contents
- Project Description
- Basic structure
  - Functional requirements
  - Entity Relation (ER) diagram and constraints
  - Relational database schema
- Implementation
  - Creating tables
  - Inserting data
  
- Queries
  - Basic queries
  - PL/SQL function
  - Trigger function
  - Stored procedures 
  - Functions 
  - Transactions


## 1. Project Description
In this new modern era of online shopping no seller wants to be left behind and every seller  want to the shift from offline selling model to an online selling model for a rampant growth.<br>
Therefore, as an software engineer our job is to ease the path of this transition for the seller.
Amongst many things that an online site requires the most important is a database system. Hence in this project we are planning to design a database where small sellers can sell their product online.

**The Prime Objective of our database project is to design a robust E-commerce database by performing operations such as**
 - Viewing orders 
 - Placing orders 
  - Updating database 
  - Reviewing products
  - Maintaining data consistency across tables 


### 2. REQUIREMENTS 
 - A Customer can see the account details and can update if required. 
 - Customer can search the products according to the category. 
 - Customer can add his wishlist to the cart and can see the total amount. 
 - Customer can update the cart whenever required.
-  Customer can choose the mode of payment.
-  Customer can keep track of the order by seeing order status.
-  Customer can review the products which have been purchased. 
-  Seller can update the stock of a particular product whether it is available    or not. 
-  Seller can keep track of total sales of his products. 
-  Seller can know the sales on a particular day or month or year.  

### 2.1 Functional Requirements
- A Customer cannot access the Seller details and vice-versa. 
- There should not be any inconsistency in the data. 
- There should not be any loss of data. 

### 3.  Relational Database Schema - e commerce 
![Relational Schema_Diagram](https://github.com/Saurabh-pec/Ecommerce-Management-DBMS_Project-/blob/main/Relational_Schema-Screenshot.jpg)
For more clear view, click here
[Relational Schema Pdf](https://github.com/Saurabh-pec/Ecommerce-Management-DBMS_Project-/blob/main/Relational%20Database%20Schema2.pdf)

### 4. Entities and their Attributes

| ENTITIES |  ATTRIBUTES                                                                       |    ATTRIBUTE TYPE                                                 |Entity Type|
| ---------|:-------------:                                                                    |   -----:                                                          |-------    |
| Customer |Customer_CustomerId<br>Name<br>Email<br>DateOfBirth<br>Phone<br>Age                |Simple<br>Composite<br>Simple<br>Simple<br>Multivalued<br>Derived  | Strong    |
| Order    |OrderId<br>ShippingDate<br>OrderDate<br>OrderAmount<br>Cart_CartID                 |Simple<br>Simple<br>Simple<br>Simple<br>Simple                     | Strong    |
| OrderItem|Order_OrderId (PK)<br>Product_ProductId(FK)<br>MRP<br>Quantity                     |Simple<br>Simple<br>Simple<br>Simple                               |  Weak     | 
| Product  |productId (PK)<br>ProductName<br>sellerId<br>MRP<br>CategoryID<br>Stock<br>Brand   |Simple<br>Simple<br>Simple<br>Simple<br>Simple<br>Simple<br>Simple |Strong     | 
| Review   |ReviewId(PK)<br>Description<br>Ratings<br>Product_ProductId<br>Customer_CustomerID |Simple<br>Simple<br>Simple<br>Simple                               |Strong     |
| Cart     |cartId (PK)<br>Customer_customerId(FK)<br>GrandTotal<br>ItemsTotal                 | Simple<br>Simple<br>Derived<br>Derived                            |Strong     | 
| Category |CategoryID(PK)<br>CategoryName<br>DESCRIPTION                                      | Simple<br>Simple<br>Simple                                        |Strong     |
| seller   |sellerId (PK)<br>Name<br>Phone<br>Total_Sales                                      | Simple<br>Simple<br>Multivalued<br>Derived                        |Strong     |
| Payment  |payment_id<br>Order_OrderId<br>PaymentMode<br>Customer_CustomerId<br>PaymentDate   | Simple<br>Simple<br>Simple<br>Simple<br>Simple                    |Strong     |

### 5. ER-Diagram
![ER-Diagram img](https://github.com/Saurabh-pec/Ecommerce-Management-DBMS_Project-/blob/main/ER-diagram.jpg)
for more clear view, click here
[ER Diagram pdf](https://github.com/Saurabh-pec/Ecommerce-Management-DBMS_Project-/blob/main/ECommerce.pdf)

### 6. QUERIES ON THE ABOVE RELATIONAL SCHEMA
 **1.** Stored procedure for the details of the customer.<br>
 **2.** View for getting sales by category of products.<br>
 **3.** Using triggers to update the no.of products as soon as the payment is made.<br>
 **4.** Trigger to update the total amount of user everytime he adds something to payment table.<br>
 **5.** Stored procedure for getting order history.<br>
 **6.** Processing an order<br>
   -  To process an order, one should check whether those items are in stock.
   -  If items are in stock, they need to be reserved so that they go in hands of those who have expressed them in wishlist/order.
   - Once ordered the available quantity must be reduced to reflect the correct value in the stock. 
   - Any items not in stock cannot be sanctioned; this requires confirmation from the seller. 
 - The customer needs to be informed as to which items are in stock (and can be shipped immediately) and which are cancelled.







