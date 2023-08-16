import { Schema, models, model } from 'mongoose'

const BodyTypeSchema = new Schema({
  label: String,
})

export const BodyType =
  models.BodyType || model('BodyType', BodyTypeSchema, 'body_type')
