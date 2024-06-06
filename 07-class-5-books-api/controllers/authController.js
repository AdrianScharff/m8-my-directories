import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

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

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'email or password are missing' })
  }

  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(401).json({ message: 'email or password incorrect' })
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'email or password incorrect' })
    }

    const payload = {
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + (7 * 24 * 60 * 60))
    }

    const token = jwt.encode(payload, process.env.SECRET)

    return res.json({
      message: 'Login successfully',
      token
    })
  } catch (error) {
    res.status(500).json({ message: `Login error: ${error}` })
  }
}

export { register, login }
