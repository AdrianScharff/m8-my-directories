import express from 'express'
import connect from './config/database.js'

import userRoutes from './routes/userRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import ticketPurchaseRoutes from './routes/ticketPurchaseRoutes.js'

const PORT = process.env.port || 3000

const app = express()

app.use(express.json())

// Routes
app.use('/api/v1', userRoutes)
app.use('/api/v1', movieRoutes)
app.use('/api/v1', ticketPurchaseRoutes)

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`)
  })
})
