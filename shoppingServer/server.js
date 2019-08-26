"use strict";
let express = require("express");
let app = express();
let port = 5000;
let ShoppingCartRoutes = require("./routes/shopping-cart.routes");
let cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/", ShoppingCartRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
