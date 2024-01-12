'use client'

import Container from '@app/components/Container'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Link from 'next/link'
import SigninForm from '@app/components/SigninForm'

const SignIn = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      router.replace('/')
    }
  }, [session])

  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <SigninForm />
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
