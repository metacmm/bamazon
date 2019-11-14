DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id VARCHAR(10) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products VALUES("0000000001", "Levi's Women's New Boyfriend Jean", "Clothing & Shoes", 39.99, 20);
INSERT INTO products VALUES("0000000002", "adidas Womens' running shoe", "Clothing & Shoes", 37.41, 10);
INSERT INTO products VALUES("0000000003", "Planters Nuts Variety Pack 24Count", "Food & Grocery", 7.59, 50);
INSERT INTO products VALUES("0000000004", "HERSHEY'S KISSES Milk Chocolate Candy Party Bag, 2 Pounds", "Food & Grocery", 9.88, 30);
INSERT INTO products VALUES("0000000005", "IZZE Sparkling Juice, 4 Flavor Variety Pack, 8.4 Fl Oz (24 Count)", "Food & Grocery", 13.98, 22);
INSERT INTO products VALUES("0000000006", "Blue Buffalo Life Protection Formula Natural Adult Dry Dog Food", "Pet Supplies", 48.98, 5);
INSERT INTO products VALUES("0000000007", "ChomChom Roller Dog Hair, Cat Hair, Pet Hair Remover", "Pet Supplies", 24.95, 16);
INSERT INTO products VALUES("0000000008", "Neutrogena Ultra Sheer Dry-Touch Water Resistant", "Beauty & Health", 8.52, 52);
INSERT INTO products VALUES("0000000009", "The Body Shop Tea Tree Oil, 0.33 Fl Oz (Vegan)", "Beauty & Health", 10.00, 24);
INSERT INTO products VALUES("000000000A", "Dove Beauty Bar Sensitive Skin 4 Ounce, 16 bars (2 x 8 bars)", "Beauty & Health", 15.39, 32);