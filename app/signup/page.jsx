'use client'

import Container from '@app/components/Container'
import Image from 'next/image'
import GoogleImage from '@public/assets/google.png'
import { useRouter } from 'next/navigation'
import { signIn, getProviders, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const SignUp = () => {
  const [providers, setProviders] = useState()

  const { data: session } = useSession()
  const router = useRouter()

  const handleSignIn = provider => {
    signIn(provider.id, {
      callbackUrl: `/`,
    })
  }

  useEffect(() => {
    if (session?.user) {
      router.replace('/')
    }
  }, [session])

  useEffect(() => {
    const getAuthProviders = async () => {
      const res = await getProviders()

      setProviders(res)
    }
    getAuthProviders()
  }, [])

  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <form
            onSubmit={e => {
              e.preventDefault()
            }}
            className="flex flex-col lg:min-w-[36%] md:min-w-[36%] min-w-[70%] gap-5 py-7 px-6 bg-white rounded-[30px]"
          >
            <div>
              <h1 className="font-bold text-2xl">Join now</h1>
              <p>Find your car.</p>
            </div>
            <div className="flex flex-col gap-5">
              <input
                className="input-full"
                type="text"
                placeholder="Username"
              />
              <input className="input-full" type="text" placeholder="Email" />
              <input
                className="input-full"
                type="text"
                placeholder="Password"
              />
              <input
                className="input-full"
                type="text"
                placeholder="Confirm password"
              />
            </div>
            <button className="bg-[#8D8D8D] text-white py-2 rounded-full text-sm font-medium">
              Sign up
            </button>
            <div className="flex gap-2.5 items-center">
              <div className="h-[1px] w-full bg-[#ddd]"></div>
              <span className="text-sm">or</span>
              <div className="h-[1px] w-full bg-[#ddd]"></div>
            </div>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  key={provider.name}
                  className="flex justify-center gap-2 items-center border-[#ddd] border-[1px] text-[#525252] py-2 rounded-full text-sm font-medium"
                  onClick={() => {
                    handleSignIn(provider)
                  }}
                >
                  <Image
                    className="max-w-[1rem]"
                    src={GoogleImage}
                    alt="google"
                  />
                  Sign in with {provider.name}
                </button>
              ))}
          </form>
        </div>
      </Container>
    </div>
  )
}

export default SignUp
