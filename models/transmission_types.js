import { Schema, model, models } from 'mongoose'

const TransmissionTypes = new Schema({
  label: String,
})

export const TransmissionType =
  models.TransmissionType ||
  model('TransmissionType', TransmissionTypes, 'transmission_types')
