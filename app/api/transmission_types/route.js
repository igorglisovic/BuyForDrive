import { connectToDB } from '@utils/database'
import { TransmissionType } from '@models/transmission_types'

export const GET = async () => {
  try {
    await connectToDB()

    const transmissionTypes = await TransmissionType.find({}).sort({ label: 1 })

    return new Response(JSON.stringify(transmissionTypes), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all transmission types', {
      status: 500,
    })
  }
}
