import { connectToDB } from '@utils/database'
import { Brand } from '@models/brand'

export const GET = async req => {
  try {
    await connectToDB()

    const brands = await Brand.find({})

    return new Response(JSON.stringify(brands), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}
