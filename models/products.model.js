const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/online-shop?directConnection=true';
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
});
const Product = mongoose.model('product', productSchema)

exports.getAllProducts = () => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
        }).then((products) => {
            mongoose.disconnect()
            resolve(products)
        }).catch((err) => {
            reject(err)
        })
    })



}