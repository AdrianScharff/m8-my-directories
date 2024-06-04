import mongoose from 'mongoose'

const ticketPurchaseSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  quantity: { type: Number, required: true },
  ticketValue: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  time: { type: Date, required: true },
  theater: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
  seats: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const TicketPurchase = mongoose.model('TicketPurchase', ticketPurchaseSchema)

export default TicketPurchase
