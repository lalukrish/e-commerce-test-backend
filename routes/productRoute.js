const express = require("express");
const router = express.Router();
const productController = require("../controllers/prodcutController");
const upload = require("../multerConfig");

router.post(
  "/create-product",
  upload.single("image"),
  productController.createProduct
);

router.get("/get-all-products", productController.getAllProduct);

// Route for updating product status
router.put("/product-status/:id", productController.updateProductStatus);

// Route for deleting a product
router.delete("/delete-product/:id", productController.deleteProduct);

router.put(
  "/update-product/:id",
  upload.single("file"),
  productController.updateProduct
);

router.get("/list-all-products", productController.getListProductAll);
router.get("/get-single-product/:id", productController.getSignleProduct);

module.exports = router;
