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
  } = await req.json()

  console.log(fuelTypeId, transmissionTypeId)

  try {
    await connectToDB()

    const newCar = new Car({
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
    })

    await newCar.save()

    return new Response(JSON.stringify(newCar), { status: 201 })
  } catch (error) {
    return new Response('Failed to create new car')
  }
}
