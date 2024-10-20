// const productModel = require("../models/products");
// const fs = require("fs");
// const path = require("path");

// class Product {
//   // Delete Image from uploads -> products folder
//   static deleteImages(images, mode) {
//     var basePath =
//       path.resolve(__dirname + "../../") + "/public/uploads/products/";
//     console.log(basePath);
//     for (var i = 0; i < images.length; i++) {
//       let filePath = "";
//       if (mode == "file") {
//         filePath = basePath + `${images[i].filename}`;
//       } else {
//         filePath = basePath + `${images[i]}`;
//       }
//       console.log(filePath);
//       if (fs.existsSync(filePath)) {
//         console.log("Exists image");
//       }
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           return err;
//         }
//       });
//     }
//   }

//   async getAllProduct(req, res) {
//     try {
//       let Products = await productModel
//         .find({})
//         .populate("pCategory", "_id cName")
//         .sort({ _id: -1 });
//       if (Products) {
//         return res.json({ Products });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async postAddProduct(req, res) {
//     let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } =
//       req.body;
//     let images = req.files;
//     // Validation
//     if (
//       !pName |
//       !pDescription |
//       !pPrice |
//       !pQuantity |
//       !pCategory |
//       !pOffer |
//       !pStatus
//     ) {
//       Product.deleteImages(images, "file");
//       return res.json({ error: "All filled must be required" });
//     }
//     // Validate Name and description
//     else if (pName.length > 255 || pDescription.length > 3000) {
//       Product.deleteImages(images, "file");
//       return res.json({
//         error: "Name 255 & Description must not be 3000 charecter long",
//       });
//     }
//     // Validate Images
//     else if (images.length !== 2) {
//       Product.deleteImages(images, "file");
//       return res.json({ error: "Must need to provide 2 images" });
//     } else {
//       try {
//         let allImages = [];
//         for (const img of images) {
//           allImages.push(img.filename);
//         }
//         let newProduct = new productModel({
//           pImages: allImages,
//           pName,
//           pDescription,
//           pPrice,
//           pQuantity,
//           pCategory,
//           pOffer,
//           pStatus,
//         });
//         let save = await newProduct.save();
//         if (save) {
//           return res.json({ success: "Product created successfully" });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   async postEditProduct(req, res) {
//     let {
//       pId,
//       pName,
//       pDescription,
//       pPrice,
//       pQuantity,
//       pCategory,
//       pOffer,
//       pStatus,
//       pImages,
//     } = req.body;
//     let editImages = req.files;

