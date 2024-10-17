// const { toTitleCase } = require("../config/function");
// const categoryModel = require("../models/categories");
// const fs = require("fs");

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
//     let cImage = req.file.filename;
//     const filePath = `../server/public/uploads/categories/${cImage}`;

//     if (!cName || !cDescription || !cStatus || !cImage) {
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           console.log(err);
//         }
//         return res.json({ error: "All filled must be required" });
//       });
//     } else {
//       cName = toTitleCase(cName);
//       try {
//         let checkCategoryExists = await categoryModel.findOne({ cName: cName });
//         if (checkCategoryExists) {
//           fs.unlink(filePath, (err) => {
//             if (err) {
//               console.log(err);
//             }
//             return res.json({ error: "Category already exists" });
//           });
//         } else {
//           let newCategory = new categoryModel({
//             cName,
//             cDescription,
//             cStatus,
//             cImage,
//           });
//           await newCategory.save((err) => {
//             if (!err) {
//               return res.json({ success: "Category created successfully" });
//             }
//           });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   async postEditCategory(req, res) {
//     let { cId, cDescription, cStatus } = req.body;
//     if (!cId || !cDescription || !cStatus) {
//       return res.json({ error: "All filled must be required" });
//     }
//     try {
//       let editCategory = categoryModel.findByIdAndUpdate(cId, {
//         cDescription,
//         cStatus,
//         updatedAt: Date.now(),
//       });
//       let edit = await editCategory.exec();
//       if (edit) {
//         return res.json({ success: "Category edit successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async getDeleteCategory(req, res) {
//     let { cId } = req.body;
//     if (!cId) {
//       return res.json({ error: "All filled must be required" });
//     } else {
//       try {
//         let deletedCategoryFile = await categoryModel.findById(cId);
//         const filePath = `../server/public/uploads/categories/${deletedCategoryFile.cImage}`;

//         let deleteCategory = await categoryModel.findByIdAndDelete(cId);
//         if (deleteCategory) {
//           // Delete Image from uploads -> categories folder 
//           fs.unlink(filePath, (err) => {
//             if (err) {
//               console.log(err);
//             }
//             return res.json({ success: "Category deleted successfully" });
//           });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }
// }

// const categoryController = new Category();
// module.exports = categoryController;











const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;

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
    let cImage = req.file;

    if (!cName || !cDescription || !cStatus || !cImage) {
      return res.json({ error: "All fields must be required" });
    }

    // Upload Image to Cloudinary
    try {
      const cloudinaryResult = await cloudinary.uploader.upload(cImage.path, {
        folder: "categories",
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
