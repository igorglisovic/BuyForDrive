import { Schema, model, models } from 'mongoose'

const PricesSchema = new Schema({
  label: String,
})

export const Price = models.Price || model('Price', PricesSchema, 'price')
