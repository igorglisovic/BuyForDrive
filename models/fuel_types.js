import { Schema, model, models } from 'mongoose'

const FuelTypeSchema = new Schema({
  label: String,
})

export const FuelType =
  models.FuelType || model('FuelType', FuelTypeSchema, 'fuel_types')
