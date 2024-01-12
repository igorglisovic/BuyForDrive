import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  image: {
    type: String,
  },
  password: {
    type: String,
  },
})

export const User = models.User || model('User', UserSchema)
