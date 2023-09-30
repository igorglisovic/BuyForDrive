import { User } from '@models/user'
import { connectToDB } from '@utils/database'

const POST = async req => {
  const { profile } = await req.json()

  try {
    await connectToDB()

    const userExist = await User.findOne({ email: profile.email })

    if (userExist) {
      return new Response('User with this email already exists.', {
        status: 409,
      })
    }

    await User.create(profile)

    return new Response('User registered successfully.', { status: 200 })
  } catch (error) {
    return new Response('Iternal server error.', { status: 500 })
  }
}

export default POST
