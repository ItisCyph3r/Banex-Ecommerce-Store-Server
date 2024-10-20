// const express = require("express");
// const router = express.Router();
// const productController = require("../controller/products");
// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/products");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/all-product", productController.getAllProduct);
// router.post("/product-by-category", productController.getProductByCategory);
// router.post("/product-by-price", productController.getProductByPrice);
// router.post("/wish-product", productController.getWishProduct);
// router.post("/cart-product", productController.getCartProduct);

// router.post("/add-product", upload.any(), productController.postAddProduct);
// router.post("/edit-product", upload.any(), productController.postEditProduct);
// router.post("/delete-product", productController.getDeleteProduct);
// router.post("/single-product", productController.getSingleProduct);

// router.post("/add-review", productController.postAddReview);
// router.post("/delete-review", productController.deleteReview);

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const productController = require("../controller/products");
// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/products");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/all-product", productController.getAllProduct);
// router.post("/product-by-category", productController.getProductByCategory);
// router.post("/product-by-price", productController.getProductByPrice);
// router.post("/wish-product", productController.getWishProduct);
// router.post("/cart-product", productController.getCartProduct);

// router.post("/add-product", upload.any(), productController.postAddProduct);
// router.post("/edit-product", upload.any(), productController.postEditProduct);
// router.post("/delete-product", productController.getDeleteProduct);
// router.post("/single-product", productController.getSingleProduct);

// router.post("/add-review", productController.postAddReview);
// router.post("/delete-review", productController.deleteReview);

// module.exports = router;











const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;


// Cloudinary configuration is required here, too.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'banex/product', // The folder where images will be stored in Cloudinary
    allowedFormats: ['jpg', 'jpeg', 'png'], // Accepted image formats
    use_filename: true, // Use original name for image
    unique_filename: false, // If set to true, Cloudinary will rename file to ensure uniqueness
  },
});

const upload = multer({ storage: storage });

router.get("/all-product", productController.getAllProduct);
router.post("/product-by-category", productController.getProductByCategory);
router.post("/product-by-price", productController.getProductByPrice);
router.post("/wish-product", productController.getWishProduct);
router.post("/cart-product", productController.getCartProduct);

router.post("/add-product", 
  upload.any(), 
  productController.postAddProduct);
router.post("/edit-product", upload.any(), productController.postEditProduct);
router.post("/delete-product", productController.getDeleteProduct);
router.post("/single-product", productController.getSingleProduct);

router.post("/add-review", productController.postAddReview);
router.post("/delete-review", productController.deleteReview);

module.exports = router;
