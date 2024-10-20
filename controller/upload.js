// // const path = require('path');
// // const cloudinary = require('cloudinary').v2;

// // // Cloudinary configuration (ensure environment variables are set)
// // cloudinary.config({
// //   cloud_name: process.env.CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET
// // });

// // /**
// //  * Upload Image to Cloudinary
// //  * @param {string} folder - The folder where the image is saved locally (e.g., 'customize' or 'products')
// //  */
// // exports.uploadImage = (folder) => {
// //   return async (req, res, next) => {
// //     try {
// //       // The image has already been saved to the local folder by multer
// //       let cImage = req.file.filename; // file name from multer
// //       const imagePath = path.resolve(__dirname, `../public/uploads/${folder}/${cImage}`);

// //       console.log(`Resolved Image Path: ${imagePath}`);

// //       // Upload the file to Cloudinary using the local path
// //       const result = await cloudinary.uploader.upload(imagePath);

// //       console.log(`Cloudinary URL: ${result.secure_url}`);

// //       // Optionally, store the Cloudinary URL or other details
// //       req.cloudinaryUrl = result.secure_url; // Pass it on for use in the next middleware

// //       // Call next middleware (customizeController.uploadSlideImage) to save to DB if needed
// //       next();
// //     } catch (error) {
// //       console.error('Error uploading image:', error);
// //       return res.status(500).json({
// //         status: 'error',
// //         message: 'Image upload failed',
// //         error: error.message
// //       });
// //     }
// //   };
// // };







// // const cloudinary = require('cloudinary').v2;
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // const multer = require('multer');

// // // Cloudinary configuration
// // cloudinary.config({
// //     cloud_name: process.env.CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET
// // });

// // /**
// //  * Upload Image to Cloudinary with dynamic folder
// //  * @param {string} folder - The folder where the image should be uploaded in Cloudinary
// //  */
// // exports.uploadImage = (folder) => {
// //   console.log('object')
// //   const storage = new CloudinaryStorage({
// //     cloudinary: cloudinary,
// //     params: {
// //       folder: folder, // Set the folder dynamically based on the parameter
// //       allowed_formats: ['jpg', 'png', 'jpeg', '*'],
// //       use_filename: true,
// //       unique_filename: false, // Keeps the original filename if you want
// //     },
// //   });

// //   const upload = multer({ storage: storage });

// //   return (req, res, next) => {
// //     upload.single('image')(req, res, function (err) {
// //       if (err) {
// //         console.error('Error uploading image:', err);
// //         return res.status(500).json({ error: 'Image upload failed' });
// //       }
// // console.log(req.file.path)
// //       // File has been uploaded to Cloudinary, pass the Cloudinary URL to next middleware
// //       req.cloudinaryUrl = req.file.path; // `req.file.path` contains the Cloudinary URL
// //       next();
// //     });
// //   };
// // };













// // Required dependencies
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');

// // Cloudinary configuration (make sure to set environment variables correctly)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// /**
//  * Upload Image to Cloudinary with dynamic folder
//  * @param {string} folder - The folder where the image should be uploaded in Cloudinary
//  */
// exports.uploadImage = (folder) => {

//   console.log({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
//   // Configure Cloudinary Storage via multer-storage-cloudinary
//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: folder, // Set the folder dynamically based on the parameter
//       allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed formats for images
//       use_filename: true,
//       unique_filename: false, // Keeps the original filename
//     },
//   });

//   // Initialize multer with Cloudinary storage
//   const upload = multer({ storage: storage });

//   return (req, res, next) => {
//     upload.single('image')(req, res, function (err) {
//       if (err) {
//         console.error('Error uploading image:', err);
//         return res.status(500).json({ error: 'Image upload failed' });
//       }

//       // File has been uploaded to Cloudinary, pass the Cloudinary URL to next middleware
//       req.cloudinaryUrl = req.file.path; // `req.file.path` contains the Cloudinary URL
//       next();
//     });
//   };
// };





























const path = require('path');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration (ensure environment variables are set)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload Image to Cloudinary
 * @param {string} folder - The folder where the image is saved locally (e.g., 'customize' or 'products')
 */
exports.uploadImage = (folder) => {
  return async (req, res, next) => {
    try {
      // The image has already been saved to the local folder by multer
      let cImage = req.file.filename; // file name from multer
      const imagePath = path.resolve(__dirname, `../public/uploads/${folder}/${cImage}`);

      console.log(`Resolved Image Path: ${imagePath}`);

      // Upload the file to Cloudinary using the local path
      const result = await cloudinary.uploader.upload(imagePath);

      console.log(`Cloudinary URL: ${result.secure_url}`);

      // Optionally, store the Cloudinary URL or other details
      req.cloudinaryUrl = result.secure_url; // Pass it on for use in the next middleware

      // Call next middleware (customizeController.uploadSlideImage) to save to DB if needed
      next();
    } catch (error) {
      console.error('Error uploading image:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Image upload failed',
        error: error.message
      });
    }
  };
};

