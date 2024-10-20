// const fs = require("fs");
// const categoryModel = require("../models/categories");
// const productModel = require("../models/products");
// const orderModel = require("../models/orders");
// const userModel = require("../models/users");
// const customizeModel = require("../models/customize");

// class Customize {
//   async getImages(req, res) {
//     try {
//       let Images = await customizeModel.find({});
//       if (Images) {
//         return res.json({ Images });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

 

//   // async uploadSlideImage(req, res) {
//   //   // The image has been uploaded to both the local disk and Cloudinary at this point
//   //   let cloudinaryUrl = req.cloudinaryUrl; // Cloudinary URL passed from the previous middleware

//   //   if (!cloudinaryUrl) {
//   //     return res.json({ error: "Image upload failed" });
//   //   }

//   //   try {
//   //     let newCustomize = new customizeModel({
//   //       slideImage: cloudinaryUrl, // Save the Cloudinary URL in the database
//   //     });

//   //     let save = await newCustomize.save();
//   //     if (save) {
//   //       return res.json({ success: "Image uploaded and saved successfully", url: cloudinaryUrl });
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //     return res.status(500).json({ error: "Error saving image to database" });
//   //   }
//   // }


//   // async uploadSlideImage(req, res) {

//   //   let cImage = req.file; // This is now the file uploaded to Cloudinary

//   //   console.log(cImage)
    
//   //   if (!cImage) {
//   //     return res.json({ error: "An image is required" });
//   //   }


//   //   try {

//   //     // Upload Image to Cloudinary (file is already passed via Multer)
//   //     const cloudinaryResult = await cloudinary.uploader.upload(cImage.path, {
//   //       folder: "customize",
//   //       use_filename: true,
//   //     });
//   //     console.log(cloudinaryResult)

      
//   //     let checkCustomizeExists = await customizeModel.findOne({ slideImage });
//   //     if (checkCustomizeExists) {
//   //       // If category exists, delete uploaded image from Cloudinary
//   //       await cloudinary.uploader.destroy(cloudinaryResult.public_id);
//   //       return res.json({ error: "Slide image already exists" });
//   //     }


//   //     if (!cloudinaryResult) {
//   //       return res.json({ error: "Image upload failed" });
//   //     }
  

//   //     let newCustomize = new customizeModel({
//   //       slideImage: cloudinaryResult.secure_url
//   //     });

//   //     let save = await newCustomize.save();
//   //     if (save) {
//   //       return res.json({ success: "Image uploaded and saved successfully", url: cloudinaryUrl.secure_url });
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //     return res.status(500).json({ error: "Error saving image to database" });
//   //   }













//   //   // let cloudinaryUrl = req.cloudinaryUrl; // Cloudinary URL passed from the uploadImage middleware

//   //   // if (!cloudinaryUrl) {
//   //   //   return res.json({ error: "Image upload failed" });
//   //   // }

//   //   // try {
//   //   //   let newCustomize = new customizeModel({
//   //   //     slideImage: cloudinaryUrl, // Save the Cloudinary URL in the database
//   //   //   });

//   //   //   let save = await newCustomize.save();
//   //   //   if (save) {
//   //   //     return res.json({ success: "Image uploaded and saved successfully", url: cloudinaryUrl });
//   //   //   }
//   //   // } catch (err) {
//   //   //   console.log(err);
//   //   //   return res.status(500).json({ error: "Error saving image to database" });
//   //   // }


































    
//   // }


//   async uploadSlideImage(req, res) {
//     console.log(req.file)
  
//     let cImage = req.file; // This is now the file uploaded to Cloudinary
//     console.log(cName)
    
//     if (!cImage) {
//       return res.json({ error: "An Image is required" });
//     }

//     try {
//       // Upload Image to Cloudinary (file is already passed via Multer)
//       const cloudinaryResult = await cloudinary.uploader.upload(cImage.path, {
//         folder: "banexx/customize",
//         use_filename: true,
//       });


//       // let checkCategoryExists = await categoryModel.findOne({ cName });
//       // if (checkCategoryExists) {
//       //   // If category exists, delete uploaded image from Cloudinary
//       //   await cloudinary.uploader.destroy(cloudinaryResult.public_id);
//       //   return res.json({ error: "Category already exists" });
//       // }


//         const newCustomize = new customizeModel({
//         slideImage: cloudinaryResult.secure_url,
//       });
  
//       const saved = await newCustomize.save();
//       if (saved) {
//         return res.json({ success: 'Image uploaded and saved successfully', url: cloudinaryResult.secure_url });
//       }

//     } catch (err) {
//         console.log(err);
//       return res.status(500).json({ error: 'Error saving image to database' });
//     }
//   }
  








//   // async deleteSlideImage(req, res) {
//   //   let { id } = req.body;
//   //   if (!id) {
//   //     return res.json({ error: "All field required" });
//   //   } else {
//   //     try {
//   //       let deletedSlideImage = await customizeModel.findById(id);
//   //       const filePath = `../server/public/uploads/customize/${deletedSlideImage.slideImage}`;

//   //       let deleteImage = await customizeModel.findByIdAndDelete(id);
//   //       if (deleteImage) {
//   //         // Delete Image from uploads -> customizes folder
//   //         fs.unlink(filePath, (err) => {
//   //           if (err) {
//   //             console.log(err);
//   //           }
//   //           return res.json({ success: "Image deleted successfully" });
//   //         });
//   //       }
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   }
//   // }


//   async deleteSlideImage(req, res) {
//     let { id } = req.body;
    
//     if (!id) {
//       return res.json({ error: "All fields are required" });
//     }

//     try {
//       // Find the image in the database
//       let deletedSlideImage = await customizeModel.findById(id);

