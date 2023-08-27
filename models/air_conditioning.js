import { Schema, models, model } from 'mongoose'

const AirConditioningSchema = new Schema({
  label: String,
})

export const AirConditioning =
  models.AirConditioning ||
  model('AirConditioning', AirConditioningSchema, 'air_conditioning')
