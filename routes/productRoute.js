const express = require("express");
const router = express.Router();
const productController = require("../controllers/prodcutController");
const upload = require("../multerConfig");
const { authenticate } = require("../middleware/authMiddileware");

router.post(
  "/create-product",
  upload.single("image"),
  authenticate,

  productController.createProduct
);

router.get("/get-all-products", authenticate, productController.getAllProduct);

router.put(
  "/product-status/:id",
  authenticate,
  productController.updateProductStatus
);

router.delete(
  "/delete-product/:id",
  authenticate,
  productController.deleteProduct
);

router.put(
  "/update-product/:id",
  upload.single("file"),
  authenticate,

  productController.updateProduct
);

router.get(
  "/list-all-products",
  authenticate,
  productController.getListProductAll
);
router.get(
  "/get-single-product/:id",
  authenticate,
  productController.getSignleProduct
);

router.post("/add-to-cart", authenticate, productController.addToCart);

router.get(
  "/get-cart-items/:userId",
  authenticate,
  productController.getCartItems
);

module.exports = router;
