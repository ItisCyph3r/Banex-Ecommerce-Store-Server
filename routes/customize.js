// // // const express = require("express");
// // // const router = express.Router();
// // // const customizeController = require("../controller/customize");
// // // const uploadController = require("../controller/upload");
// // // const multer = require("multer");

// // // var storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, "public/uploads/customize");
// // //   },
// // //   filename: function (req, file, cb) {
// // //     cb(null, Date.now() + "_" + file.originalname);
// // //   },
// // // });

// // // const upload = multer({ storage: storage });

// // // router.get("/get-slide-image", customizeController.getImages);
// // // router.post("/delete-slide-image", customizeController.deleteSlideImage);
// // // router.post(
// // //   "/upload-slide-image",
// // //   upload.single("image"),
// // //   customizeController.uploadSlideImage,
// // //   uploadController.uploadImage,
// // // );
// // // router.post("/dashboard-data", customizeController.getAllData);

// // // router.post(
// // //   "/hmm",
// // //   uploadController.uploadImage
// // // )
// // // module.exports = router;




// // // const express = require("express");
// // // const router = express.Router();
// // // const customizeController = require("../controller/customize");
// // // const uploadController = require("../controller/upload");
// // // const multer = require("multer");
// // // const path = require("path");

// // // // Configure multer storage
// // // var storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, "public/uploads/customize"); // Save image locally
// // //   },
// // //   filename: function (req, file, cb) {
// // //     cb(null, Date.now() + "_" + file.originalname); // Generate unique file name
// // //   },
// // // });

// // // const upload = multer({ storage: storage });

// // // router.get("/get-slide-image", customizeController.getImages);
// // // router.post("/delete-slide-image", customizeController.deleteSlideImage);

// // // // Upload image locally first, then to Cloudinary
// // // router.post(
// // //   "/upload-slide-image",
// // //   upload.single("image"), // multer handles the local upload first
// // //   // uploadController.uploadImage, // then this uploads to Cloudinary
// // //   uploadController.uploadImage('customize'),  // Pass the 'customize' folder

// // //   customizeController.uploadSlideImage // saves the Cloudinary URL to your DB (optional)
// // // );

// // // router.post("/dashboard-data", customizeController.getAllData);
// // // module.exports = router;





// const express = require("express");
// const router = express.Router();
// const customizeController = require("../controller/customize");
// const uploadController = require("../controller/upload");
// const { loginCheck } = require("../middleware/auth");
// const multer = require("multer");
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;


// // Cloudinary configuration is required here, too.
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure multer-storage-cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'banex/customize', // The folder where images will be stored in Cloudinary
//     allowedFormats: ['jpg', 'jpeg', 'png'], // Accepted image formats
//     use_filename: true, // Use original name for image
//     unique_filename: false, // If set to true, Cloudinary will rename file to ensure uniqueness
//   },
// });

// const upload = multer({ storage: storage });


// // // Route to upload image to a specific folder in Cloudinary
// // router.post(
// //   "/upload-slide-image",
// //   loginCheck, 
// //   // uploadController.uploadImage('customize'), // Uploads to the 'customize' folder in Cloudinary
// //   upload.single("cImage"), // Upload to Cloudinary directly
// //   customizeController.uploadSlideImage // Saves the Cloudinary URL in the database
// // );



// // Route to upload image directly to Cloudinary
// router.post(
//   '/upload-slide-image',
//   loginCheck, // Authentication middleware
//   upload.single("image"), // Upload to Cloudinary directly
//   // uploadController.uploadImage('customize'), // Uploads to 'customize' folder in Cloudinary
//   customizeController.uploadSlideImage // Saves Cloudinary URL in database
// )
// router.get("/get-slide-image", customizeController.getImages);
// router.post("/delete-slide-image", loginCheck, customizeController.deleteSlideImage);

// router.post("/dashboard-data", customizeController.getAllData);

// module.exports = router;











// // async postAddCategory(req, res) {
// //   let { cName, cDescription, cStatus } = req.body;
// //   let cImage = req.file; // This is now the file uploaded to Cloudinary





// //   console.log(cName)





  
// //   if (!cName || !cDescription || !cStatus || !cImage) {
// //     return res.json({ error: "All fields must be required" });
// //   }

// //   try {
// //     // Upload Image to Cloudinary (file is already passed via Multer)
// //     const cloudinaryResult = await cloudinary.uploader.upload(cImage.path, {
// //       folder: "categories",
// //       use_filename: true,
// //     });

// //     cName = toTitleCase(cName);

// //     let checkCategoryExists = await categoryModel.findOne({ cName });
// //     if (checkCategoryExists) {
// //       // If category exists, delete uploaded image from Cloudinary
// //       await cloudinary.uploader.destroy(cloudinaryResult.public_id);
// //       return res.json({ error: "Category already exists" });
// //     }

// //     let newCategory = new categoryModel({
// //       cName,
// //       cDescription,
// //       cStatus,
// //       cImage: {
// //         public_id: cloudinaryResult.public_id,
// //         url: cloudinaryResult.secure_url,
// //       },
// //     });

// //     await newCategory.save();
// //     return res.json({ success: "Category created successfully" });
// //   } catch (err) {
// //     console.log(err);
// //     return res.status(500).json({ error: "Error while uploading image" });
// //   }
// // }






const express = require("express");
const router = express.Router();
const customizeController = require("../controller/customize");
const { loginCheck } = require("../middleware/auth");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'banex/customize', // The folder where images will be stored in Cloudinary
    allowedFormats: ['jpg', 'jpeg', 'png'], // Accepted image formats
    use_filename: true, // Use original name for the image
    unique_filename: false, // If set to true, Cloudinary will rename the file to ensure uniqueness
  },
});

const upload = multer({ storage: storage });

// Define routes
router.get("/get-slide-image", customizeController.getImages);

router.post(
  "/upload-slide-image",
  upload.single("image"), // Upload to Cloudinary directly
  customizeController.uploadSlideImage
);

router.post("/delete-slide-image", customizeController.deleteSlideImage);
router.post("/dashboard-data", customizeController.getAllData);

module.exports = router;
