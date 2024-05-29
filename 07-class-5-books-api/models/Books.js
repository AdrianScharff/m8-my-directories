import mongoose from 'mongoose'

const genreEnum = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Horror', 'Biography', 'Memoir', 'Self-Help', 'Cookbook', 'Poetry', 'History', 'Science', 'Art', 'Travel', 'Guide', 'Children', 'Young Adult', 'Other', 'Technical']

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  genre: { type: String, required: true, enum: genreEnum },
  publishedDate: { type: Date }, // YYYY-MM-DD
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true } // ObjectId es un tipo de dato utilizado para identificar documentos en MongoDB
  ],
  publisher: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  isbn: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema)

export default Book
