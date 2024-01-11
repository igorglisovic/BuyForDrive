import { User } from '@models/user'
import { connectToDB } from '@utils/database'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export const POST = async req => {
  const { email, password } = await req.json()
  console.log(email, password)

  try {
    await connectToDB()

    //check if user exists
    const user = await User.findOne({ email })

    if (!user) {
      return new Response({ error: 'User does not exist' }, { status: 400 })
    }
    console.log('user exists')

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return new Response({ error: 'Invalid password' }, { status: 400 })
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    })

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    })

    response.cookies.set('token', token, {
      httpOnly: true,
    })

    return response
    // return new Response('User logged in successfully.', { status: 200 })
  } catch (error) {
    return new Response({ error: error.message }, { status: 500 })
  }
}
