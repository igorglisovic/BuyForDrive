import { connectToDB } from '@utils/database'
import { Car } from '@models/car'
import mongoose from 'mongoose'

export const GET = async (req, { params }) => {
  const brandId =
    req.nextUrl.searchParams.get('brand_id') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('brand_id'))
  const modelId =
    req.nextUrl.searchParams.get('model_id') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('model_id'))
  const yearFrom = req.nextUrl.searchParams.get('year_from')
  const yearTo = req.nextUrl.searchParams.get('year_to')
  const bodyTypeId =
    req.nextUrl.searchParams.get('body_type_id') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('body_type_id'))
  const fuelTypeId =
    req.nextUrl.searchParams.get('fuel_type_id') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('fuel_type_id'))

  console.log(fuelTypeId)

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

    if (bodyTypeId) {
      pipeline.push({
        $match: {
          body_type_id: bodyTypeId,
        },
      })
    }

    if (fuelTypeId) {
      pipeline.push({
        $match: {
          fuel_type_id: fuelTypeId,
        },
      })
    }

    pipeline.push(
      {
        $lookup: {
          from: 'brands',
          localField: 'brand_id',
          foreignField: '_id',
          as: 'brand',
        },
      },
      { $unwind: '$brand' },
      {
        $lookup: {
          from: 'models',
          localField: 'model_id',
          foreignField: '_id',
          as: 'model',
        },
      },
      { $unwind: '$model' },
      {
        $lookup: {
          from: 'reg_years',
          localField: 'reg_year_id',
          foreignField: '_id',
          as: 'reg_year',
        },
      },
      { $unwind: '$reg_year' },
      {
        $lookup: {
          from: 'body_type',
          localField: 'body_type_id',
          foreignField: '_id',
          as: 'body_type',
        },
      },
      { $unwind: '$body_type' },
      {
        $lookup: {
          from: 'fuel_types',
          localField: 'fuel_type_id',
          foreignField: '_id',
          as: 'fuel_type',
        },
      },
      { $unwind: '$fuel_type' },
      {
        $lookup: {
          from: 'transmission_types',
          localField: 'transmission_type_id',
          foreignField: '_id',
          as: 'transmission_type',
        },
      },
      { $unwind: '$transmission_type' },
      {
        $lookup: {
          from: 'doors',
          localField: 'doors_id',
          foreignField: '_id',
          as: 'doors',
        },
      },
      { $unwind: '$doors' },
      {
        $lookup: {
          from: 'body_type',
          localField: 'body_type_id',
          foreignField: '_id',
          as: 'body_type',
        },
      },
      { $unwind: '$body_type' }
    )

    if (yearFrom && !yearTo) {
      pipeline.push({
        $match: {
          'reg_year.label': {
            $gte: yearFrom,
          },
        },
      })
    }
    if (!yearFrom && yearTo) {
      pipeline.push({
        $match: {
          'reg_year.label': {
            $lte: yearTo,
          },
        },
      })
    }

    if (yearFrom && yearTo) {
      if (+yearFrom <= +yearTo) {
        pipeline.push({
          $match: {
            'reg_year.label': {
              $gte: yearFrom,
              $lte: yearTo,
            },
          },
        })
      }
      if (+yearFrom >= +yearTo) {
        pipeline.push({
          $match: {
            'reg_year.label': {
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
