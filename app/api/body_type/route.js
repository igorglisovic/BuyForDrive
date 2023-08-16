import { connectToDB } from '@utils/database'
import { BodyType } from '@models/body_type'

export const GET = async req => {
  try {
    await connectToDB()

    const bodyType = await BodyType.find({})

    return new Response(JSON.stringify(bodyType), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all body types', { status: 500 })
  }
}
