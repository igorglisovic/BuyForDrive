import { connectToDB } from '@utils/database'
import { Car } from '@models/car'
import mongoose from 'mongoose'

export const GET = async (req, { params }) => {
  const brandId =
    req.nextUrl.searchParams.get('brandId') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('brandId'))
  const modelId =
    req.nextUrl.searchParams.get('modelId') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('modelId'))
  const yearFrom = req.nextUrl.searchParams.get('yearFrom')
  const yearTo = req.nextUrl.searchParams.get('yearTo')
  // const yearFrom =
  //   req.nextUrl.searchParams.get('yearFrom') &&
  //   new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('yearFrom'))
  // const yearTo =
  //   req.nextUrl.searchParams.get('yearTo') &&
  //   new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('yearTo'))

  console.log('brandId >>>> ', brandId)
  console.log('yearFrom >>>> ', yearFrom)
  console.log('yearTo >>>> ', yearTo)

  try {
    await connectToDB()

    const pipeline = []
    if (brandId) {
      pipeline.push({
        $match: {
          brand_id: brandId,
        },
      })
    }

    if (modelId) {
      pipeline.push({
        $match: {
          model_id: modelId,
        },
      })
    }

    pipeline.push(
      {
        $lookup: {
          from: 'brands',
          localField: 'brand_id',
          foreignField: '_id',
          as: 'brand_id',
        },
      },
      { $unwind: '$brand_id' },
      {
        $lookup: {
          from: 'models',
          localField: 'model_id',
          foreignField: '_id',
          as: 'model_id',
        },
      },
      { $unwind: '$model_id' },
      {
        $lookup: {
          from: 'reg_years',
          localField: 'reg_year_id',
          foreignField: '_id',
          as: 'reg_year_id',
        },
      },
      { $unwind: '$reg_year_id' }
    )

    if (yearFrom && yearTo) {
      if (+yearFrom <= +yearTo) {
        pipeline.push({
          $match: {
            'reg_year_id.label': {
              $gte: yearFrom,
              $lte: yearTo,
            },
          },
        })
      }
      if (+yearFrom >= +yearTo) {
        pipeline.push({
          $match: {
            'reg_year_id.label': {
              $gte: yearTo,
              $lte: yearFrom,
            },
          },
        })
      }
    }

    console.log('pipe >>> ', pipeline)

    const cars = await Car.aggregate(pipeline)

    console.log('serachedCars>> ', cars)

    return new Response(JSON.stringify(cars), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all cars', { status: 500 })
  }
}
