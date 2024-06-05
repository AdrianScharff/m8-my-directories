import express from 'express'

import * as ticketPurchaseController from '../controllers/ticketPurchaseController.js'

const ticketPurchaseRoutes = express.Router()

ticketPurchaseRoutes.post('/ticketpurchases', ticketPurchaseController.createOneTicketPurchase)
ticketPurchaseRoutes.get('/ticketpurchases', ticketPurchaseController.getAllTicketPurchases)
ticketPurchaseRoutes.get('/ticketpurchases/:ticketpurchaseid', ticketPurchaseController.getTicketPurchaseById)
ticketPurchaseRoutes.patch('/ticketpurchases/:ticketpurchaseid', ticketPurchaseController.updateOneTicketPurchase)
ticketPurchaseRoutes.delete('/ticketpurchases/:ticketpurchaseid', ticketPurchaseController.deleteOneTicketPurchase)

export default ticketPurchaseRoutes
