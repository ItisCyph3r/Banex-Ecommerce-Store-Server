// const express = require("express");
// const router = express.Router();
// const customizeController = require("../controller/customize");
// const uploadController = require("../controller/upload");
// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/customize");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/get-slide-image", customizeController.getImages);
// router.post("/delete-slide-image", customizeController.deleteSlideImage);
// router.post(
//   "/upload-slide-image",
//   upload.single("image"),
//   customizeController.uploadSlideImage,
//   uploadController.uploadImage,
// );
// router.post("/dashboard-data", customizeController.getAllData);

// router.post(
//   "/hmm",
//   uploadController.uploadImage
// )
// module.exports = router;




const express = require("express");
const router = express.Router();
const customizeController = require("../controller/customize");
const uploadController = require("../controller/upload");
const multer = require("multer");
const path = require("path");

// Configure multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/customize"); // Save image locally
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Generate unique file name
  },
});

const upload = multer({ storage: storage });

router.get("/get-slide-image", customizeController.getImages);
router.post("/delete-slide-image", customizeController.deleteSlideImage);

// Upload image locally first, then to Cloudinary
router.post(
  "/upload-slide-image",
  upload.single("image"), // multer handles the local upload first
  // uploadController.uploadImage, // then this uploads to Cloudinary
  uploadController.uploadImage('customize'),  // Pass the 'customize' folder

  customizeController.uploadSlideImage // saves the Cloudinary URL to your DB (optional)
);

router.post("/dashboard-data", customizeController.getAllData);
module.exports = router;
