import express from 'express'

import * as ticketPurchaseController from '../controllers/ticketPurchaseController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isCustomer } from '../middlewares/isCustomer.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const ticketPurchaseRoutes = express.Router()

ticketPurchaseRoutes.post('/ticketpurchases', isAuth, isCustomer, ticketPurchaseController.createOneTicketPurchase)
ticketPurchaseRoutes.get('/ticketpurchases/me', isAuth, isCustomer, ticketPurchaseController.getMyTicketPurchases)
ticketPurchaseRoutes.get('/ticketpurchases', isAuth, isAdmin, ticketPurchaseController.getAllTicketPurchases)
ticketPurchaseRoutes.get('/ticketpurchases/:ticketpurchaseid', isAuth, isAdmin, ticketPurchaseController.getTicketPurchaseById)
ticketPurchaseRoutes.patch('/ticketpurchases/:ticketpurchaseid', isAuth, isAdmin, ticketPurchaseController.updateOneTicketPurchase)
ticketPurchaseRoutes.delete('/ticketpurchases/:ticketpurchaseid', isAuth, isAdmin, ticketPurchaseController.deleteOneTicketPurchase)

export default ticketPurchaseRoutes
