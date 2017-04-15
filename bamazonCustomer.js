var mysql = require("mysql");
var inquirer = require("inquirer");
var prmpt = require("prompt");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "promoCDfred41?",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

//========================================

function start() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        console.log(" ");

        enterOrder();
    });

// Customer enteres order:
    function enterOrder() {
        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "Enter the product ID (1-10): "
            }, {
                name: "quantity",
                type: "input",
                message: "Enter quanity: "
            },
        ]).then(function (order) {
            console.log("Item # " + order.item);
            console.log("Qty ordered: " + order.quantity);

            var stockCheck = "SELECT * FROM products WHERE ? ";

            connection.query(stockCheck, { item_id: order.item }, function (err, res) {
                console.log(res);
                // console.log(res[0].stock_quantity);
                if (err) {
                    console.log(err);
                }
// Customer order exceeds stock:
                if (res[0].stock_quantity < order.quantity) {
                    console.log("\nInsufficient quantity! Only " + res[0].stock_quantity + " available.");
                    connection.end();
                }
// Customer order is fillable:
                else {
                    var newQuantity = res[0].stock_quantity - order.quantity;
                    var orderPrice = res[0].price * order.quantity;

                    console.log("Updated quantity: " + newQuantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newQuantity
                    }, {
                        item_id: order.item
                    }], function (err, res) {
                        console.log("Your total comes to $" + parseFloat(orderPrice).toFixed(2))
                        connection.end();
                    }
                    )
                }

            })
        })
    }
} //end start function

