import { connectToDB } from '@utils/database'
import { Color } from '@models/color'

export const GET = async req => {
  try {
    await connectToDB()

    const colors = await Color.find({}).sort({ label: 1 })

    return new Response(JSON.stringify(colors), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all colors', { status: 500 })
  }
}
