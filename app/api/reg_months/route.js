import { connectToDB } from '@utils/database'
import { RegMonth } from '@models/reg_month'

export const GET = async req => {
  try {
    await connectToDB()

    const RegMonths = await RegMonth.find({})

    return new Response(JSON.stringify(RegMonths), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all reg months', { status: 500 })
  }
}
