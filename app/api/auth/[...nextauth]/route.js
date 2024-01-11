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
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials

        console.log(email, password)

        const user = await User.findOne({ email })

        if (user) {
          const validPassword = await bcryptjs.compare(password, user.password)
          console.log(validPassword)

          if (!validPassword) {
            return new Response({ error: 'Invalid password' }, { status: 400 })
          }

          return {
            id: user._id,
            email: user.email,
            name: user.username,
            image: user.image,
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })

      console.log('sessionUser ', session)

      session.user.id = sessionUser._id.toString()

      return session
    },
    // async signIn({ profile }) {
    //   console.log(profile)
    //   try {
    //     await connectToDB()

    //     const userExist = await User.findOne({ email: profile.email })

    //     if (!userExist) {
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
