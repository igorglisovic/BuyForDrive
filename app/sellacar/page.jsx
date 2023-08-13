'use client'

import Container from '@app/components/Container'
import LoadingBar from '@app/components/LoadingBar'
import PostACarBasic from '@app/components/PostACarBasic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SellACar = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.user) {
      router.push('/signin')
    }
  }, [])

  return (
    <div>
      <LoadingBar loadingState={5} />
      <section>
        <Container>
          <div className="flex justify-center">
            <div className="py-8 px-10 bg-white mt-7 rounded-[30px] w-full md:w-[60%]">
              <PostACarBasic />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default SellACar
