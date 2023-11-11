import { Power } from '@models/powers'
import { connectToDB } from '@utils/database'

export const GET = async req => {
  try {
    await connectToDB()

    const powers = await Power.aggregate([
      {
        $project: {
          label: 1,
          powers: { $toInt: '$label' }, // Convert the "label" field to a number
        },
      },
      {
        $sort: { powers: 1 }, // Sort by the "price" field in ascending order
      },
    ])

    return new Response(JSON.stringify(powers), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all fuel types', { status: 500 })
  }
}
