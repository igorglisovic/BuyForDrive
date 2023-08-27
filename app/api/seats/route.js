import { connectToDB } from '@utils/database'
import { Seat } from '@models/seat'

export const GET = async () => {
  try {
    await connectToDB()

    const seats = await Seat.find({}).sort({ label: 1 })

    return new Response(JSON.stringify(seats), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all numbers of seats', {
      status: 500,
    })
  }
}
