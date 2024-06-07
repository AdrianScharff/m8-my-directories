import jwt from 'jwt-simple'

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(400).json({ message: 'Authorization header is missing' })
  }

  const [bearer, token] = authHeader.split(' ')

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
      return res.status(401).json({ message: 'Token Expired' }) // 401 Unauthorized
    }

    req.userId = payload.sub
    req.role = payload.role

    next()
  } catch (error) {
    return res.status(403).json({ // 403 Forbidden
      message: `Token error: ${error.message}`
    })
  }
}

export { isAuth }
