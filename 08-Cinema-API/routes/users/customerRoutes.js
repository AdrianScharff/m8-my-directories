import express from 'express'
import * as customerController from '../../controllers/customerController.js'
import { isAuth } from '../../middlewares/isAuth.js'
import { isAdminOrEmployee } from '../../middlewares/isAdminOrEmployee.js'

const customerRoutes = express.Router()

customerRoutes.get('/customers', isAuth, isAdminOrEmployee, customerController.getAllCustomers)
customerRoutes.get('/users/:customerId', isAuth, isAdminOrEmployee, customerController.getOneCustomer)
customerRoutes.patch('/users/:customerId', isAuth, isAdminOrEmployee, customerController.updateOneCustomer)
customerRoutes.delete('/users/:customerId', isAuth, isAdminOrEmployee, customerController.deleteOneCustomer)

export default customerRoutes
