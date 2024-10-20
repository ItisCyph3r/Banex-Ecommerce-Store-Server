// const express = require("express");
// const router = express.Router();
// const categoryController = require("../controller/categories");
// const multer = require("multer");
// const { loginCheck } = require("../middleware/auth");

// // Image Upload setting
// const upload = multer({ dest: "./public/uploads/categories" });

// router.get("/all-category", categoryController.getAllCategory);
// router.post(
//   "/add-category",
//   loginCheck,
//   upload.single("cImage"),
//   categoryController.postAddCategory
// );
// router.post("/edit-category", loginCheck, categoryController.postEditCategory);
// router.post(
//   "/delete-category",
//   loginCheck,
//   categoryController.getDeleteCategory
// );

// module.exports = router;






const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categories");
const { loginCheck } = require("../middleware/auth");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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
    folder: 'banex/categories', // The folder where images will be stored in Cloudinary
    allowedFormats: ['jpg', 'jpeg', 'png'], // Accepted image formats
    use_filename: true, // Use original name for image
    unique_filename: false, // If set to true, Cloudinary will rename file to ensure uniqueness
  },
});

const upload = multer({ storage: storage });

// Define routes
router.get("/all-category", categoryController.getAllCategory);
router.post(
  "/add-category",
  loginCheck,
  upload.single("cImage"), // Upload to Cloudinary directly
  categoryController.postAddCategory
);
router.post("/edit-category", loginCheck, categoryController.postEditCategory);
router.post(
  "/delete-category",
  loginCheck,
  categoryController.getDeleteCategory
);

module.exports = router;
