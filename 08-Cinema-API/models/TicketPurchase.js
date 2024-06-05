import mongoose from 'mongoose'

const ticketPurchaseSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  quantity: { type: Number, required: true },
  ticketValue: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  time: { type: Date, required: true },
  theater: { type: Number, required: true, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
  seats: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

ticketPurchaseSchema.pre('validate', function (next) {
  this.totalValue = this.quantity * this.ticketValue
  next()
})

ticketPurchaseSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate()
  const docToUpdate = await this.model.findOne(this.getQuery())

  if (update.quantity !== undefined && update.ticketValue !== undefined) {
    update.totalValue = update.quantity * update.ticketValue
  } else if (update.quantity !== undefined) {
    update.totalValue = update.quantity * docToUpdate.ticketValue
  } else if (update.ticketValue !== undefined) {
    update.totalValue = update.ticketValue * docToUpdate.quantity
  }
  next()
})

const TicketPurchase = mongoose.model('TicketPurchase', ticketPurchaseSchema)

export default TicketPurchase
