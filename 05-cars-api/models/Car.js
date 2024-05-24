import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
  // Campo: tipo de dato   //   Campo: { tipo_de_dato, restricciones }
  plate: { type: String, required: true, unique: true }, // No. de placa
  year: { type: Number, required: true }, // Ano de fabricacion
  model: { type: String, required: true },
  brand: { type: String, required: true },
  version: String,
  color: {
    type: String,
    required: true,
    enum: ['red', 'blue', 'black', 'white', 'silver', 'gray', 'green', 'yellow', 'orange', 'brown', 'purple', 'pink']
  },
  carType: {
    type: String,
    required: true,
    enum: ['sedan', 'hatchback', 'suv', 'coupe', 'convertible', 'pickup', 'van', 'minivan', 'truck', 'bus', 'electric', 'hybrid', 'crossover', 'luxury', 'sport', 'classic', 'other']
  },
  vin: {
    type: String,
    required: true,
    unique: true
  },
  newCar: {
    type: Boolean,
    required: true
  },
  isActive: { type: Boolean, default: true }
})

const Car = mongoose.model('Car', carSchema)

export default Car
