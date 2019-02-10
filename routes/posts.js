const Router = require('express').Router()
const { create, update, index, show } = require('../controller/postController'),
  { ensureAuthenticated } = require('../config/auth')

Router.post('/create', ensureAuthenticated, create)
Router.get('/', ensureAuthenticated, index)
Router.get('/:slug', ensureAuthenticated, show)
Router.put('/:slug', ensureAuthenticated, update)

module.exports = Router
