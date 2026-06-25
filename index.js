const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./route/user.route.js");
const productRoute = require("./route/product.js");

const index = express();
const PORT = process.env.PORT || 5000;

// Middleware
index.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

index.use(express.json());

// Routes
index.get("/", (req, res) => {
  res.send("Hello World Welcome to my Backend");
});

index.use("/api/user", userRoute);
index.use("/api/product", productRoute);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Server
index.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
