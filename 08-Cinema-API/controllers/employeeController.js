import User from '../models/User.js'

const getAllEmployees = async (req, res) => {
  const { name } = req.query
  const filter = { role: 'EMPLOYEE', isActive: true }

  if (name) {
    const nameWithSpaces = name.replace(/-/g, ' ')
    filter.name = { $regex: nameWithSpaces, $options: 'i' }
  }

  try {
    const employees = await User.find(filter)
    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' })
    }
    res.status(200).json(employees)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export { getAllEmployees }
