import { Schema, model, models } from 'mongoose'

const RegMonthSchemna = new Schema({
  label: String,
})

export const RegMonth =
  models.RegMonth || model('RegMonth', RegMonthSchemna, 'reg_months')
