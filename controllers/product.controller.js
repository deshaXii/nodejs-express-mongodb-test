const ProductsModel = require('../models/products.model')

exports.getProduct = (req, res, next) => {
    // get Id
    let id = req.params.id;
    // get Product
    ProductsModel.getProductById(id).then((product) => {
        console.log(product);
        res.render('product', {
            product
        })
    })
    //render
}