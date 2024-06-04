import User from '../models/User.js'

const createUser = async (req, res) => {
  const userData = req.body

  if (Object.keys(userData).length === 0) {
    return res.status(400).json({ error: 'Missing user data' })
  }

  try {
    const newUser = await User.create(userData)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
    if (!users) {
      return res.status(404).json({ error: 'No users found' })
    }
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getOneUser = async (req, res) => {
  const userId = req.params.userId
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid user id' })
  }

  try {
    const user = await User.findOne({ _id: userId, isActive: true })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateOneUser = async (req, res) => {
  const userId = req.params.userId
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid user ID' })
  }

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ error: "Can't update user, user ID not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteOneUser = async (req, res) => {
  const userId = req.params.userId
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid user ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const user = await User.findByIdAndDelete(userId)
      if (!user) {
        return res.status(404).json({ error: "Couldn't delete user, user ID not found" })
      }
      return res.status(204).end()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: false })
    if (!user || user.isActive === false) {
      return res.status(404).json({ error: "Can't delete: user ID not found" })
    }
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser
}
