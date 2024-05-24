import express from 'express'
import * as flightController from '../controllers/flightController.js'

const flightRoutes = express.Router()

flightRoutes.post('/flights', flightController.createFlight)
flightRoutes.get('/flights', flightController.findAllFlights)
flightRoutes.get('/flights/:id', flightController.findFlightById)
flightRoutes.patch('/flights/:id', flightController.updateFlight)
flightRoutes.delete('/flights/:id', flightController.deleteFlightById)

export default flightRoutes
