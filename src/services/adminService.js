const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')



const addCategoryService = ({ name }) => {
    return new Promise( async (resolve, reject) => {
        try {
            const newCategory = await Category.create({name: name})
            if (newCategory) {
                resolve({ status: 'success' })
            }
        } catch (error) {
            reject({ status: 'error', message: error })
        }
    })
}

const updateCategoryService = ( id, name ) => {
    return new Promise( async (resolve, reject) => {
        try {
            const updateCategory = await Category.findByIdAndUpdate(id, {name: name}, { new: true })
            if (updateCategory) {
                resolve({ status: 'success', data: updateCategory })
            }
        } catch (error) {
            reject({ status: 'error', message: error })
        }
    })
} 



const addProductService = ({name, description, image, price, id_category}) => {
    return new Promise( async (resolve, reject) => {
        try {
            upload(req, res, function(err) {
                console.log('abc')
            })
        } catch (error) {
            reject({status: 'error', message: 'loi ben service'})
        }
    })
}

module.exports = {
    addCategoryService,
    updateCategoryService,
    addProductService
}