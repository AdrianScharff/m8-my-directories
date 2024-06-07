import express from 'express'

import * as movieController from '../controllers/movieController.js'
import { isAuth } from '../middlewares/isAuth.js'

const movieRoutes = express.Router()

movieRoutes.post('/movies', movieController.createMovie)
movieRoutes.get('/movies', isAuth, movieController.getAllMovies)
movieRoutes.get('/movies/:movieId', isAuth, movieController.getOneMovie)
movieRoutes.patch('/movies/:movieId', movieController.updateMovie)
movieRoutes.delete('/movies/:movieId', movieController.deleteMovie)

export default movieRoutes
