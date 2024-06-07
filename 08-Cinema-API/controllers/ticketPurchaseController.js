import TicketPurchase from '../models/TicketPurchase.js'
import Movie from '../models/Movie.js'

const createOneTicketPurchase = async (req, res) => {
  const ticketPurchaseData = req.body

  if (Object.keys(ticketPurchaseData).length === 0) {
    return res.status(400).json({ error: 'Missing ticket purchase data' })
  }

  if (!ticketPurchaseData.movie) {
    return res.status(400).json({ error: 'Missing movie data' })
  }

  const userId = req.userId

  try {
    const movie = ticketPurchaseData.movie
    let movieFound = null

    if (typeof movie === 'object' && !Array.isArray(movie) && movie !== null) {
      movieFound = await Movie.findOne({ title: movie.title, director: movie.director, releaseDate: movie.releaseDate })
    } else {
      movieFound = await Movie.findOne({ _id: movie })
    }
    if (!movieFound) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    ticketPurchaseData.customer = userId
    ticketPurchaseData.movie = movieFound._id

    const ticketPurchase = await TicketPurchase.create(ticketPurchaseData)

    const populatedTicketPurchase = await TicketPurchase.findById(ticketPurchase._id)
      .populate('customer', 'name')
      .populate('movie', 'title')

    res.status(201).json(populatedTicketPurchase)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllTicketPurchases = async (req, res) => {
  try {
    const ticketPurchases = await TicketPurchase
      .find({ isActive: true })
      .populate('customer', 'name')
      .populate('movie', 'title')
    if (ticketPurchases.length === 0) {
      return res.status(404).json({ error: 'No ticket purchases found' })
    }
    res.status(200).json(ticketPurchases)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getTicketPurchaseById = async (req, res) => {
  const ticketPurchaseId = req.params.ticketpurchaseid
  if (!ticketPurchaseId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid ticket purchase ID' })
  }

  try {
    const ticketPurchase = await TicketPurchase
      .findOne({ _id: ticketPurchaseId, isActive: true })
      .populate('customer', 'name')
      .populate('movie', 'title')
    if (!ticketPurchase || ticketPurchase.isActive === false) {
      return res.status(404).json({ error: 'Ticket purchase not found' })
    }
    res.status(200).json(ticketPurchase)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getMyTicketPurchases = async (req, res) => {
  const userId = req.userId

  try {
    const ticketPurchases = await TicketPurchase
      .find({ customer: userId, isActive: true })
      .populate('customer', 'name')
      .populate('movie', 'title')
    if (ticketPurchases.length === 0) {
      return res.status(404).json({ error: 'No ticket purchases found' })
    }
    res.status(200).json(ticketPurchases)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateOneTicketPurchase = async (req, res) => {
  const ticketPurchaseId = req.params.ticketpurchaseid
  const ticketPurchaseData = req.body

  if (!ticketPurchaseId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid ticket purchase ID' })
  }

  if (Object.keys(ticketPurchaseData).length === 0) {
    return res.status(400).json({ error: 'Missing ticket purchase data' })
  }

  try {
    const ticketPurchase = await TicketPurchase
      .findByIdAndUpdate(ticketPurchaseId, req.body, { new: true })
      .populate('customer', 'name')
      .populate('movie', 'title')
    if (!ticketPurchase) {
      return res.status(404).json({ error: 'Ticket purchase not found' })
    }
    res.status(200).json(ticketPurchase)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteOneTicketPurchase = async (req, res) => {
  const ticketPurchaseId = req.params.ticketpurchaseid
  if (!ticketPurchaseId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid ticket purchsase ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const ticketPurchase = await TicketPurchase.findByIdAndDelete(ticketPurchaseId)
      if (!ticketPurchase) {
        return res.status(404).json({ error: "Could't delete: ticket purchase not found" })
      }
      return res.status(204).end()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const ticketPurchase = await TicketPurchase.findByIdAndUpdate(ticketPurchaseId, { isActive: false }, { new: false })
    if (!ticketPurchase || ticketPurchase.isActive === false) {
      return res.status(404).json({ error: "Couldn't delete: ticket purchase not found" })
    }
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createOneTicketPurchase,
  getAllTicketPurchases,
  getTicketPurchaseById,
  getMyTicketPurchases,
  updateOneTicketPurchase,
  deleteOneTicketPurchase
}
