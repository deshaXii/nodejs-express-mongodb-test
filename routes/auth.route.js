const Router = require('express').Router()
const bodyParser = require('body-parser');

const AuthController = require('../controllers/auth.controller')

Router.get('/signup', AuthController.getSignup)

Router.post('/signup', bodyParser.urlencoded({
    extended: true
}), AuthController.postSignup)

Router.get('/login', AuthController.getLogin)
Router.post('/login', bodyParser.urlencoded({
    extended: true
}), AuthController.postLogin)


module.exports = Router