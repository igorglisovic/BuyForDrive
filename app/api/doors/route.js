import { connectToDB } from '@utils/database'
import { Door } from '@models/door'

export const GET = async req => {
  try {
    await connectToDB()

    const doors = await Door.find({}).sort({ label: 1 })

    return new Response(JSON.stringify(doors), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all doors', { status: 500 })
  }
}