//     // Validate other fileds
//     if (
//       !pId |
//       !pName |
//       !pDescription |
//       !pPrice |
//       !pQuantity |
//       !pCategory |
//       !pOffer |
//       !pStatus
//     ) {
//       return res.json({ error: "All filled must be required" });
//     }
//     // Validate Name and description
//     else if (pName.length > 255 || pDescription.length > 3000) {
//       return res.json({
//         error: "Name 255 & Description must not be 3000 charecter long",
//       });
//     }
//     // Validate Update Images
//     else if (editImages && editImages.length == 1) {
//       Product.deleteImages(editImages, "file");
//       return res.json({ error: "Must need to provide 2 images" });
//     } else {
//       let editData = {
//         pName,
//         pDescription,
//         pPrice,
//         pQuantity,
//         pCategory,
//         pOffer,
//         pStatus,
//       };
//       if (editImages.length == 2) {
//         let allEditImages = [];
//         for (const img of editImages) {
//           allEditImages.push(img.filename);
//         }
//         editData = { ...editData, pImages: allEditImages };
//         Product.deleteImages(pImages.split(","), "string");
//       }
//       try {
//         let editProduct = productModel.findByIdAndUpdate(pId, editData);
//         editProduct.exec((err) => {
//           if (err) console.log(err);
//           return res.json({ success: "Product edit successfully" });
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   async getDeleteProduct(req, res) {
//     let { pId } = req.body;
//     if (!pId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let deleteProductObj = await productModel.findById(pId);
//         let deleteProduct = await productModel.findByIdAndDelete(pId);
//         if (deleteProduct) {
//           // Delete Image from uploads -> products folder
//           Product.deleteImages(deleteProductObj.pImages, "string");
//           return res.json({ success: "Product deleted successfully" });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   async getSingleProduct(req, res) {
//     let { pId } = req.body;
//     if (!pId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let singleProduct = await productModel
//           .findById(pId)
//           .populate("pCategory", "cName")
//           .populate("pRatingsReviews.user", "name email userImage");
//         if (singleProduct) {
//           return res.json({ Product: singleProduct });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   async getProductByCategory(req, res) {
//     let { catId } = req.body;
//     if (!catId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let products = await productModel
//           .find({ pCategory: catId })
//           .populate("pCategory", "cName");
//         if (products) {
//           return res.json({ Products: products });
//         }
//       } catch (err) {
//         return res.json({ error: "Search product wrong" });
//       }
//     }
//   }

//   async getProductByPrice(req, res) {
//     let { price } = req.body;
//     if (!price) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let products = await productModel
//           .find({ pPrice: { $lt: price } })
//           .populate("pCategory", "cName")
//           .sort({ pPrice: -1 });
//         if (products) {
//           return res.json({ Products: products });
//         }
//       } catch (err) {
//         return res.json({ error: "Filter product wrong" });
//       }
//     }
//   }

//   async getWishProduct(req, res) {
//     let { productArray } = req.body;
//     if (!productArray) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let wishProducts = await productModel.find({
//           _id: { $in: productArray },
//         });
//         if (wishProducts) {
//           return res.json({ Products: wishProducts });
//         }
//       } catch (err) {
//         return res.json({ error: "Filter product wrong" });
//       }
//     }
//   }

//   async getCartProduct(req, res) {
//     let { productArray } = req.body;
//     if (!productArray) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let cartProducts = await productModel.find({
//           _id: { $in: productArray },
//         });
//         if (cartProducts) {
//           return res.json({ Products: cartProducts });
//         }
//       } catch (err) {
//         return res.json({ error: "Cart product wrong" });
//       }
//     }
//   }

//   async postAddReview(req, res) {
//     let { pId, uId, rating, review } = req.body;
//     if (!pId || !rating || !review || !uId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       let checkReviewRatingExists = await productModel.findOne({ _id: pId });
//       if (checkReviewRatingExists.pRatingsReviews.length > 0) {
//         checkReviewRatingExists.pRatingsReviews.map((item) => {
//           if (item.user === uId) {
//             return res.json({ error: "Your already reviewd the product" });
//           } else {
//             try {
//               let newRatingReview = productModel.findByIdAndUpdate(pId, {
//                 $push: {
//                   pRatingsReviews: {
//                     review: review,
//                     user: uId,
//                     rating: rating,
//                   },
//                 },
//               });
//               newRatingReview.exec((err, result) => {
//                 if (err) {
//                   console.log(err);
//                 }
//                 return res.json({ success: "Thanks for your review" });
//               });
//             } catch (err) {
//               return res.json({ error: "Cart product wrong" });
//             }
//           }
//         });
//       } else {
//         try {
//           let newRatingReview = productModel.findByIdAndUpdate(pId, {
//             $push: {
//               pRatingsReviews: { review: review, user: uId, rating: rating },
//             },
//           });
//           newRatingReview.exec((err, result) => {
//             if (err) {
//               console.log(err);
//             }
//             return res.json({ success: "Thanks for your review" });
//           });
//         } catch (err) {
//           return res.json({ error: "Cart product wrong" });
//         }
//       }
//     }
//   }

//   async deleteReview(req, res) {
//     let { rId, pId } = req.body;
//     if (!rId) {
//       return res.json({ message: "All filled must be required" });
//     } else {
//       try {
//         let reviewDelete = productModel.findByIdAndUpdate(pId, {
//           $pull: { pRatingsReviews: { _id: rId } },
//         });
//         reviewDelete.exec((err, result) => {
//           if (err) {
//             console.log(err);
//           }
//           return res.json({ success: "Your review is deleted" });
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }
// }

// const productController = new Product();
// module.exports = productController;
















// class Product {
//   // Upload images to Cloudinary
//   static async uploadImages(images) {
//     let uploadedImages = [];
//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.uploader.upload(images[i].path, {
//         folder: "products", // cloudinary folder for product images
//       });
//       uploadedImages.push(result.secure_url);
//     }
//     return uploadedImages;
//   }

//   // Delete images from Cloudinary
//   static async deleteImagesFromCloudinary(imageUrls) {
//     for (let imageUrl of imageUrls) {
//       let publicId = imageUrl.split("/").pop().split(".")[0];
//       await cloudinary.uploader.destroy(`products/${publicId}`);
//     }
//   }

//   // Delete images from local file system (used before Cloudinary)
//   static deleteImages(images, mode) {
//     var basePath =
//       path.resolve(__dirname + "../../") + "/public/uploads/products/";
//     for (var i = 0; i < images.length; i++) {
//       let filePath = "";
//       if (mode == "file") {
//         filePath = basePath + `${images[i].filename}`;
//       } else {
//         filePath = basePath + `${images[i]}`;
//       }
//       if (fs.existsSync(filePath)) {
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             return err;
//           }
//         });
//       }
//     }
//   }

//   // Fetch all products
//   async getAllProduct(req, res) {
//     try {
//       let Products = await productModel
//         .find({})
//         .populate("pCategory", "_id cName")
//         .sort({ _id: -1 });
//       if (Products) {
//         return res.json({ Products });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // Create a new product with Cloudinary integration
//   async postAddProduct(req, res) {
//     let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } =
//       req.body;
//     let images = req.files;

