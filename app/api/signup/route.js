import { User } from '@models/user'
import { connectToDB } from '@utils/database'
import bcryptjs from 'bcryptjs'

export const POST = async req => {
  const { username, email, password } = await req.json()

  try {
    await connectToDB()

    const userExist = await User.findOne({ email })
    console.log(username, email, password, userExist)

    if (userExist) {
      return new Response('User with this email already exists.', {
        status: 409,
      })
    }

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      image:
        'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png',
      password: hashedPassword,
    })

    await newUser.save()

    return new Response('User registered successfully.', { status: 200 })
  } catch (error) {
    return new Response('Iternal server error.', { status: 500 })
  }
}
