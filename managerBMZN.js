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

function start() {
    inquirer
      .prompt({
        name: "choices",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["view products for sale", "view low inventory", "add to inventory", "add new product"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.choices === "view products for sale") {
          viewProducts();
        }
        else if (answer.choices === "view low inventory") {
          viewLow();
        }
        else if (answer.choices === "add to inventory") {
          addTo();
        }
        else if (answer.choices === "add new product") {
          addNew();
        }
      });
};
  
function viewProducts(){
    connection.query("SELECT * FROM inventory", function(err,results) {
        if (err) throw err;
        console.log("\n-----------------------\n");
        console.log(results)
        console.log("\n-----------------------\n");
    })
    connection.end();
};

function viewLow(){
    connection.query("SELECT * FROM inventory WHERE stock_quantity < 150", function(err,results) {
        if (err) throw err;
        console.log("Products with less than 150 in the inventory")
        console.log("\n-----------------------\n");
        console.log(results)
        console.log("\n-----------------------\n");
    })
    connection.end();
};

function addTo(){
    inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the item_id of the item you want to update',
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add?',
		}
	]).then(function(input) {

        connection.query('SELECT * FROM inventory WHERE ?', {item_id: input.item_id}, function(err, data) {
			if (err) throw err;
            if (data.length === 0) {
				console.log('Invalid item_id. Please enter a valid item_id.');
                addInventory();
            } 
            else {
                var productData = data[0];
                connection.query('UPDATE inventory SET stock_quantity = ' + (productData.stock_quantity + input.quantity) + ' WHERE item_id = ' + input.item_id, function(err, data) {
                    if (err) throw err;
                    console.log("\n-----------------------\n");
                    console.log('Stock count for Item ID ' + input.item_id + ' has been updated to ' + (productData.stock_quantity + input.quantity) + '.');
                    console.log(data)
                    console.log("\n-----------------------\n");
                    connection.end();
                });
            }
        });
    });
}

function addNew(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Please enter the new product name.',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Product department',
        },
        {
            type: 'input',
            name: 'price',
            message: 'Product price',
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'Product inventory',
        }
    ]).then(function(input) {
        connection.query("INSERT INTO inventory SET ?",
            {
              product_name: input.product_name,
              department_name: input.department_name,
              price: input.price,
              stock_quantity: input.stock_quantity
            },
            function(err, res) {
                console.log("\n-----------------------\n");
              console.log(res.affectedRows + " product inserted\n");
              console.log("\n-----------------------\n");
            }
          );
        
    });
    connection.end();
}