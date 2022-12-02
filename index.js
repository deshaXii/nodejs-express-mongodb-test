const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route')

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

const STORE = new SessionStore({
    uri: 'mongodb://127.0.0.1:27017/online-shop',
    collection: 'sessions'
})
app.use(session({
    secret: 'this1123ism123ysecre123tkey234dafm21321m1233ls1231',
    saveUninitialized: false,
    store: STORE,
    resave: true
    // cookie: {
    //     maxAge: 1 * 60 * 60 * 100,
    //     // expires: new Date()
    // }
}))


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/', authRouter)

app.listen('3000', () => {
    console.log('app running');
})