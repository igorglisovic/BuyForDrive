import { connectToDB } from '@utils/database'
import { Car } from '@models/car'

export const GET = async () => {
  const page = 1
  const limit = 15
  const pipeline = []

  try {
    await connectToDB()

    pipeline.push(
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
      }
    )

    // const skip = (+page - 1) * +limit

    // pipeline.push({
    //   $skip: +skip,
    // })

    // pipeline.push({ $limit: +limit })
    pipeline.push({ $sample: { size: +limit } })

    const cars = await Car.aggregate(pipeline)

    return new Response(JSON.stringify(cars), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch all cars', { status: 500 })
  }
}
