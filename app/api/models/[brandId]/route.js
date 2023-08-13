import { connectToDB } from '@utils/database'
import { Model } from '@models/model'

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const models = await Model.find({ brand_id: params.brandId })

    return new Response(JSON.stringify(models), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all models', { status: 500 })
  }
}
