DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id VARCHAR(10) NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NULL,
    PRIMARY KEY(item_id)
);
