'use client'

import Container from '@app/components/Container'
import Image from 'next/image'
import GoogleImage from '@public/assets/google.png'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()

  const handleSignIn = async () => {
    // try {
    //   setLoading(true)
    //   const res = await fetch('/api/signin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(user),
    //   })

    //   if (res.ok) {
    //     router.push('/')
    //     console.log('Login success')
    //   }
    // } catch (error) {
    //   // console.log('Login failed', error.message)
    // } finally {
    //   setLoading(false)
    // }
    const loginData = {
      email: user.email,
      password: user.password,
      callbackUrl: '/',
      redirect: false,
    }

    const login = await signIn('credentials', loginData)

    if (login.ok) {
      console.log('radi')
      // router.push(login.url)
    } else {
      // toast.error('Login failed.')
    }
  }

  useEffect(() => {
    if (session?.user) {
      router.replace('/')
    }
  }, [session])

  return (
    <div className="py-10">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <form
            onSubmit={e => {
              e.preventDefault()
            }}
            className="flex flex-col lg:min-w-[36%] md:min-w-[36%] min-w-[70%] gap-5 py-7 px-6 bg-white rounded-[30px]"
          >
            <div>
              <h1 className="font-bold text-2xl">Sign in</h1>
              <p>Find your car.</p>
            </div>
            <div className="flex flex-col">
              <input
                className="input-full"
                type="text"
                placeholder="Email"
                onChange={e => setUser({ ...user, email: e.target.value })}
              />
              <input
                className="input-full mt-5"
                type="text"
                placeholder="Password"
                onChange={e => setUser({ ...user, password: e.target.value })}
              />
              <button className="self-start mt-1.5 text-sm">
                Forgot password?
              </button>
            </div>
            <button
              onClick={handleSignIn}
              className="bg-[#8D8D8D] text-white py-2 rounded-full text-sm font-medium"
            >
              Sign in
            </button>
            <div className="flex gap-2.5 items-center">
              <div className="h-[1px] w-full bg-[#ddd]"></div>
              <span className="text-sm">or</span>
              <div className="h-[1px] w-full bg-[#ddd]"></div>
            </div>
            <button
              className="flex justify-center gap-2 items-center border-[#ddd] border-[1px] text-[#525252] py-2 rounded-full text-sm font-medium"
              onClick={() => {
                signIn('google', {
                  callbackUrl: `/`,
                })
              }}
            >
              <Image className="max-w-[1rem]" src={GoogleImage} alt="google" />
              Sign in with Google
            </button>
          </form>
          <p className="text-gray-500">
            New to SellCars?{' '}
            <Link className="text-black ml-1" href="/signup">
              Join now!
            </Link>
          </p>
        </div>
      </Container>
    </div>
  )
}

export default SignIn
