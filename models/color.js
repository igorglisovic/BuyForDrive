import { Schema, models, model } from 'mongoose'

const ColorSchema = new Schema({
  label: String,
})

export const Color = models.Color || model('Color', ColorSchema, 'colors')
