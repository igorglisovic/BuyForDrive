import { Schema, models, model } from 'mongoose'

const ModelSchema = new Schema({
  model: {
    type: String,
  },
})

export const Model = models.Model || model('Model', ModelSchema)
