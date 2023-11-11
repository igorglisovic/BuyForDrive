import { Mileage } from '@models/mileages'
import { connectToDB } from '@utils/database'

export const GET = async req => {
  try {
    await connectToDB()

    const mileages = await Mileage.aggregate([
      {
        $project: {
          label: 1,
          mileage: { $toInt: '$label' }, // Convert the "label" field to a number
        },
      },
      {
        $sort: { mileage: 1 }, // Sort by the "price" field in ascending order
      },
    ])

    return new Response(JSON.stringify(mileages), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all fuel types', { status: 500 })
  }
}
