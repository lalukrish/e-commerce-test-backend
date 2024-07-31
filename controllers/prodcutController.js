const { cloudinary_js_config } = require("../cloudinaryConfig");
const Product = require("../models/productSchema");
const fs = require("fs");

const product_Controller = {
  cloudImage: async (filePath) => {
    try {
      const result = await cloudinary_js_config.uploader.upload(filePath, {});
      fs.unlinkSync(filePath);
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  },
  createProduct: async (req, res) => {
    const { name, review, color, price, description, variant } = req.body;
    const { file } = req;

    try {
      const image = await product_Controller.cloudImage(file.path);
      const newProduct = new Product({
        name,
        review,
        color,
        image,
        price,
        description,
        variant,
      });

      await newProduct.save();
      res
        .status(201)
        .json({ message: "Product created successfully", newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getAllProduct: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const color = req.query.color || "";
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    try {
      const query = {};
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
      if (color) {
        query.color = color;
      }
      if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lte: endDate };
      } else if (startDate) {
        query.createdAt = { $gte: startDate };
      } else if (endDate) {
        query.createdAt = { $lte: endDate };
      }

      const products = await Product.find(query).skip(skip).limit(limit);
      const totalProducts = await Product.countDocuments(query);
      const totalPages = Math.ceil(totalProducts / limit);

      res.json({
        products,
        totalPages,
        currentPage: page,
        totalProducts,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  updateProductStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res
        .status(400)
        .json({ message: "Invalid status value. It should be a boolean." });
    }

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.status = status;
      await product.save();

      res
        .status(200)
        .json({ message: "Product status updated successfully", product });
    } catch (error) {
      console.error("Error updating product status:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.image.public_id) {
        await cloudinary_js_config.uploader.destroy(product.image.public_id);
      }

      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};
module.exports = product_Controller;