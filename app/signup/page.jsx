'use client'

import Container from '@app/components/Container'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import SignupForm from '@app/components/SignupForm'
import Link from 'next/link'

const SignUp = () => {
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
          <SignupForm />
          <p className="text-gray-500">
            Already has an account?{' '}
            <Link
              aria-label="Sign in"
              className="text-black ml-1"
              href="/signin"
            >
              Sign in!
            </Link>
          </p>
        </div>
      </Container>
    </div>
  )
}

export default SignUp
