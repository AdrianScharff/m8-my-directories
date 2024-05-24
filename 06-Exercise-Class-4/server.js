import express from 'express'
import { connect } from './config/database.js'
import flightRoutes from './routes/flightRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

// Routes
app.use('/api/v1', flightRoutes)

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ⚽`)
  })
})
