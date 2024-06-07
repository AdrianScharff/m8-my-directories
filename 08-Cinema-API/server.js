import express from 'express'
import connect from './config/database.js'

import authRoutes from './routes/users/authRoutes.js'
import customerRoutes from './routes/users/customerRoutes.js'
import employeeRoutes from './routes/users/employeeRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import ticketPurchaseRoutes from './routes/ticketPurchaseRoutes.js'

const PORT = process.env.port || 3000

const app = express()

app.use(express.json())

// Routes
app.use('/api/v1', authRoutes)
app.use('/api/v1', customerRoutes)
app.use('/api/v1', employeeRoutes)
app.use('/api/v1', movieRoutes)
app.use('/api/v1', ticketPurchaseRoutes)

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`)
  })
})
