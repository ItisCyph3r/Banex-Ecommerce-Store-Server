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

