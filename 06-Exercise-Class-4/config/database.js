import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connect = async () => {
  mongoose.connect(process.env.DB_CONNECT_URI)
  const { connection } = await mongoose

  connection.once('open', () => {
    console.log('Database connection successful 🎇')
  })

  connection.on('error', (error) => {
    console.error('❌ Database connection error:', error)
  })
}

export { connect }
