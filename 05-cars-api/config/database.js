import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connect = async () => {
  mongoose.connect(process.env.DB_CONNECT_URI) // Nos conectamos a la DB de MongoDB
  const { connection } = await mongoose // Traemos la conexion de mongoose para ver si hay errores

  connection.once('open', () => {
    console.log('Database connecion successful 🏍') // Si la conexion se abre, mostramos este mensaje
  })

  connection.on('error', (error) => {
    console.error('❌ Database connection error:', error) // Si hay un error, mostramos este mensaje
  })
}

export { connect }
