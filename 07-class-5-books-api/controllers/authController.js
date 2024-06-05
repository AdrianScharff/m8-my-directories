import User from '../models/User.js'
import bcrypt from 'bcrypt'

const register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'email or password are missing' })
    }

    const saltRounds = 10

    const newPassword = await bcrypt.hash(req.body.password, saltRounds)

    req.body.password = newPassword

    const newUser = await User.create(req.body)

    newUser.password = undefined

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    res.status(500).json({ message: `error creating user: ${error}` })
  }
}

export { register }
