import { connectToDB } from '@utils/database'
import { AirConditioning } from '@models/air_conditioning'

export const GET = async req => {
  try {
    await connectToDB()

    const airConditioning = await AirConditioning.find({}).sort({ label: 1 })

    return new Response(JSON.stringify(airConditioning), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch air conditioning', { status: 500 })
  }
}
