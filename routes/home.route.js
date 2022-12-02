const HomeController = require('../controllers/home.controller')

const Router = require('express').Router()

Router.get('/', HomeController.getHome)

module.exports = Router