import Flight from '../models/Flight.js'

const createFlight = async (req, res) => {
  try {
    const newFlight = await Flight.create(req.body)
    res.status(201).json(newFlight)
  } catch (error) {
    res.status(400).json({ message: `Error creating Flight: ${error}` })
  }
}

const findAllFlights = async (req, res) => {
  try {
    const allFlights = await Flight.find({ isActive: true })
    res.status(200).json(allFlights)
  } catch (error) {
    res.status(400).json({ message: `Error getting flights: ${error}` })
  }
}

const findFlightById = async (req, res) => {
  try {
    const flightById = await Flight.find({ _id: req.params.id, isActive: true })
    res.status(200).json(flightById)
  } catch (error) {
    res.status(400).json({ message: `Error getting flight ${error}` })
  }
}

const updateFlight = async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedFlight)
  } catch (error) {
    res.status(400).json({ message: `Error updating the flight ${error}` })
  }
}

const deleteFlightById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'No id provided in the route' })
  }

  if (req.query.destroy === 'true') {
    try {
      const deletedFlight = await Flight.findByIdAndDelete(req.params.id)
      if (deletedFlight === null) {
        return res.status(400).json({ message: 'Flight not found for delete' })
      }
      return res.status(204).json()
    } catch (error) {
      res.status(400).json({ message: `Error destroying flight ${error}` })
    }
  }

  try {
    const softDeletedFlight = await Flight.findByIdAndUpdate(req.params.id, { isActive: false }, { new: false })
    if (softDeletedFlight === null || softDeletedFlight.isActive === false) {
      return res.status(400).json({ message: 'Flight not found for softDelete' })
    }
    return res.status(204).json()
  } catch (error) {
    res.status(400).json({ message: `Error softDeleteing flight ${error}` })
  }
}

export {
  createFlight,
  findAllFlights,
  findFlightById,
  updateFlight,
  deleteFlightById
}
