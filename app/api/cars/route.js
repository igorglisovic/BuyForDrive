import { connectToDB } from '@utils/database'
import { Car } from '@models/car'

export const GET = async () => {
  try {
    await connectToDB()

    const cars = await Car.aggregate([
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

    // console.log(cars)

    return new Response(JSON.stringify(cars), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch all cars', { status: 500 })
  }
}
