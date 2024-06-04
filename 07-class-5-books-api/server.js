import { connect } from './config/database.js'
import express from 'express'
import morgan from 'morgan'
import bookRoutes from './routes/bookRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
morgan.token('host', (req) => req.hostname)
morgan.token('param', (req, res, param) => req.params ? req.params[param] : null)

app.use(morgan(':host :method :url :status :param[id] - :response-time ms - :date - :body'))

// Routes
app.use('/api/v1/books', bookRoutes)

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 💨`)
  })
})
