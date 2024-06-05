import TicketPurchase from '../models/TicketPurchase.js'
import User from '../models/User.js'
import Movie from '../models/Movie.js'

const createOneTicketPurchase = async (req, res) => {
  const ticketPurchaseData = req.body

  if (Object.keys(ticketPurchaseData).length === 0) {
    return res.status(400).json({ error: 'Missing ticket purchase data' })
  }

  if (!ticketPurchaseData.customer) {
    return res.status(400).json({ error: 'Missing customer data' })
  }

  if (!ticketPurchaseData.movie) {
    return res.status(400).json({ error: 'Missing movie data' })
  }

  try {
    const customer = ticketPurchaseData.customer
    const movie = ticketPurchaseData.movie
    if (typeof customer === 'object' && !Array.isArray(customer) && customer !== null) {
      const foundCustomer = await User.findOne({ name: customer.name, lastName: customer.lastName, DNI: customer.DNI })
      if (!foundCustomer) {
        const newCustomer = new User(customer)
        const createdCustomer = await User.create(newCustomer)
        ticketPurchaseData.customer = createdCustomer._id
      } else {
        ticketPurchaseData.customer = foundCustomer._id
      }
    }

    if (typeof movie === 'object' && !Array.isArray(movie) && movie !== null) {
      const foundMovie = await Movie.findOne({ name: movie.name, director: movie.director, releaseDate: movie.releaseDate })
      if (!foundMovie) {
        const newMovie = new Movie(movie)
        const createdMovie = await Movie.create(newMovie)
        ticketPurchaseData.movie = createdMovie._id
      } else {
        ticketPurchaseData.movie = foundMovie._id
      }
    }

    const ticketPurchase = await TicketPurchase.create(ticketPurchaseData)
    res.status(201).json(ticketPurchase)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllTicketPurchases = async (req, res) => {
  try {
    const ticketPurchases = await TicketPurchase
      .find({ isActive: true })
      .populate('customer', 'name')
      .populate('movie', 'name')
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
      .populate('movie', 'name')
    if (!ticketPurchase || ticketPurchase.isActive === false) {
      return res.status(404).json({ error: 'Ticket purchase not found' })
    }
    res.status(200).json(ticketPurchase)
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
      .populate('movie', 'name')
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
  updateOneTicketPurchase,
  deleteOneTicketPurchase
}
