const isCustomer = (req, res, next) => {
  if (req.role === 'CUSTOMER') {
    next()
  } else {
    res.status(403).json({ message: 'Unauthorized Role Access' })
  }
}

export { isCustomer }