//     if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
//       return res.json({ error: "All fields must be filled" });
//     } else if (pName.length > 255 || pDescription.length > 3000) {
//       return res.json({ error: "Name must be <= 255 chars, Description <= 3000 chars" });
//     } else if (images.length !== 2) {
//       return res.json({ error: "Must provide 2 images" });
//     } else {
//       try {
//         // Upload images to Cloudinary
//         let uploadedImages = await Product.uploadImages(images);

//         // Create new product in the database
//         let newProduct = new productModel({
//           pImages: uploadedImages,
//           pName,
//           pDescription,
//           pPrice,
//           pQuantity,
//           pCategory,
//           pOffer,
//           pStatus,
//         });
//         let save = await newProduct.save();
//         if (save) {
//           return res.json({ success: "Product created successfully" });
//         }
//       } catch (err) {
//         console.log(err);
//         return res.json({ error: "Something went wrong" });
//       }
//     }
//   }

//   // Edit an existing product with Cloudinary integration
//   async postEditProduct(req, res) {
//     let {
//       pId,
//       pName,
//       pDescription,
//       pPrice,
//       pQuantity,
//       pCategory,
//       pOffer,
//       pStatus,
//       pImages,
//     } = req.body;
//     let editImages = req.files;

//     if (!pId || !pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
//       return res.json({ error: "All fields must be filled" });
//     } else if (pName.length > 255 || pDescription.length > 3000) {
//       return res.json({ error: "Name must be <= 255 chars, Description <= 3000 chars" });
//     } else if (editImages && editImages.length !== 2) {
//       return res.json({ error: "Must provide 2 images" });
//     } else {
//       try {
//         let editData = {
//           pName,
//           pDescription,
//           pPrice,
//           pQuantity,
//           pCategory,
//           pOffer,
//           pStatus,
//         };

//         // If new images are provided, upload to Cloudinary
//         if (editImages.length === 2) {
//           let uploadedImages = await Product.uploadImages(editImages);
//           Product.deleteImagesFromCloudinary(pImages.split(","));
//           editData = { ...editData, pImages: uploadedImages };
//         }

//         // Update product
//         let editProduct = productModel.findByIdAndUpdate(pId, editData);
//         editProduct.exec((err) => {
//           if (err) console.log(err);
//           return res.json({ success: "Product updated successfully" });
//         });
//       } catch (err) {
//         console.log(err);
//         return res.json({ error: "Something went wrong" });
//       }
//     }
//   }

//   // Delete a product
//   async getDeleteProduct(req, res) {
//     let { pId } = req.body;
//     if (!pId) {
//       return res.json({ error: "All fields must be filled" });
//     } else {
//       try {
//         let deleteProductObj = await productModel.findById(pId);
//         let deleteProduct = await productModel.findByIdAndDelete(pId);
//         if (deleteProduct) {
//           Product.deleteImagesFromCloudinary(deleteProductObj.pImages);
//           return res.json({ success: "Product deleted successfully" });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   // Fetch a single product by ID
//   async getSingleProduct(req, res) {
//     let { pId } = req.body;
//     if (!pId) {
//       return res.json({ error: "All fields must be filled" });
//     } else {
//       try {
//         let singleProduct = await productModel
//           .findById(pId)
//           .populate("pCategory", "cName")
//           .populate("pRatingsReviews.user", "name email userImage");
//         if (singleProduct) {
//           return res.json({ Product: singleProduct });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   // Fetch products by category
//   async getProductByCategory(req, res) {
//     let { catId } = req.body;
//     if (!catId) {
//       return res.json({ error: "All fields must be filled" });
//     } else {
//       try {
//         let products = await productModel
//           .find({ pCategory: catId })
//           .populate("pCategory", "cName");
//         if (products) {
//           return res.json({ Products: products });
//         }
//       } catch (err) {
//         return res.json({ error: "Search product wrong" });
//       }
//     }
//   }

//   // Fetch products by price
//   async getProductByPrice(req, res) {
//     let { price } = req.body;
//     if (!price) {
//       return res.json({ error: "All fields must be filled" });
//     } else {
//       try {
//         let products = await productModel
//           .find({ pPrice: { $lt: price } })
//           .populate("pCategory", "cName")
//           .sort({ pPrice: -1 });
//         if (products) {
//           return res.json({ Products: products });
//         }
//       } catch (err) {
//         return res.json({ error: "Filter product wrong" });
//       }
//     }
//   }

