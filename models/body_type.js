import { Schema, models, model } from 'mongoose'

const BodySchema = new Schema({
  body_type: {
    type: String,
  },
})

export const BodyType = models.BodyType || model('BodyType', BodySchema)
