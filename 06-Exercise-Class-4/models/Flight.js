import mongoose from 'mongoose'

const flightSchema = new mongoose.Schema({
  flight_number: { type: Number, required: true, unique: true },
  destination: { type: String, required: true },
  plane_code: { type: Number, required: true },
  departure_time: { type: Date, required: true },
  flight_status: { type: String, required: true, enum: ['ON TIME', 'DELAY', 'TAKEOFFING', 'CANCELLED'] },
  airline: { type: String, required: true },
  boarding_gate: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, { collection: 'flights' })

const Flight = mongoose.model('Flight', flightSchema)

export default Flight
