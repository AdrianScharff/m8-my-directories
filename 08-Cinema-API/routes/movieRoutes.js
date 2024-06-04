import express from 'express'

import * as movieController from '../controllers/movieController.js'

const movieRoutes = express.Router()

movieRoutes.post('/movies', movieController.createMovie)
movieRoutes.get('/movies', movieController.getAllMovies)
movieRoutes.get('/movies/:movieId', movieController.getOneMovie)
movieRoutes.patch('/movies/:movieId', movieController.updateMovie)
movieRoutes.delete('/movies/:movieId', movieController.deleteMovie)

export default movieRoutes
