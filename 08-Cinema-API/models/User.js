import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  DNI: { type: Number, required: true, unique: true },
  birthDate: { type: Date, required: true },
  role: { type: String, enum: ['ADMIN', 'EMPLOYEE', 'CUSTOMER'], default: 'CUSTOMER' },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: [8, 'Password must be at least 8 characters long'] },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User
