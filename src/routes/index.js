const express = require('express')
const userRoutes = require('./user_routes');
const homeRoutes = require('./home_routes');
const admPainelRoutes = require('./admpainel_routes');
const api = express.Router()
api.use('/user', userRoutes)

const route = express.Router()
route.use('/api', api);
route.use('/', homeRoutes)
route.use('/admpainel', admPainelRoutes)
module.exports = route