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
    const { name, releaseDate, rate, genre } = req.query
    const filter = { isActive: true }

    if (name) {
      const nameWitSpaces = name.replace(/-/g, ' ')
      filter.name = { $regex: nameWitSpaces, $options: 'i' }
    }
    if (releaseDate) {
      filter.releaseDate = releaseDate
    }
    if (rate) {
      filter.rate = rate
    }
    if (genre) {
      const genreWithSpaces = genre.replace(/-/g, ' ')
      filter.genre = { $regex: genreWithSpaces, $options: 'i' }
    }

    const movies = await Movie.find(filter)
    if (movies.length === 0) {
      return res.status(404).json({ error: 'No movies found' })
    }
    res.status(200).json(movies)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getOneMovie = async (req, res) => {
  const movieId = req.params.movieId
  if (!movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid movie ID' })
  }

  try {
    const movie = await Movie.findOne({ _id: movieId, isActive: true })
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateMovie = async (req, res) => {
  const movieId = req.params.movieId
  if (!movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid movie ID' })
  }

  try {
    const movie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true })
    if (!movie) {
      return res.status(404).json({ error: "Can't update: Movie not found" })
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteMovie = async (req, res) => {
  const movieId = req.params.movieId
  if (!movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid movie ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const movie = await Movie.findByIdAndDelete(movieId)
      if (!movie) {
        return res.status(404).json({ error: "Can't delete movie: Movie not found" })
      }
      return res.status(204).end()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const movie = await Movie.findByIdAndUpdate(movieId, { isActive: false }, { new: false })
    if (!movie || movie.isActive === false) {
      return res.status(404).json({ error: "Can't delete movie: Movie not found" })
    }
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createMovie,
  getAllMovies,
  getOneMovie,
  updateMovie,
  deleteMovie
}
