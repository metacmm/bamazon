# bamazon

## Introduction

bamazon is an Amazon-like storefront node CLI App which uses MySQL to store data. It could take in orders from customers and deplete stock 
from the store's inventory, and track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

## Instruction

bamazon App provides authorized operations based on user's role.

* Customer - `node bamazonCustomer`
    ![Image of customer operations](./screenshots/customer_1.png)

    * `View all items from store's inventory`

    ![Image of customer view all](./screenshots/customer_2.png)

    * `Place order`

    ![Image of place order](./screenshots/customer_3.png)

    * `Quit`


* Manager - `node bamazonManager`
    ![Image of manager operations](./screenshots/manager_1.png)

    * `View Products for Sale`
    ![Image of manager view all](./screenshots/manager_2.png)
    
    * `View Low Inventory` 
    ![Image of manager view low inventory](./screenshots/manager_3.png)
    
    * `Add to Inventory`
    ![Image of manager adding to inventory](./screenshots/manager_4.png)
    
    * `Add New Product` 
    ![Image of manager adding new product](./screenshots/manager_5.png)

    * `Quit`  


* Supervisor - `node bamazonSupervisor`
    ![Image of supervisor operations](./screenshots/supervisor_1.png)

    * `View Product Sales by Department`
    ![Image of supervisor view sales](./screenshots/supervisor_2.png)
   
    * `Create New Department`
    ![Image of supervisor new department](./screenshots/supervisor_3.png)

    * `Quit`
