import { Price } from '@models/prices'
import { connectToDB } from '@utils/database'

export const GET = async req => {
  try {
    await connectToDB()

    const prices = await Price.aggregate([
      {
        $project: {
          label: 1,
          price: { $toInt: '$label' }, // Convert the "label" field to a number
        },
      },
      {
        $sort: { price: 1 }, // Sort by the "price" field in ascending order
      },
    ])

    return new Response(JSON.stringify(prices), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all fuel types', { status: 500 })
  }
}
