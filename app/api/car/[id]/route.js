import { connectToDB } from '@utils/database'
import { Car } from '@models/car'
import mongoose from 'mongoose'

export const GET = async (req, { params }) => {
  const id = params.id && new mongoose.Types.ObjectId(params.id)

  try {
    await connectToDB()

    const car = await Car.aggregate([
      {
        $match: {
          _id: id,
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
      { $unwind: '$body_type' },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      {
        $lookup: {
          from: 'reg_months',
          localField: 'reg_month_id',
          foreignField: '_id',
          as: 'reg_month',
        },
      },
      { $unwind: '$reg_month' },
      {
        $lookup: {
          from: 'seats',
          localField: 'seats_id',
          foreignField: '_id',
          as: 'seats',
        },
      },
      { $unwind: '$seats' },
      {
        $lookup: {
          from: 'drivetrain',
          localField: 'drivetrain_id',
          foreignField: '_id',
          as: 'drivetrain',
        },
      },
      { $unwind: '$drivetrain' },
      {
        $lookup: {
          from: 'colors',
          localField: 'color_id',
          foreignField: '_id',
          as: 'color',
        },
      },
      { $unwind: '$color' },
      {
        $lookup: {
          from: 'air_conditioning',
          localField: 'air_conditioning_id',
          foreignField: '_id',
          as: 'air_conditioning',
        },
      },
      { $unwind: '$air_conditioning' },
      {
        $lookup: {
          from: 'owners',
          localField: 'owners_id',
          foreignField: '_id',
          as: 'owners',
        },
      },
      { $unwind: '$owners' },
    ])

    return new Response(JSON.stringify(car), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch car', { status: 500 })
  }
}

export const PATCH = async (req, { params }) => {
  const {
    userId,
    brandId,
    modelId,
    regYearId,
    regMonthId,
    mileage,
    doorsId,
    bodyTypeId,
    fuelTypeId,
    transmissionTypeId,
    power,
    displacement,
    seatsId,
    steeringSide,
    drivetrainId,
    colorId,
    airConditioningId,
    price,
    fixedPrice,
    ownersId,
    description,
    images,
    files,
  } = await req.json()

  try {
    await connectToDB()

    const existingCar = await Car.findById(params.id)
    const existingCarInitialVersion = Object.assign(existingCar)

    if (!existingCar) return new Response('Car not found', { status: 404 })

    existingCar.brand_id = brandId
    existingCar.model_id = modelId
    existingCar.reg_year_id = regYearId
    existingCar.reg_month_id = regMonthId
    existingCar.mileage = mileage
    existingCar.doors_id = doorsId
    existingCar.body_type_id = bodyTypeId
    existingCar.fuel_type_id = fuelTypeId
    existingCar.transmission_type_id = transmissionTypeId
    existingCar.power = power
    existingCar.displacement = displacement
    existingCar.seats_id = seatsId
    // existingCar.steeringSide = steeringSide
    // existingCar.drivetrainId = drivetrainId
    // existingCar.colorId = colorId
    // existingCar.airConditioningId = airConditioningId
    // existingCar.price = price
    // existingCar.fixedPrice = fixedPrice
    // existingCar.ownersId = ownersId
    // existingCar.description = description
    // existingCar.images = images
    // existingCar.files = files

    // if (existingCarInitialVersion !== existingCar) {
    await existingCar.save()
    // }
    console.log(existingCar, existingCarInitialVersion)

    return new Response(JSON.stringify(existingCar), { status: 200 })
  } catch (error) {
    return new Response('Failed to update car', { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    await Car.findByIdAndRemove(params.id)

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete prompt', {
      status: 500,
    })
  }
}
