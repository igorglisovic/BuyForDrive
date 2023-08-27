import { connectToDB } from '@utils/database'
import { Owner } from '@models/onwer'

export const GET = async req => {
  try {
    await connectToDB()

    const owners = await Owner.find({}).sort({ label: 1 })

    return new Response(JSON.stringify(owners), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all owners', { status: 500 })
  }
}
