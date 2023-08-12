import { Schema, models, model } from 'mongoose'

const PriceSchema = new Schema({
  price: {
    type: Number,
  },
})

export const Price = models.Price || model('Price', PriceSchema)