//   // Fetch products for a wishlist
//   async getWishProduct(req, res) {
//     let { productArray } = req.body;
//     if (!productArray) {
//       return res.json({ error: "All fields must be filled" });
//     } else {
//       try {
//         let wishProducts = await productModel.find({
//           _id: { $in: productArray },
//         });
//         if (wishProducts) {
//           return res.json({ Products: wishProducts });
//         }
//       } catch (err) {
//         return res.json({ error: "Wrong request" });
//       }
//     }
//   }

//   // Add a review to a product
//   async postAddReview(req, res) {
//     let { pId, review, rating } = req.body;
//     if (!pId || !review || !rating) {
//       return res.json({ error: "All fields must be filled" });
//     } else {
//       try {
//         let addReview = await productModel.findByIdAndUpdate(pId, {
//           $push: {
//             pRatingsReviews: {
//               review,
//               rating,
//               user: req.user._id,
//             },
//           },
//         });
//         if (addReview) {
//           return res.json({ success: "Review added successfully" });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }
// }

// // const productController = new Product();
// // module.exports = productController;

// module.exports = new Product();











// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const path = require("path");
// const productModel = require("../models/products");

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // Helper function to upload images to Cloudinary and remove local file
// const uploadToCloudinary = (filePath, folder) => {
//   return cloudinary.uploader
//     .upload(filePath, { folder: folder })
//     .then((result) => {
//       // Delete the local file after uploading
//       fs.unlinkSync(filePath);
//       return result;
//     })
//     .catch((err) => {
//       console.error("Cloudinary upload error:", err);
//       throw err;
//     });
// };

// class Product {
//   // Helper function to delete local images from the filesystem
//   static deleteImages(images, mode) {
//     var basePath = path.resolve(__dirname + "../../") + "/public/uploads/products/";
//     for (var i = 0; i < images.length; i++) {
//       let filePath = "";
//       if (mode == "file") {
//         filePath = basePath + `${images[i].filename}`;
//       } else {
//         filePath = basePath + `${images[i]}`;
//       }
//       if (fs.existsSync(filePath)) {
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.error("Error deleting image:", err);
//           }
//         });
//       }
//     }
//   }

//   // Add product function with Cloudinary integration
//   async postAddProduct(req, res) {
//     let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
//     let images = req.files;

//     if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
//       Product.deleteImages(images, "file");
//       return res.json({ error: "All fields must be required" });
//     } else if (pName.length > 255 || pDescription.length > 3000) {
//       Product.deleteImages(images, "file");
//       return res.json({
//         error: "Name must not exceed 255 characters & description must not exceed 3000 characters",
//       });
//     } else if (images.length !== 2) {
//       Product.deleteImages(images, "file");
//       return res.json({ error: "Must provide exactly 2 images" });
//     }

//     try {
//       let cloudinaryImageUrls = [];

//       // Upload images to Cloudinary
//       for (const img of images) {
//         const imagePath = path.resolve("public/uploads/products", img.filename);
//         const cloudinaryResult = await uploadToCloudinary(imagePath, "products");
//         cloudinaryImageUrls.push(cloudinaryResult.secure_url);
//       }

//       // Create a new product with Cloudinary URLs
//       let newProduct = new productModel({
//         pImages: cloudinaryImageUrls,
//         pName,
//         pDescription,
//         pPrice,
//         pQuantity,
//         pCategory,
//         pOffer,
//         pStatus,
//       });

//       let save = await newProduct.save();
//       if (save) {
//         return res.json({ success: "Product created successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Server error" });
//     }
//   }

//   // Edit product function with Cloudinary integration
//   async postEditProduct(req, res) {
//     let { pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, pImages } = req.body;
//     let editImages = req.files;

//     if (!pId || !pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
//       return res.json({ error: "All fields must be required" });
//     } else if (pName.length > 255 || pDescription.length > 3000) {
//       return res.json({
//         error: "Name must not exceed 255 characters & description must not exceed 3000 characters",
//       });
//     } else if (editImages && editImages.length == 1) {
//       Product.deleteImages(editImages, "file");
//       return res.json({ error: "Must provide exactly 2 images" });
//     }

//     try {
//       let editData = {
//         pName,
//         pDescription,
//         pPrice,
//         pQuantity,
//         pCategory,
//         pOffer,
//         pStatus,
//       };

//       // Check if new images are being uploaded
//       if (editImages && editImages.length == 2) {
//         let allEditImages = [];
//         for (const img of editImages) {
//           const imagePath = path.resolve("public/uploads/products", img.filename);
//           const cloudinaryResult = await uploadToCloudinary(imagePath, "products");
//           allEditImages.push(cloudinaryResult.secure_url); // Store Cloudinary URLs
//         }

//         // Update the image field in editData
//         editData = { ...editData, pImages: allEditImages };
//         Product.deleteImages(pImages.split(","), "string"); // Delete old images
//       }

