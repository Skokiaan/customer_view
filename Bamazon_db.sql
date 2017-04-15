USE Bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VaLUES ("Snapple","Beverages", 1.50, 100), 
		("Pen", "Office Supplies", 2.00, 75),
        ("Coke", "Beverages", 1.50, 465),
        ("Notebook", "Office Supplies", 1.25, 65),
        ("Speakers", "Audio", 250.00, 40),
        ("Amp", "Audio", 175.00, 32),
        ("Chair", "Furniture", 299.00, 14),
        ("Bench", "Furniture", 80.00, 60),
        ("Desk", "Furniture", 129.00, 20),
        ("Frame", "Decor", 45.00, 101);
        
UPDATE products
SET stock_quantity = 0
WHERE product_name = "Chair";

SELECT * FROM products;