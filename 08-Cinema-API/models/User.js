import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: [8, 'Password must be at least 8 characters long'] },
  role: { type: String, enum: ['ADMIN', 'EMPLOYEE', 'CUSTOMER'], default: 'CUSTOMER' },
  userName: { type: String, required: true, unique: true },
  DNI: { type: Number, required: true, unique: true },
  birthDate: { type: Date, required: true },
  phoneNumber: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User
