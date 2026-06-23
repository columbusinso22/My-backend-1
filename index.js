const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./route/user.route.js");
const productRoute = require("./route/product.js");

const index = express();
const PORT = process.env.PORT;

index.use(express.json());
index.get("/", (req, res) => {
  res.send("Hello World Welcome to my Backend");
});
index.use("/api/user", userRoute);
index.use("/api/product", productRoute);
index.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to Mongodb"))
  .catch((error) => console.error("Error connecting to Mongodb:", error));
