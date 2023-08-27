import { connectToDB } from '@utils/database'
import { Drivetrain } from '@models/drivetrain'

export const GET = async req => {
  try {
    await connectToDB()

    const drivetrain = await Drivetrain.find({}).sort({ label: 1 })

    return new Response(JSON.stringify(drivetrain), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch drivetrain', { status: 500 })
  }
}
