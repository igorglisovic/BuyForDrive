import { connectToDB } from '@utils/database'
import { Owner } from '@models/onwer'

export const GET = async req => {
  const pipeline = []
  try {
    await connectToDB()

    pipeline.push({
      $addFields: {
        numericLabel: { $toInt: '$label' }, // Convert label field to integer
      },
    })

    pipeline.push({
      $sort: { numericLabel: 1 }, // Sort by the numericLabel field
    })

    const owners = await Owner.aggregate(pipeline)

    return new Response(JSON.stringify(owners), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all owners', { status: 500 })
  }
}
