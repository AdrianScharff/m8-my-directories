import mongoose from 'mongoose'

const movieSchema = mongoose.Schema({
  name: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: Date },
  rate: { type: Number },
  duration: { type: String, required: true },
  genre: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
