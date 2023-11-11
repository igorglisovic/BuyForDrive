import { Schema, model, models } from 'mongoose'

const MileagesSchema = new Schema({
  label: String,
})

export const Mileage =
  models.Mileage || model('Mileage', MileagesSchema, 'mileage')
