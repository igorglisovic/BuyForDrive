import { Schema, models, model } from 'mongoose'

const OwnerSchema = new Schema({
  label: String,
})

export const Owner = models.Owner || model('Owner', OwnerSchema, 'owners')
