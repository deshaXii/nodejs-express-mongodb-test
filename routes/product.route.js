const ProductController = require('../controllers/product.controller')

const Router = require('express').Router()
Router.get('/:id', ProductController.getProduct)

module.exports = Router