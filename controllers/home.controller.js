const ProductsModel = require('../models/products.model')

exports.getHome = (req, res, next) => {
    ProductsModel.getAllProducts().then(products => {
        res.render('index', {
            products
        })
    })

    // render to homepage
}