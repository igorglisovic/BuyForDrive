import { Schema, models, model } from 'mongoose'

const CarSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
  },
  price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Price',
  },
})

export const Car = models.Car || model('Car', CarSchema)
