import { Schema, model, models } from 'mongoose'

const RegYearsSchema = new Schema({
  label: String,
})

export const RegYears =
  models.RegYears || model('RegYears', RegYearsSchema, 'reg_years')