//       // Update the product in the database
//       let editProduct = productModel.findByIdAndUpdate(pId, editData, { new: true });
//       editProduct.exec((err, result) => {
//         if (err) {
//           console.log(err);
//           return res.json({ error: "Error updating product" });
//         }
//         return res.json({ success: "Product edited successfully", product: result });
//       });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Server error" });
//     }
//   }

//   // Other functions (delete, getSingleProduct, etc.) remain unchanged...
// }

// const productController = new Product();
// module.exports = productController;











































// const cloudinary = require("cloudinary").v2;
// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;
// const productModel = require("../models/products");
// const fs = require("fs");
// const path = require("path");

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// class Product {
//   // Helper to upload images to Cloudinary and remove local files
//   static async uploadToCloudinary(filePath) {
//     try {
//       const result = await cloudinary.uploader.upload(filePath, {
//         folder: "products",
//       });
//       // Delete the local file after uploading
//       fs.unlinkSync(filePath);
//       return result.secure_url; // Return the Cloudinary URL
//     } catch (err) {
//       console.error("Error uploading to Cloudinary:", err);
//       throw err;
//     }
//   }

//   // Delete Images from local uploads/products folder
//   static deleteImages(images, mode) {
//     var basePath = path.resolve(__dirname + "../../") + "/public/uploads/products/";
//     for (var i = 0; i < images.length; i++) {
//       let filePath = mode === "file" ? basePath + `${images[i].filename}` : basePath + `${images[i]}`;
//       if (fs.existsSync(filePath)) {
//         fs.unlink(filePath, (err) => {
//           if (err) console.error("Error deleting image:", err);
//         });
//       }
//     }
//   }

//   // Fetch all products
//   async getAllProduct(req, res) {
//     try {
//       let Products = await productModel.find({}).populate("pCategory", "_id cName").sort({ _id: -1 });
//       return res.json({ Products });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Server error" });
//     }
//   }


// async postAddProduct(req, res) {
//   let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
//   let images = req.files;

//   if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
//     return res.json({ error: "All fields must be required" });
//   }

//   if (pName.length > 255 || pDescription.length > 3000) {
//     return res.json({ error: "Name must not exceed 255 characters and description must not exceed 3000 characters" });
//   }

//   if (images.length !== 2) {
//     return res.json({ error: "Must provide exactly 2 images" });
//   }

//   try {
//     let cloudinaryUrls = images.map(img => img.path); // Cloudinary URL for each image

//     let newProduct = new productModel({
//       pImages: cloudinaryUrls, // Use Cloudinary URLs
//       pName,
//       pDescription,
//       pPrice,
//       pQuantity,
//       pCategory,
//       pOffer,
//       pStatus,
//     });

//     let save = await newProduct.save();
//     if (save) {
//       return res.json({ success: "Product created successfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }








// async postAddProduct(req, res) {
//   let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
//   let images = req.files;

//   if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
//     return res.json({ error: "All fields must be required" });
//   }

//   if (pName.length > 255 || pDescription.length > 3000) {
//     return res.json({ error: "Name must not exceed 255 characters and description must not exceed 3000 characters" });
//   }

//   if (images.length !== 2) {
//     return res.json({ error: "Must provide exactly 2 images" });
//   }

//   try {
//     let cloudinaryUrls = images.map(img => img.path); // Cloudinary URL for each image

//     let newProduct = new productModel({
//       pImages: cloudinaryUrls, // Use Cloudinary URLs
//       pName,
//       pDescription,
//       pPrice,
//       pQuantity,
//       pCategory,
//       pOffer,
//       pStatus,
//     });

//     let save = await newProduct.save();
//     if (save) {
//       return res.json({ success: "Product created successfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }


//   // Edit product
//   async postEditProduct(req, res) {
//     let { pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, pImages } = req.body;
//     let editImages = req.files;

//     if (!pId || !pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
//       return res.json({ error: "All fields must be required" });
//     }

//     if (pName.length > 255 || pDescription.length > 3000) {
//       return res.json({ error: "Name must not exceed 255 characters and description must not exceed 3000 characters" });
//     }

//     if (editImages && editImages.length === 1) {
//       Product.deleteImages(editImages, "file");
//       return res.json({ error: "Must provide exactly 2 images" });
//     }

//     try {
//       let editData = {
//         pName,
//         pDescription,
//         pPrice,
//         pQuantity,
//         pCategory,
//         pOffer,
//         pStatus,
//       };

//       if (editImages && editImages.length === 2) {
//         let newCloudinaryUrls = [];

//         // Upload new images to Cloudinary
//         for (const img of editImages) {
//           const localPath = path.resolve("public/uploads/products", img.filename);
//           const cloudinaryUrl = await Product.uploadToCloudinary(localPath);
//           newCloudinaryUrls.push(cloudinaryUrl); // Save Cloudinary URLs
//         }

