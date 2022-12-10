const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const multer = require('multer');
const appRoot = require('app-root-path')
const path = require('path')

const Product = require('../models/productModel')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/uploads/')
    },
    fileFilter: async (req, file, cb) => {
        if (file.mimetype != 'image/png') {
            cb(new Error('goes wrong on the mimetype!'), false);
        }
        cb(null, true);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

// 'profile_pic' is the name of our file input field in the HTML form
let upload = multer({ storage: storage, fileFilter: fileFilter });

//  Router get
router.get('/create-product', adminController.getAddProductPage)


// Router post
router.post('/create-category', adminController.addCategoryController)
router.post('/create-product', upload.single('image'), adminController.addProductController)

// Router put
router.put('/update-category/:id', adminController.updateCategoryController)

// Router delete

module.exports = router