import { Schema, models, model } from 'mongoose'

const DoorSchema = new Schema({
  label: String,
})

export const Door = models.Door || model('Door', DoorSchema, 'doors')
