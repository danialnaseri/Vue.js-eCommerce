const route = require('express').Router()
const productModel = require('../models/product/Product')

route.post('/import', productModel.addProducts)
route.get('/', productModel.getProducts)
route.get('/:id', productModel.getProductById)


module.exports = route

