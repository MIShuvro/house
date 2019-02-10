const Router = require('express').Router()
const { create, update, index } = require('../controller/postController')

Router.post('/create', create)
Router.get('/', index)
Router.put('/:slug', update)

module.exports = Router
