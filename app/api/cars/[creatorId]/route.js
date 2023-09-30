import { Car } from '@models/car'
import { connectToDB } from '@utils/database'
import mongoose from 'mongoose'

export const GET = async (req, { params }) => {
  const creatorId =
    params.creatorId && new mongoose.Types.ObjectId(params.creatorId)

  console.log('creatorId>> ', creatorId)

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
          as: 'brand_id',
        },
      },
      {
        $unwind: '$brand_id',
      },

      {
        $lookup: {
          from: 'models',
          localField: 'model_id',
          foreignField: '_id',
          as: 'model_id',
        },
      },
      {
        $unwind: '$model_id',
      },
      {
        $lookup: {
          from: 'reg_years',
          localField: 'reg_year_id',
          foreignField: '_id',
          as: 'reg_year_id',
        },
      },
      {
        $unwind: '$reg_year_id',
      },
    ])

    return new Response(JSON.stringify(cars), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch cars by creator', { status: 500 })
  }
}
