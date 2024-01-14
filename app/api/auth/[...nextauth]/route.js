import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@models/user'
import { connectToDB } from '@utils/database'
import bcryptjs from 'bcryptjs'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials

        const user = await User.findOne({ email })

        if (user) {
          const validPassword = await bcryptjs.compare(password, user.password)

          if (!validPassword) {
            const error = new Error('Email or password are not correct!')
            error.code = 400
            throw error
          }

          return {
            id: user._id,
            email: email,
            name: user.username,
            image: user.image,
          }
        } else {
          const error = new Error('Email or password are not correct!')
          error.code = 400
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })

      session.user.id = sessionUser._id.toString()

      return session
    },
    // async signIn({ profile, credentials }) {
    //   try {
    //     await connectToDB()

    //     let userExist

    //     if (profile) {
    //       userExist = await User.findOne({ email: profile.email })
    //     }

    //     if (credentials) {
    //       userExist = await User.findOne({ email: credentials.email })
    //     }

    //     if (!userExist && profile) {
    //       await User.create({
    //         username: profile.name.replace(' ', '').toLowerCase(),
    //         email: profile.email,
    //         image: profile.picture,
    //       })
    //     }

    //     return true
    //   } catch (error) {
    //     console.log(error)
    //     return false
    //   }
    // },
  },
})

export { handler as GET, handler as POST }
