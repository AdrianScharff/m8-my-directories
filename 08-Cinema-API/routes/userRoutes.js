import express from 'express'
import * as userController from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/users', userController.createUser)
userRoutes.get('/users', userController.getAllUsers)
userRoutes.get('/users/:userId', userController.getOneUser)
userRoutes.patch('/users/:userId', userController.updateOneUser)
userRoutes.delete('/users/:userId', userController.deleteOneUser)

export default userRoutes
