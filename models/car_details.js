import { Schema, models, model } from 'mongoose'
import mongoose from 'mongoose'

const CarDetailsSchema = new Schema({
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  model_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
  },
})

export const CarDetails =
  models.CarDetails || model('CarDetails', CarDetailsSchema)
