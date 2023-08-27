import { Schema, models, model } from 'mongoose'

const DrivetrainSchema = new Schema({
  label: String,
})

export const Drivetrain =
  models.Drivetrain || model('Drivetrain', DrivetrainSchema, 'drivetrain')
