import { Car } from '@models/car'
import { connectToDB } from '@utils/database'
import mongoose from 'mongoose'

export const GET = async (req, { params }) => {
  const creatorId =
    params.creatorId && new mongoose.Types.ObjectId(params.creatorId)

  try {
    await connectToDB()

    const cars = await Car.aggregate([
      {
        $match: {
          creator: creatorId,
        },
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand_id',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $unwind: '$brand',
      },

      {
        $lookup: {
          from: 'models',
          localField: 'model_id',
          foreignField: '_id',
          as: 'model',
        },
      },
      {
        $unwind: '$model',
      },
      {
        $lookup: {
          from: 'reg_years',
          localField: 'reg_year_id',
          foreignField: '_id',
          as: 'reg_year',
        },
      },
      {
        $unwind: '$reg_year',
      },
      {
        $lookup: {
          from: 'fuel_types',
          localField: 'fuel_type_id',
          foreignField: '_id',
          as: 'fuel_type',
        },
      },
      {
        $unwind: '$fuel_type',
      },
      {
        $lookup: {
          from: 'body_type',
          localField: 'body_type_id',
          foreignField: '_id',
          as: 'body_type',
        },
      },
      {
        $unwind: '$body_type',
      },
      {
        $lookup: {
          from: 'transmission_types',
          localField: 'transmission_type_id',
          foreignField: '_id',
          as: 'transmission_type',
        },
      },
      {
        $unwind: '$transmission_type',
      },
      {
        $lookup: {
          from: 'doors',
          localField: 'doors_id',
          foreignField: '_id',
          as: 'doors',
        },
      },
      {
        $unwind: '$doors',
      },
    ])

    return new Response(JSON.stringify(cars), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch cars by creator', { status: 500 })
  }
}
