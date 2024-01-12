'use client'

import Container from '@app/components/Container'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import SignupForm from '@app/components/SignupForm'

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
        </div>
      </Container>
    </div>
  )
}

export default SignUp
