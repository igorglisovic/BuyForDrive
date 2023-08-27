import { Schema, model, models } from 'mongoose'

const SeatSchema = new Schema({
  label: String,
})

export const Seat = models.Seat || model('Seat', SeatSchema, 'seats')