//         // Add new images to editData and delete old images
//         editData.pImages = newCloudinaryUrls;
//         Product.deleteImages(pImages.split(","), "string"); // Remove old images
//       }

//       let editProduct = await productModel.findByIdAndUpdate(pId, editData, { new: true });
//       if (editProduct) {
//         return res.json({ success: "Product edited successfully", product: editProduct });
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Server error" });
//     }
//   }

//   // Delete product
//   async getDeleteProduct(req, res) {
//     let { pId } = req.body;
//     if (!pId) {
//       return res.json({ error: "Product ID is required" });
//     }

//     try {
//       let deleteProduct = await productModel.findByIdAndDelete(pId);
//       if (deleteProduct) {
//         Product.deleteImages(deleteProduct.pImages, "string"); // Delete images
//         return res.json({ success: "Product deleted successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Server error" });
//     }
//   }

//     async getSingleProduct(req, res) {
//     let { pId } = req.body;
//     if (!pId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let singleProduct = await productModel
//           .findById(pId)
//           .populate("pCategory", "cName")
//           .populate("pRatingsReviews.user", "name email userImage");
//         if (singleProduct) {
//           return res.json({ Product: singleProduct });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   async getProductByCategory(req, res) {
//     let { catId } = req.body;
//     if (!catId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let products = await productModel
//           .find({ pCategory: catId })
//           .populate("pCategory", "cName");
//         if (products) {
//           return res.json({ Products: products });
//         }
//       } catch (err) {
//         return res.json({ error: "Search product wrong" });
//       }
//     }
//   }

//   async getProductByPrice(req, res) {
//     let { price } = req.body;
//     if (!price) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let products = await productModel
//           .find({ pPrice: { $lt: price } })
//           .populate("pCategory", "cName")
//           .sort({ pPrice: -1 });
//         if (products) {
//           return res.json({ Products: products });
//         }
//       } catch (err) {
//         return res.json({ error: "Filter product wrong" });
//       }
//     }
//   }

//   async getWishProduct(req, res) {
//     let { productArray } = req.body;
//     if (!productArray) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let wishProducts = await productModel.find({
//           _id: { $in: productArray },
//         });
//         if (wishProducts) {
//           return res.json({ Products: wishProducts });
//         }
//       } catch (err) {
//         return res.json({ error: "Filter product wrong" });
//       }
//     }
//   }

//   async getCartProduct(req, res) {
//     let { productArray } = req.body;
//     if (!productArray) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let cartProducts = await productModel.find({
//           _id: { $in: productArray },
//         });
//         if (cartProducts) {
//           return res.json({ Products: cartProducts });
//         }
//       } catch (err) {
//         return res.json({ error: "Cart product wrong" });
//       }
//     }
//   }

//   async postAddReview(req, res) {
//     let { pId, uId, rating, review } = req.body;
//     if (!pId || !rating || !review || !uId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       let checkReviewRatingExists = await productModel.findOne({ _id: pId });
//       if (checkReviewRatingExists.pRatingsReviews.length > 0) {
//         checkReviewRatingExists.pRatingsReviews.map((item) => {
//           if (item.user === uId) {
//             return res.json({ error: "Your already reviewd the product" });
//           } else {
//             try {
//               let newRatingReview = productModel.findByIdAndUpdate(pId, {
//                 $push: {
//                   pRatingsReviews: {
//                     review: review,
//                     user: uId,
//                     rating: rating,
//                   },
//                 },
//               });
//               newRatingReview.exec((err, result) => {
//                 if (err) {
//                   console.log(err);
//                 }
//                 return res.json({ success: "Thanks for your review" });
//               });
//             } catch (err) {
//               return res.json({ error: "Cart product wrong" });
//             }
//           }
//         });
//       } else {
//         try {
//           let newRatingReview = productModel.findByIdAndUpdate(pId, {
//             $push: {
//               pRatingsReviews: { review: review, user: uId, rating: rating },
//             },
//           });
//           newRatingReview.exec((err, result) => {
//             if (err) {
//               console.log(err);
//             }
//             return res.json({ success: "Thanks for your review" });
//           });
//         } catch (err) {
//           return res.json({ error: "Cart product wrong" });
//         }
//       }
//     }
//   }

//   async deleteReview(req, res) {
//     let { rId, pId } = req.body;
//     if (!rId) {
//       return res.json({ message: "All filled must be required" });
//     } else {
//       try {
//         let reviewDelete = productModel.findByIdAndUpdate(pId, {
//           $pull: { pRatingsReviews: { _id: rId } },
//         });
//         reviewDelete.exec((err, result) => {
//           if (err) {
//             console.log(err);
//           }
//           return res.json({ success: "Your review is deleted" });
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }
// }


// const productController = new Product();
// module.exports = productController;






























