const express = require("express");
const shoppingRoutes = express.Router();
const shoppingCart = require("./shopping-cart");

shoppingRoutes.get("/shoppingCart", (req, res) => {
  res.send(shoppingCart);
});

shoppingRoutes.post("/shoppingCart", (req, res) => {
  shoppingCart.push(req.body);
  res.send(shoppingCart);
});

shoppingRoutes.put("/shoppingCart/:id", (req, res) => {
  const index = shoppingCart.findIndex(person => person.id === req.params.id);
  shoppingCart.splice(index, 1, req.body);
  res.send(shoppingCart);
});

shoppingRoutes.delete("/shoppingCart/:id", (req, res) => {
  const index = shoppingCart.findIndex(person => person.id === req.params.id);
  shoppingCart.splice(index, 1);
  res.send(shoppingCart);
});

module.exports = shoppingRoutes;
