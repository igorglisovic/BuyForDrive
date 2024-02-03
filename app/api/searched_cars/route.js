import { connectToDB } from '@utils/database'
import { Car } from '@models/car'
import mongoose from 'mongoose'

export const GET = async req => {
  const sorting = req.nextUrl.searchParams.get('sort')
  const brandId =
    req.nextUrl.searchParams.get('brand_id') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('brand_id'))
  const modelId =
    req.nextUrl.searchParams.get('model_id') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('model_id'))
  const yearFrom =
    req.nextUrl.searchParams.get('year_from') &&
    req.nextUrl.searchParams.get('year_from')?.split('_')[1]
  const yearTo =
    req.nextUrl.searchParams.get('year_to') &&
    req.nextUrl.searchParams.get('year_to')?.split('_')[1]
  const mileageFrom =
    req.nextUrl.searchParams.get('mileage_from') &&
    req.nextUrl.searchParams
      .get('mileage_from')
      ?.split('_')[1]
      .split(',')
      .join('')
  const mileageTo =
    req.nextUrl.searchParams.get('mileage_to') &&
    req.nextUrl.searchParams
      .get('mileage_to')
      ?.split('_')[1]
      .split(',')
      .join('')
  const priceFrom =
    req.nextUrl.searchParams.get('price_from') &&
    req.nextUrl.searchParams
      .get('price_from')
      ?.split('_')[1]
      .split(',')
      .join('')
  const priceTo =
    req.nextUrl.searchParams.get('price_to') &&
    req.nextUrl.searchParams.get('price_to')?.split('_')[1].split(',').join('')
  const powerFrom =
    req.nextUrl.searchParams.get('power_from') &&
    req.nextUrl.searchParams.get('power_from')?.split('_')[1]
  const powerTo =
    req.nextUrl.searchParams.get('power_to') &&
    req.nextUrl.searchParams.get('power_to')?.split('_')[1]
  const bodyTypeId =
    req.nextUrl.searchParams.get('body_type_id') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('body_type_id'))
  const fuelTypeId =
    req.nextUrl.searchParams.get('fuel_type_id') &&
    new mongoose.Types.ObjectId(req.nextUrl.searchParams.get('fuel_type_id'))
  const page = req.nextUrl.searchParams.get('page')
  const limit = req.nextUrl.searchParams.get('limit')

  try {
    await connectToDB()

    const pipeline = []

    pipeline.push({
      $match: {
        brand_id: brandId || { $exists: 1 },
        model_id: modelId || { $exists: 1 },
        body_type_id: bodyTypeId || { $exists: 1 },
        fuel_type_id: fuelTypeId || { $exists: 1 },
      },
    })

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

    if (sorting) {
      pipeline.push({
        $addFields: {
          mileageNumeric: {
            $toDouble: {
              $replaceAll: {
                input: '$mileage',
                find: ',',
                replacement: '',
              },
            },
          },
          priceNumeric: {
            $toDouble: {
              $replaceAll: {
                input: '$price',
                find: ',',
                replacement: '',
              },
            },
          },
        },
      })
    }

    switch (sorting) {
      case 'price_asc':
        pipeline.push({
          $sort: {
            priceNumeric: 1,
          },
        })
        break
      case 'price_desc':
        pipeline.push({
          $sort: {
            priceNumeric: -1,
          },
        })
        break
      case 'reg_desc':
        pipeline.push({
          $sort: {
            'reg_year.label': -1,
          },
        })
        break
      case 'reg_asc':
        pipeline.push({
          $sort: {
            'reg_year.label': 1,
          },
        })
        break
      case 'mileage_asc':
        pipeline.push({
          $sort: {
            mileageNumeric: 1,
          },
        })
        break
      case 'mileage_desc':
        pipeline.push({
          $sort: {
            mileageNumeric: -1,
          },
        })
        break
      case 'latest_offers':
        pipeline.push({
          $sort: {
            createdAt: -1,
          },
        })
        break
    }

    if (mileageFrom && !mileageTo) {
      pipeline.push({
        $match: {
          mileageNumeric: {
            $gte: +mileageFrom,
          },
        },
      })
    }

    if (!mileageFrom && mileageTo) {
      pipeline.push({
        $match: {
          mileageNumeric: {
            $lte: +mileageTo,
          },
        },
      })
    }

    if (mileageFrom && mileageTo) {
      if (+mileageFrom <= +mileageTo) {
        pipeline.push({
          $match: {
            mileageNumeric: {
              $gte: +mileageFrom,
              $lte: +mileageTo,
            },
          },
        })
      }
      if (+mileageFrom >= +mileageTo) {
        pipeline.push({
          $match: {
            mileageNumeric: {
              $gte: +mileageTo,
              $lte: +mileageFrom,
            },
          },
        })
      }
    }

    if (priceFrom && !priceTo) {
      pipeline.push({
        $match: {
          priceNumeric: {
            $gte: +priceFrom,
          },
        },
      })
    }

    if (!priceFrom && priceTo) {
      pipeline.push({
        $match: {
          priceNumeric: {
            $lte: +priceTo,
          },
        },
      })
    }

    if (priceFrom && priceTo) {
      if (+priceFrom <= +priceTo) {
        pipeline.push({
          $match: {
            priceNumeric: {
              $gte: +priceFrom,
              $lte: +priceTo,
            },
          },
        })
      }
      if (+priceFrom >= +priceTo) {
        pipeline.push({
          $match: {
            priceNumeric: {
              $gte: +priceTo,
              $lte: +priceFrom,
            },
          },
        })
      }
    }

    pipeline.push({
      $addFields: {
        powerNumeric: {
          $toDouble: {
            $replaceAll: {
              input: '$power.kw',
              find: ',',
              replacement: '',
            },
          },
        },
      },
    })

    if (powerFrom && !powerTo) {
      pipeline.push({
        $match: {
          powerNumeric: {
            $gte: +powerFrom,
          },
        },
      })
    }

    if (!powerFrom && powerTo) {
      pipeline.push({
        $match: {
          powerNumeric: {
            $lte: +powerTo,
          },
        },
      })
    }

    if (powerFrom && powerTo) {
      if (+powerFrom <= +powerTo) {
        pipeline.push({
          $match: {
            powerNumeric: {
              $gte: +powerFrom,
              $lte: +powerTo,
            },
          },
        })
      }
      if (+powerFrom >= +powerTo) {
        pipeline.push({
          $match: {
            powerNumeric: {
              $gte: +powerTo,
              $lte: +powerFrom,
            },
          },
        })
      }
    }

    if (page && limit) {
      const skip = (+page - 1) * +limit

      pipeline.push({
        $skip: +skip,
      })

      pipeline.push({ $limit: +limit })
    }

    const cars = await Car.aggregate(pipeline)

    return new Response(JSON.stringify(cars), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all cars', { status: 500 })
  }
}
