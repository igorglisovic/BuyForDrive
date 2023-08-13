import { connectToDB } from '@utils/database'
import { Car } from '@models/car'

export const POST = async req => {
  const { userId, brandId, modelId, regYearId } = await req.json()

  console.log(brandId, modelId, regYearId)

  try {
    await connectToDB()

    const newCar = new Car({
      creator: userId,
      brand_id: brandId,
      model_id: modelId,
      reg_year_id: regYearId,
    })

    await newCar.save()

    return new Response(JSON.stringify(newCar), { status: 201 })
  } catch (error) {
    return new Response('Failed to create new car')
  }
}
