import TicketPurchase from '../models/ticketPurchase'

const createOneTicketPurchase = async (req, res) => {
  if (Object.Keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Missing ticket purchase data' })
  }

  try {

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
