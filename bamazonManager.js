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

    function viewInventory() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            console.log(res);
            console.log(" ");
        })
    }

    function lowInventory() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity < 5) {
                    console.log(res[i]);
                    connection.end();
                }
                else {
                    console.log("No inventory below 5 units.");
                    connection.end();
                }
            }
        })
    };

    function addInventory() {
        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "ID# of item to update: "
            }, {
                name: "quantity",
                type: "input",
                message: "Units to add "
            }
        ]).then(function (answer) {

            var stockCheck = "SELECT * FROM products WHERE ? ";
            connection.query(stockCheck, { item_id: order.item }, function (err, res) {
                console.log(res);
                // console.log(res[0].stock_quantity);
                if (err) {
                    console.log(err);
                }
                else {
                    var newQuantity = res[0].stock_quantity + answer.quantity;
                    console.log("Updated quantity: " + newQuantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newQuantity
                    }, {
                        item_id: order.item
                    }], function (err, res) {
                        connection.end();
                    })
                } // end else
            })
        } // end then
            )
    } // end add inventory













};  // end start