const express = require("express");
const shoppingRoutes = express.Router();
let pool = require("../connections/pg-connection-pool");

function selectAllItems(req, res) {
  pool.query("select * from shoppingcart order by id").then(result => {
    res.send(result.rows);
  });
}

shoppingRoutes.get("/shoppingCart", selectAllItems);

shoppingRoutes.post("/shoppingCart", (req, res) => {
  pool
    .query(
      "insert into shoppingcart (product, price, quantity) values ($1::text, $2::money, $3::int)",
      [req.body.product, req.body.price, req.body.quantity]
    )
    .then(() => {
      selectAllItems(req, res);
    });
});

shoppingRoutes.put("/shoppingCart/:id", (req, res) => {
  pool
    .query("update shoppingcart set quantity=$1::int where id=$2::int", [
      req.body.quantity,
      req.params.id
    ])
    .then(() => {
      selectAllItems(req, res);
    });
});

shoppingRoutes.delete("/shoppingCart/:id", (req, res) => {
  pool
    .query("delete from shoppingcart where id=$1::int", [req.params.id])
    .then(() => {
      selectAllItems(req, res);
    });
});

// shoppingRoutes.post("/shoppingCart", (req, res) => {
//   shoppingCart.push(req.body);
//   res.send(shoppingCart);
// });

// shoppingRoutes.put("/shoppingCart/:id", (req, res) => {
//   const index = shoppingCart.findIndex(person => person.id === req.params.id);
//   shoppingCart.splice(index, 1, req.body);
//   res.send(shoppingCart);
// });

// shoppingRoutes.delete("/shoppingCart/:id", (req, res) => {
//   const index = shoppingCart.findIndex(person => person.id === req.params.id);
//   shoppingCart.splice(index, 1);
//   res.send(shoppingCart);
// });

module.exports = shoppingRoutes;
