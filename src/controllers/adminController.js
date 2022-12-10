const adminService = require('../services/adminService')
const multer = require('multer');
const Product = require('../models/productModel')
const fs = require('fs')
const appRoot = require('app-root-path')

const getAddProductPage = (req, res) => {
    return res.render('AddProduct.ejs', { status: null, data: null, Error: null})
}

const addCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.json({ status: 'error', message: 'Bạn phải nhập đầy đủ thông tin!' })
        }
        const response = await adminService.addCategoryService({ name }) 
        if (response) {
            return res.json({ status: 'success', data: response })
        }
    } catch (error) {
        return res.json({status: 'error', data: error})
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id
        const { name } = req.body
        if (!categoryId) {
            return res.json({status: 'error', message: 'Không tồn tại danh mục này'})
        }
        if (!name) {
            return res.json({status: 'error', message: 'Bạn phải nhập đầy đủ thông tin'})
        }
        const response = await adminService.updateCategoryService(categoryId, name)
        if (response) {
            return res.json({ response })
        }
    } catch (error) {
        return res.json({status: 'error', data: error})
    }
}

const addProductController = (req, res) => {
    const { name, description, price, id_category } = req.body;
    const image = req.file.filename;
    const newProduct = new Product({
        name: name,
        description: description,
        image: image,
        price: price,
        id_category: id_category
    })
    newProduct.save()
    .then((data) => {return res.json({status: 'success', data: data})})
    .catch((err) => {return res.json({status: 'error', message: err})})
}

module.exports = {
    getAddProductPage,
    addCategoryController,
    updateCategoryController,
    addProductController
}