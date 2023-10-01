import { connectToDB } from '@utils/database'
import { Car } from '@models/car'

export const POST = async req => {
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
  } = await req.json()

  console.log('drivetrain>>>  ', images)

  try {
    await connectToDB()

    const newCar = new Car({
      images,
      creator: userId,
      brand_id: brandId,
      model_id: modelId,
      reg_year_id: regYearId,
      reg_month_id: regMonthId,
      mileage,
      doors_id: doorsId,
      body_type_id: bodyTypeId,
      fuel_type_id: fuelTypeId,
      transmission_type_id: transmissionTypeId,
      power,
      displacement,
      seats_id: seatsId,
      steering_side: steeringSide,
      drivetrain_id: drivetrainId,
      color_id: colorId,
      air_conditioning_id: airConditioningId,
      price,
      fixed_price: fixedPrice,
      owners_id: ownersId,
      description,
    })

    await newCar.save()

    return new Response(JSON.stringify(newCar), { status: 201 })
  } catch (error) {
    return new Response('Failed to create new car')
  }
}
