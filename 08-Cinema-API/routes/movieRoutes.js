import express from 'express'

import * as movieController from '../controllers/movieController.js'

const movieRoutes = express.Router()

movieRoutes.post('/movies', movieController.createMovie)
movieRoutes.get('/movies', movieController.getAllMovies)

export default movieRoutes
