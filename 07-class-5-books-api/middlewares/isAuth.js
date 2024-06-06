import jwt from 'jwt-simple'

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(400).json({ message: 'Authorization header is missing' })
  }

  const { bearer, token } = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(400).json({ message: 'Authorization header format is Bearer {token}' })
  }

  if (!token) {
    return res.status(400).json({ message: 'Token not found' })
  }

  try {
    const payload = jwt.decode(token, process.env.SECRET)

    const now = Math.floor(Date.now() / 1000)

    if (payload.exp < now) {
      return res.status(401).json({ message: 'Token Expired' })
    }

    req.role = payload.role

    next()
  } catch (error) {
    return res.status(403).json({
      message: `Token error: ${error.message}` // 403 forbidden
    })
  }
}

export { isAuth }
