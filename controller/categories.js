// const { toTitleCase } = require("../config/function");
// const categoryModel = require("../models/categories");
// const fs = require("fs");
// const cloudinary = require('cloudinary').v2;

// class Category {
//   async getAllCategory(req, res) {
//     try {
//       let Categories = await categoryModel.find({}).sort({ _id: -1 });
//       if (Categories) {
//         return res.json({ Categories });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async postAddCategory(req, res) {
//     let { cName, cDescription, cStatus } = req.body;
//     let cImage = req.file;

//     if (!cName || !cDescription || !cStatus || !cImage) {
//       return res.json({ error: "All fields must be required" });
//     }

//     // Upload Image to Cloudinary
//     try {
//       const cloudinaryResult = await cloudinary.uploader.upload(cImage.path, {
//         folder: "categories",
//         use_filename: true,
//       });

//       cName = toTitleCase(cName);
      
//       let checkCategoryExists = await categoryModel.findOne({ cName });
//       if (checkCategoryExists) {
//         // If category exists, delete uploaded image from Cloudinary
//         await cloudinary.uploader.destroy(cloudinaryResult.public_id);
//         return res.json({ error: "Category already exists" });
//       }

//       let newCategory = new categoryModel({
//         cName,
//         cDescription,
//         cStatus,
//         cImage: {
//           public_id: cloudinaryResult.public_id,
//           url: cloudinaryResult.secure_url,
//         },
//       });

//       await newCategory.save();
//       return res.json({ success: "Category created successfully" });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Error while uploading image" });
//     }
//   }

//   async postEditCategory(req, res) {
//     let { cId, cDescription, cStatus } = req.body;

//     if (!cId || !cDescription || !cStatus) {
//       return res.json({ error: "All fields must be required" });
//     }

//     try {
//       let editCategory = await categoryModel.findByIdAndUpdate(cId, {
//         cDescription,
//         cStatus,
//         updatedAt: Date.now(),
//       });

//       if (editCategory) {
//         return res.json({ success: "Category updated successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async getDeleteCategory(req, res) {
//     let { cId } = req.body;

//     if (!cId) {
//       return res.json({ error: "All fields must be required" });
//     }

//     try {
//       let deletedCategory = await categoryModel.findByIdAndDelete(cId);
      
//       if (deletedCategory) {
//         // Delete the image from Cloudinary
//         await cloudinary.uploader.destroy(deletedCategory.cImage.public_id);

//         return res.json({ success: "Category deleted successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Error while deleting category" });
//     }
//   }
// }

// const categoryController = new Category();
// module.exports = categoryController;












const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    let cImage = req.file; // This is now the file uploaded to Cloudinary
    console.log(cName)
    
    if (!cName || !cDescription || !cStatus || !cImage) {
      return res.json({ error: "All fields must be required" });
    }

    try {
      // Upload Image to Cloudinary (file is already passed via Multer)
      const cloudinaryResult = await cloudinary.uploader.upload(cImage.path, {
        folder: "banex/categories",
        use_filename: true,
      });

      cName = toTitleCase(cName);

      let checkCategoryExists = await categoryModel.findOne({ cName });
      if (checkCategoryExists) {
        // If category exists, delete uploaded image from Cloudinary
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
        return res.json({ error: "Category already exists" });
      }

      let newCategory = new categoryModel({
        cName,
        cDescription,
        cStatus,
        cImage: {
          public_id: cloudinaryResult.public_id,
          url: cloudinaryResult.secure_url,
        },
      });

      await newCategory.save();
      return res.json({ success: "Category created successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error while uploading image" });
    }
  }

  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;

    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All fields must be required" });
    }

    try {
      let editCategory = await categoryModel.findByIdAndUpdate(cId, {
        cDescription,
        cStatus,
        updatedAt: Date.now(),
      });

      if (editCategory) {
        return res.json({ success: "Category updated successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getDeleteCategory(req, res) {
    let { cId } = req.body;

    if (!cId) {
      return res.json({ error: "All fields must be required" });
    }

    try {
      let deletedCategory = await categoryModel.findByIdAndDelete(cId);

      if (deletedCategory) {
        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(deletedCategory.cImage.public_id);

        return res.json({ success: "Category deleted successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error while deleting category" });
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
