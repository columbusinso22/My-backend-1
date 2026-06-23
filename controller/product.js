const Product = require("../model/product.Model.js");
const user = require("../model/user.model.js");

//////create product

exports.createProduct = async (req, res) => {
  try {
    let { tittle, description, price, rating, image, quantity, createdBy } =
      req.body;
    const existingProduct = await Product.findOne({ tittle });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Tittle already Exist",
      });
    }

    const commodity = await Product.create({
      tittle,
      description,
      price,
      rating,
      image,
      quantity,
      createdBy,
    });
    res.status(201).json({
      success: true,
      message: "product Created Successful",
      commodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//// GET ALL PRODUCT
exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find()
      .populate("createdBy", "userName email country gender")
      .sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      message: "product retrieved successfully",
      count: product.length,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// //// GET PRODUCT BY ID

exports.getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)
      // .populate(" createdBy", "userName email country gender")
      .sort({ createdAt: -1 });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Product Comfirmed Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// /////  UPDATE PRODUCT ///////

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Product Updated Successsfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ///////// DELETE PRODUCT /////////
exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
      return;
      res.status(404).json({
        success: false,
        message: "Product Not found",
      });
    }
    res.status(201).json({
      success: "true",
      message: "Product Delated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
