import { Schema, models, model } from 'mongoose'
import mongoose from 'mongoose'

const CarSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  model_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
  },
  reg_year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegYears',
  },
  reg_month_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegMonths',
  },
  mileage: String,
  doors_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doors',
  },
  body_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BodyType',
  },
  fuel_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FuelType',
  },
  transmission_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TransmissionType',
  },
  power: {
    hp: String,
    kw: String,
  },
  displacement: String,
  seats_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat',
  },
  steering_side: String,
  drivetrain_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drivetrain',
  },
  color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color',
  },
  air_conditioning_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AirConditioning',
  },
  price: String,
  fixed_price: Boolean,
  owners_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
  },
  description: String,
  images: [
    {
      public_id: String,
      version: String,
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

export const Car = models.Car || model('Car', CarSchema, 'cars')
