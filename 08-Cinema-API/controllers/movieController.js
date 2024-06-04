import Movie from '../models/Movie.js'

const createMovie = async (req, res) => {
  const movieData = req.body

  if (Object.keys(movieData).length === 0) {
    return res.status(400).json({ error: 'Missing movie data' })
  }

  try {
    const movie = await Movie.create(req.body)
    res.status(201).json(movie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true })
    if (!movies) {
      return res.status(404).json({ error: 'No movies found' })
    }
    res.status(200).json(movies)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createMovie,
  getAllMovies
}
