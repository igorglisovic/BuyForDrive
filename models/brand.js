import { Schema, models, model } from 'mongoose'

const BrandSchema = new Schema({
  label: String,
})

export const Brand = models.Brand || model('Brand', BrandSchema)