//       if (!deletedSlideImage) {
//         return res.json({ error: "Image not found" });
//       }

//       const cloudinaryUrl = deletedSlideImage.slideImage;

//       // Extract the public_id from the Cloudinary URL
//       const public_id = cloudinaryUrl.split('/').slice(-1)[0].split('.')[0]; // Gets the image ID without extension

//       // Delete the image from Cloudinary using the public_id
//       await cloudinary.uploader.destroy(`customize/${public_id}`, (error, result) => {
//         if (error) {
//           console.error('Error deleting image from Cloudinary:', error);
//           return res.status(500).json({ error: "Error deleting image from Cloudinary" });
//         }
//       });

//       // Delete the image document from MongoDB
//       let deleteImage = await customizeModel.findByIdAndDelete(id);
//       if (deleteImage) {
//         return res.json({ success: "Image deleted successfully from both Cloudinary and database" });
//       } else {
//         return res.status(500).json({ error: "Error deleting image from database" });
//       }

//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Error deleting image" });
//     }
//   }

//   async getAllData(req, res) {
//     try {
//       let Categories = await categoryModel.find({}).count();
//       let Products = await productModel.find({}).count();
//       let Orders = await orderModel.find({}).count();
//       let Users = await userModel.find({}).count();
//       if (Categories && Products && Orders) {
//         return res.json({ Categories, Products, Orders, Users });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// const customizeController = new Customize();
// module.exports = customizeController;


































// const fs = require("fs");
// const categoryModel = require("../models/categories");
// const productModel = require("../models/products");
// const orderModel = require("../models/orders");
// const userModel = require("../models/users");
// const customizeModel = require("../models/customize");

// class Customize {
//   async getImages(req, res) {
//     try {
//       let Images = await customizeModel.find({});
//       if (Images) {
//         return res.json({ Images });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // async uploadSlideImage(req, res) {
//   //   let image = req.file.filename;
//   //   if (!image) {
//   //     return res.json({ error: "All field required" });
//   //   }
//   //   try {
//   //     console.log(`sadasdad ${image} sdadasdadsd`)
//   //     let newCustomzie = new customizeModel({
//   //       slideImage: image,
//   //     });
//   //     let save = await newCustomzie.save();
//   //     if (save) {
//   //       return res.json({ success: "Image upload successfully" });
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // }

//   async uploadSlideImage(req, res) {
//     // The image has been uploaded to both the local disk and Cloudinary at this point
//     let cloudinaryUrl = req.cloudinaryUrl; // Cloudinary URL passed from the previous middleware

//     if (!cloudinaryUrl) {
//       return res.json({ error: "Image upload failed" });
//     }

//     try {
//       let newCustomize = new customizeModel({
//         slideImage: cloudinaryUrl, // Save the Cloudinary URL in the database
//       });

//       let save = await newCustomize.save();
//       if (save) {
//         return res.json({ success: "Image uploaded and saved successfully", url: cloudinaryUrl });
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Error saving image to database" });
//     }
//   }

//   async deleteSlideImage(req, res) {
//     let { id } = req.body;
//     if (!id) {
//       return res.json({ error: "All field required" });
//     } else {
//       try {
//         let deletedSlideImage = await customizeModel.findById(id);
//         const filePath = `../server/public/uploads/customize/${deletedSlideImage.slideImage}`;

//         let deleteImage = await customizeModel.findByIdAndDelete(id);
//         if (deleteImage) {
//           // Delete Image from uploads -> customizes folder
//           fs.unlink(filePath, (err) => {
//             if (err) {
//               console.log(err);
//             }
//             return res.json({ success: "Image deleted successfully" });
//           });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   async getAllData(req, res) {
//     try {
//       let Categories = await categoryModel.find({}).count();
//       let Products = await productModel.find({}).count();
//       let Orders = await orderModel.find({}).count();
//       let Users = await userModel.find({}).count();
//       if (Categories && Products && Orders) {
//         return res.json({ Categories, Products, Orders, Users });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// const customizeController = new Customize();
// module.exports = customizeController;



























const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const customizeModel = require("../models/customize");
const cloudinary = require("cloudinary").v2;

class Customize {
  async getImages(req, res) {
    try {
      let Images = await customizeModel.find({});
      if (Images) {
        return res.json({ Images });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uploadSlideImage(req, res) {
    // At this point, Multer has uploaded the image to Cloudinary
    let cloudinaryResult = req.file; // This contains the Cloudinary upload result

    if (!cloudinaryResult || !cloudinaryResult.path) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    try {
      let newCustomize = new customizeModel({
        slideImage: cloudinaryResult.path, // Save the Cloudinary URL in the database
      });

      let save = await newCustomize.save();
      if (save) {
        return res.json({
          success: "Image uploaded and saved successfully",
          url: cloudinaryResult.path,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error saving image to database" });
    }
  }

  async deleteSlideImage(req, res) {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "All field required" });
    } else {
      try {
        let deletedSlideImage = await customizeModel.findById(id);

        if (!deletedSlideImage) {
          return res.status(404).json({ error: "Slide image not found" });
        }

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(deletedSlideImage.slideImage);

        // Delete the image record from the database
        let deleteImage = await customizeModel.findByIdAndDelete(id);

        if (deleteImage) {
          return res.json({ success: "Image deleted successfully" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error while deleting slide image" });
      }
    }
  }

  async getAllData(req, res) {
    try {
      let Categories = await categoryModel.find({}).count();
      let Products = await productModel.find({}).count();
      let Orders = await orderModel.find({}).count();
      let Users = await userModel.find({}).count();
      if (Categories && Products && Orders) {
        return res.json({ Categories, Products, Orders, Users });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const customizeController = new Customize();
module.exports = customizeController;
