const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product.js");
const router = express.Router();

router.post("/", createProduct);
router.get("/All", getAllProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
