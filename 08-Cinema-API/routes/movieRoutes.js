import express from 'express'

import * as movieController from '../controllers/movieController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const movieRoutes = express.Router()

movieRoutes.post('/movies', isAuth, isAdmin, movieController.createMovie)
movieRoutes.get('/movies', movieController.getAllMovies)
movieRoutes.get('/movies/:movieId', movieController.getOneMovie)
movieRoutes.patch('/movies/:movieId', isAuth, isAdmin, movieController.updateMovie)
movieRoutes.delete('/movies/:movieId', isAuth, isAdmin, movieController.deleteMovie)

export default movieRoutes
