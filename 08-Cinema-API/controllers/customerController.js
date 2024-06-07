import User from '../models/User.js'

const getAllCustomers = async (req, res) => {
  const { name } = req.query
  const filter = { role: 'CUSTOMER', isActive: true }

  if (name) {
    const nameWithSpaces = name.replace(/-/g, ' ')
    filter.name = { $regex: nameWithSpaces, $options: 'i' }
  }

  try {
    const customers = await User.find(filter)
    if (customers.length === 0) {
      return res.status(404).json({ error: 'No customers found' })
    }
    res.status(200).json(customers)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getOneCustomer = async (req, res) => {
  const customerId = req.params.customerId
  if (!customerId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid customer id' })
  }

  try {
    const customer = await User.findOne({ _id: customerId, role: 'CUSTOMER', isActive: true })
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateOneCustomer = async (req, res) => {
  const customerId = req.params.customerId
  if (!customerId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid customer ID' })
  }

  try {
    const customer = await User.findOneAndUpdate({ _id: customerId, role: 'CUSTOMER' }, req.body, { new: true })
    if (!customer) {
      return res.status(404).json({ error: "Can't update customer, customer ID not found" })
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteOneCustomer = async (req, res) => {
  const customerId = req.params.customerId
  if (!customerId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid customer ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const customer = await User.findOneAndDelete({ _id: customerId, role: 'CUSTOMER' })
      if (!customer) {
        return res.status(404).json({ error: "Couldn't delete customer, customer ID not found" })
      }
      return res.status(204).end()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const customer = await User.findOneAndUpdate({ _id: customerId, role: 'CUSTOMER' }, { isActive: false }, { new: false })
    if (!customer || customer.isActive === false) {
      return res.status(404).json({ error: "Can't delete: customer ID not found" })
    }
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  getAllCustomers,
  getOneCustomer,
  updateOneCustomer,
  deleteOneCustomer
}
