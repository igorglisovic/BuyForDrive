'use client'

import Container from '@app/components/Container'
import Image from 'next/image'
import GoogleImage from '@public/assets/google.png'
import { useRouter } from 'next/navigation'
import { signIn, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'

const SignIn = () => {
  const [providers, setProviders] = useState()

  const router = useRouter()

  useEffect(() => {
    const getAuthProviders = async () => {
      const res = await getProviders()

      console.log(Object.values(res))

      setProviders(res)
    }
    getAuthProviders()
  }, [])

  return (
    <div className="w-full h-full overflow-y-none">
      <Container>
        <div className="flex justify-center mt-8">
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
              <input className="input-full" type="text" placeholder="Email" />
              <input
                className="input-full mt-5"
                type="text"
                placeholder="Password"
              />
              <button className="self-start mt-1.5 text-sm">
                Forgot password?
              </button>
            </div>
            <button className="bg-[#8D8D8D] text-white py-2 rounded-full text-sm font-medium">
              Sign in
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
                    signIn(provider.id, {
                      callbackUrl: `/`,
                    })
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

export default SignIn