//   // Helper to upload images to Cloudinary and remove local files
//   static async uploadToCloudinary(filePath) {
//     try {
//       const result = await cloudinary.uploader.upload(filePath, {
//         folder: "products",
//       });
//       // Delete the local file after uploading
//       fs.unlinkSync(filePath);
//       return result.secure_url; // Return the Cloudinary URL
//     } catch (err) {
//       console.error("Error uploading to Cloudinary:", err);
//       throw err;
//     }
//   }

//   // Delete Images from local uploads/products folder
//   static deleteImages(images, mode) {
//     var basePath = path.resolve(__dirname + "../../") + "/public/uploads/products/";
//     for (var i = 0; i < images.length; i++) {
//       let filePath = mode === "file" ? basePath + `${images[i].filename}` : basePath + `${images[i]}`;
//       if (fs.existsSync(filePath)) {
//         fs.unlink(filePath, (err) => {
//           if (err) console.error("Error deleting image:", err);
//         });
//       }
//     }
//   }





// controller/products.js
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const productModel = require("../models/products");
const fs = require("fs");
const path = require("path");
const streamifier = require('streamifier'); // Add this to the top
const { toTitleCase } = require("../config/function");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

class Product {
  // Helper to upload images to Cloudinary
  static async uploadToCloudinary(buffer) {
    // try {
    //   const result = await cloudinary.uploader.upload_stream({
    //     folder: "products",
    //   });
    //   return new Promise((resolve, reject) => {
    //     const stream = result.createReadStream({ buffer });
    //     stream.on("end", () => resolve(result.secure_url));
    //     stream.on("error", reject);
    //   });
    // } catch (err) {
    //   console.error("Error uploading to Cloudinary:", err);
    //   throw err;
    // }



    

    
  }

