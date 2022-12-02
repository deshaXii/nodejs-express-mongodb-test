const ProductsModel = require('../models/products.model')

exports.getHome = (req, res, next) => {
    const categories = ['clothes', 'computers', 'phones'];
    let category = req.query.category;
    if (category && categories.includes(category)) {
        ProductsModel.getProductsByCategory(category).then(products => {
            res.render('index', {
                products
            })
        })
    } else {
        ProductsModel.getAllProducts().then(products => {
            res.render('index', {
                products
            })
        })
    }
}