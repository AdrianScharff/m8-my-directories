import Car from '../models/Car.js'

// Create
const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body)
    res.status(201).json(newCar)
  } catch (error) {
    res.status(400).json({ message: `Error creating Car: ${error}` })
  }
}

// Read
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ isActive: true })
    res.status(200).json(cars)
  } catch (error) {
    res.status(400).json({ message: `Error Getting Cars: ${error}` })
  }
}

const getCarById = async (req, res) => {
  try {
    const car = await Car.find({ _id: req.params.id, isActive: true })
    res.status(200).json(car)
  } catch (error) {
    res.status(400).json({ message: `Error Getting Car: ${error}` })
  }
}

// Update
const updateCarById = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedCar)
  } catch (error) {
    res.status(400).json({ message: `Error Updating Car: ${error}` })
  }
}

// Delete
const deleteCarById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Car ID is required' })
  }

  if (req.query.destroy === 'true') {
    try {
      const deletedCar = await Car.findByIdAndDelete(req.params.id)
      if (deletedCar === null) {
        return res.status(404).json({ message: 'Car Not Found For Delete' })
      }
      return res.status(204).json()
    } catch (error) {
      res.status(400).json({ message: `Error Deleting Car: ${error}` })
    }
  }

  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, { isActive: false }, { new: false })
    if (updatedCar === null || updatedCar.isActive === false) {
      return res.status(404).json({ message: 'Delete: Car Not Found' })
    }
    return res.status(204).json()
  } catch (error) {
    res.status(400).json({ message: `Error Deleting Car: ${error}` })
  }
}

export {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById
}
