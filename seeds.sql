CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales INTEGER NULL DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Levi's Women's New Boyfriend Jean", "Clothing & Shoes", 39.99, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("adidas Womens' running shoe", "Clothing & Shoes", 37.41, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Planters Nuts Variety Pack 24Count", "Food & Grocery", 7.59, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("HERSHEY'S KISSES Milk Chocolate Candy Party Bag, 2 Pounds", "Food & Grocery", 9.88, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("IZZE Sparkling Juice, 4 Flavor Variety Pack, 8.4 Fl Oz (24 Count)", "Food & Grocery", 13.98, 22);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Blue Buffalo Life Protection Formula Natural Adult Dry Dog Food", "Pet Supplies", 48.98, 5);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("ChomChom Roller Dog Hair, Cat Hair, Pet Hair Remover", "Pet Supplies", 24.95, 16);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Neutrogena Ultra Sheer Dry-Touch Water Resistant", "Beauty & Health", 8.52, 52);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("The Body Shop Tea Tree Oil, 0.33 Fl Oz (Vegan)", "Beauty & Health", 10.00, 24);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Dove Beauty Bar Sensitive Skin 4 Ounce, 16 bars (2 x 8 bars)", "Beauty & Health", 15.39, 32);

CREATE TABLE departments(
	department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs) VALUES("Clothing & Shoes", 3000);
INSERT INTO departments(department_name, over_head_costs) VALUES("Food & Grocery", 1500);
INSERT INTO departments(department_name, over_head_costs) VALUES("Pet Supplies", 800);
INSERT INTO departments(department_name, over_head_costs) VALUES("Beauty & Health", 1280);
