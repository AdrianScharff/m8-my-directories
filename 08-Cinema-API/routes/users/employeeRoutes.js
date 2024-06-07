import express from 'express'
import * as employeeController from '../../controllers/employeeController.js'
import { isAuth } from '../../middlewares/isAuth.js'
import { isAdmin } from '../../middlewares/isAdmin.js'

const employeeRoutes = express.Router()

employeeRoutes.get('/employees', isAuth, isAdmin, employeeController.getAllEmployees)

export default employeeRoutes
