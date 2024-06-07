const isAdminOrEmployee = (req, res, next) => {
  if (req.role === 'ADMIN' || req.role === 'EMPLOYEE') {
    next()
  } else {
    res.status(403).json({ message: 'Unauthorized Role Access' })
  }
}

export { isAdminOrEmployee }
