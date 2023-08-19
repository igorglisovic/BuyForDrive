import { connectToDB } from '@utils/database'
import { FuelType } from '@models/fuel_types'

export const GET = async req => {
  try {
    await connectToDB()

    const fuelTypes = await FuelType.find({}).sort({ label: 1 })

    return new Response(JSON.stringify(fuelTypes), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all fuel types', { status: 500 })
  }
}
