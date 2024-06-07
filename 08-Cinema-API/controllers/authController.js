import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

const register = async (req, res) => {
  const userData = req.body

  if (!userData.name || !userData.lastName || !userData.email || !userData.password ||
    !userData.userName || !userData.DNI || !userData.birthDate || !userData.phoneNumber) {
    return res.status(400).json({ message: 'Missing data: name, userName, email, password, userName, DNI, birthDate and phoneNumber are required' })
  }

  const saltRounds = 10

  try {
    const newPassword = await bcrypt.hash(userData.password, saltRounds)
    userData.password = newPassword

    const newUser = await User.create(userData)

    userData.password = undefined

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser
    })
  } catch (error) {
    res.status(500).json({ message: `error creating user ${error}` })
  }
}

const login = async (req, res) => {
  const userData = req.body
  if (!userData.email || !userData.password) {
    return res.status(400).json({ message: 'email or password are missing' })
  }

  try {
    const user = await User.findOne({ email: userData.email })

    if (!user) {
      return res.status(401).json({ message: 'email or password incorrect' })
    }

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'email or password incorrect' })
    }

    const payload = {
      sub: user._id,
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
