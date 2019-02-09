const Router = require('express').Router(),
{register, login} = require('../controller/authController')

Router.post('/register', register)
Router.post('/login', login)

module.exports = Router