const express = require("express");
const app = express();

app.use(express.json());

const products = require("./routes/products");
const sells = require("./routes/sells");

app.listen(4000, "localhost", () => {
  console.log("server is running ");
});

app.use("/market", products);
app.use("/market", sells);
