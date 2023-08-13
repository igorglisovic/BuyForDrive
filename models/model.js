import { Schema, models, model } from 'mongoose'
import mongoose from 'mongoose'

const ModelSchema = new Schema({
  label: String,
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
})

export const Model = models.Model || model('Model', ModelSchema)
