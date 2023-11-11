import { Schema, model, models } from 'mongoose'

const PowersSchema = new Schema({
  label: String,
})

export const Power = models.Power || model('Power', PowersSchema, 'powers')
