var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "password",
    database: "bamazon_DB"
});

start();

function start(){
    connection.query("SELECT * FROM inventory", function(err,results) {
        if (err) throw err;
        console.log("\n-----------------------\n")
        console.log(results)
        console.log("\n-----------------------\n")
        purchase();
    })
};

function purchase(){
    inquirer.prompt([
        {
        name: "item",
        type: "input",
        message: "What is the ID of the item you would like to purchase?"
        },
        {
        name: "amount",
        type: "input",
        message: "How many would you like to buy?"
        }
    ]).then(function(input) {
        var item = input.item;
        var quantity = input.amount;
        connection.query("SELECT * FROM inventory WHERE ?", {item_id: item}, function(err, data) {
            if (err) throw err;

            var productData = data[0];

            if (quantity <= productData.stock_quantity) {
                console.log("Your order is being processed")
                var updateItem = 'UPDATE inventory SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                connection.query(updateItem, function(err, data) {
                  if (err) throw err;
                  console.log("\n-----------------------\n")
                    console.log('Your order was processed. Your total is $' + productData.price * quantity);
                    console.log("\n-----------------------\n")
                });
            } else if (quantity > productData.stock_quantity) {
                console.log("\n-----------------------\n")
                console.log("Cannot fulfill order quantity requested")
                console.log("\n-----------------------\n")
            }
        });
    });
    connection.end();
};