  // Fetch all products
  async getAllProduct(req, res) {
    try {
      let Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      return res.json({ Products });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

// Add new product
async postAddProduct(req, res) {
  let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
  let images = req.files;

  if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
    return res.json({ error: "All fields must be required" });
  }

  if (pName.length > 255 || pDescription.length > 3000) {
    return res.json({ error: "Name must not exceed 255 characters and description must not exceed 3000 characters" });
  }

  if (images.length !== 2) {
    return res.json({ error: "Must provide exactly 2 images" });
  }

  try {
    // Check if the product name already exists
    let checkProductExists = await productModel.findOne({ pName });
    if (checkProductExists) {
      return res.json({ error: "Product with this name already exists" });
    }

    let cloudinaryUrls = [];

    // Upload images to Cloudinary
    for (const img of images) {
      // Ensure each image is uploaded separately
      const cloudinaryResult = await cloudinary.uploader.upload(img.path, {
        folder: "banex/products",
        use_filename: true,
      });

      // Push the individual result secure_url to the array
      cloudinaryUrls.push(cloudinaryResult.secure_url);
    }

    // Convert pName to title case
    pName = toTitleCase(pName);

    // Create the new product
    let newProduct = new productModel({
      pImages: cloudinaryUrls, // Save all Cloudinary URLs
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
    });

    // Save the new product
    let save = await newProduct.save();
    if (save) {
      return res.json({ success: "Product created successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}




//   // Add new product
// async postAddProduct(req, res) {
//   let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
//   let images = req.files;

//   if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
//     return res.json({ error: "All fields must be required" });
//   }

//   if (pName.length > 255 || pDescription.length > 3000) {
//     return res.json({ error: "Name must not exceed 255 characters and description must not exceed 3000 characters" });
//   }

//   if (images.length !== 2) {
//     return res.json({ error: "Must provide exactly 2 images" });
//   }

//   try {
//     // Check if the product name already exists
//     let checkProductExists = await productModel.findOne({ pName });
//     if (checkProductExists) {
//       return res.json({ error: "Product with this name already exists" });
//     }

//     let cloudinaryUrls = [];

//     // Upload images to Cloudinary
//     for (const img of images) {
//       const cloudinaryResult = await cloudinary.uploader.upload(img.path, {
//         folder: "products",
//         use_filename: true,
//       });
//       cloudinaryUrls.push(cloudinaryResult.secure_url);
//     }

//     // Convert pName to title case
//     pName = toTitleCase(pName);

//     // Create the new product
//     let newProduct = new productModel({
//       pImages: cloudinaryUrls, // Save all Cloudinary URLs
//       pName,
//       pDescription,
//       pPrice,
//       pQuantity,
//       pCategory,
//       pOffer,
//       pStatus,
//     });

//     // Save the new product
//     let save = await newProduct.save();
//     if (save) {
//       return res.json({ success: "Product created successfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }


  // // Add new product
  // async postAddProduct(req, res) {
  //   let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body;
  //   let images = req.files;

  //   if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
  //     return res.json({ error: "All fields must be required" });
  //   }

  //   if (pName.length > 255 || pDescription.length > 3000) {
  //     return res.json({ error: "Name must not exceed 255 characters and description must not exceed 3000 characters" });
  //   }

  //   if (images.length !== 2) {
  //     return res.json({ error: "Must provide exactly 2 images" });
  //   }

  //   try {
  //     let cloudinaryUrls = [];

  //     // Upload images to Cloudinary
  //     for (const img of images) {


  //       let checkProductExists = await productModel.findOne({ pName });
  //       if (checkProductExists) {
  //         // If category exists, delete uploaded image from Cloudinary
  //         await cloudinary.uploader.destroy(cloudinaryResult.public_id);
  //         return res.json({ error: "Category already exists" });
  //       }

  //       const cloudinaryResult = await cloudinary.uploader.upload(img.path, {
  //         folder: "products",
  //         use_filename: true,
  //       });

  //       cloudinaryUrls.push(cloudinaryResult)


  //     }

  //     pName = toTitleCase(pName);

  //     console.log(cloudinaryUrls)

  //     let newProduct = new productModel({
  //       pImages: {
  //         public_id: cloudinaryResult[0].public_id,
  //         url: cloudinaryResult[0].secure_url,
  //       },
  //       pName,
  //       pDescription,
  //       pPrice,
  //       pQuantity,
  //       pCategory,
  //       pOffer,
  //       pStatus,
  //     });

  //     let save = await newProduct.save();
  //     if (save) {
  //       return res.json({ success: "Product created successfully" });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ error: "Server error" });
  //   }
  // }

  // Edit product
  async postEditProduct(req, res) {
    let { pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, pImages } = req.body;
    let editImages = req.files;

    if (!pId || !pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pStatus) {
      return res.json({ error: "All fields must be required" });
    }

    if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({ error: "Name must not exceed 255 characters and description must not exceed 3000 characters" });
    }

    if (editImages && editImages.length === 1) {
      return res.json({ error: "Must provide exactly 2 images" });
    }

    try {
      let editData = {
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
      };

      if (editImages && editImages.length === 2) {
        let newCloudinaryUrls = [];

        // Upload new images to Cloudinary
        for (const img of editImages) {
          const cloudinaryUrl = await Product.uploadToCloudinary(img.buffer);
          newCloudinaryUrls.push(cloudinaryUrl); // Save Cloudinary URLs
        }

        // Add new images to editData
        editData.pImages = newCloudinaryUrls;
      }

      let editProduct = await productModel.findByIdAndUpdate(pId, editData, { new: true });
      if (editProduct) {
        return res.json({ success: "Product edited successfully", product: editProduct });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Delete product
  async getDeleteProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "Product ID is required" });
    }

    try {
      let deleteProduct = await productModel.findByIdAndDelete(pId);
      if (deleteProduct) {
        return res.json({ success: "Product deleted successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Fetch single product
  async getSingleProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let singleProduct = await productModel
          .findById(pId)
          .populate("pCategory", "cName")
          .populate("pRatingsReviews.user", "name email userImage");
        if (singleProduct) {
          return res.json({ Product: singleProduct });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Fetch products by category
  async getProductByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pCategory: catId })
          .populate("pCategory", "cName");
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Search product wrong" });
      }
    }
  }

  // Fetch products by price
  async getProductByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pPrice: { $lt: price } })
          .populate("pCategory", "cName");
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Add a review to a product
  async postAddReview(req, res) {
    let { review, userId, rating, pId } = req.body;
    if (!review || !userId || !rating || !pId) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let reviewData = {
          review,
          user: userId,
          rating,
        };

        let saveReview = await productModel.findByIdAndUpdate(
          pId,
          { $push: { pRatingsReviews: reviewData } },
          { new: true }
        );
        if (saveReview) {
          return res.json({ success: "Review added successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Delete review
  async deleteReview(req, res) {
    let { pId, reviewId } = req.body;
    if (!pId || !reviewId) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let deleteReview = await productModel.findByIdAndUpdate(
          pId,
          { $pull: { pRatingsReviews: { _id: reviewId } } },
          { new: true }
        );
        if (deleteReview) {
          return res.json({ success: "Review deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  async getWishProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let wishProducts = await productModel.find({
          _id: { $in: productArray },
        });
        if (wishProducts) {
          return res.json({ Products: wishProducts });
        }
      } catch (err) {
        return res.json({ error: "Filter product wrong" });
      }
    }
  }

  async getCartProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let cartProducts = await productModel.find({
          _id: { $in: productArray },
        });
        if (cartProducts) {
          return res.json({ Products: cartProducts });
        }
      } catch (err) {
        return res.json({ error: "Cart product wrong" });
      }
    }
  }
}



const productController = new Product();
module.exports = productController;
