create database bamazon_DB;

use bamazon_DB;

create table inventory (
item_id int not null auto_increment,
primary key (item_id),
product_name varchar(255) not null,
department_name varchar(50) not null,
price int not null,
stock_quantity int not null
);

insert into inventory (product_name, department_name, price, stock_quantity)
values ("Flex Seal", "Home Improvement", 12.99, 543), ("Flex Tape", "Home Improvement", 10.99, 289), 
("Flex Glue", "Home Improvement", 8.99, 320), ("Flex Tape Clear", "Home Improvement", 12.99, 439),
("Flex Seal Liquid", "Home Improvement", 14.99, 163), ("Flex Shot", "Home Improvement", 15.99, 463),
("Bush's Baked Beans", "Grocery", 138.99, 59), ("Sham Wow", "Home Improvement", 3.99, 178), 
("Oxy Clean", "Home Improvement", 7.99, 377), ("Flex Seal Hat", "Clothing", 24.99, 65);


select * from inventory

