'use client'

import CarForm from '@app/components/CarForm'
import Container from '@app/components/Container'
import LoadingBar from '@app/components/LoadingBar'
import { usePostCarContext } from '@app/store/post-car'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SellACar = () => {
  const { headerInView, resetStates } = usePostCarContext()
  const { data: session, status } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (!session?.user && status === 'unauthenticated') {
      router.replace('/signin')
    }
  }, [session])

  useEffect(() => {
    resetStates()
  }, [])

  return (
    <div>
      <LoadingBar />
      <section>
        <Container>
          <div className="flex justify-center">
            <div
              className={`py-8 sm:px-10 px-5 bg-white mb-16 rounded-[30px] w-full md:w-[60%] shadow-lg ${
                !headerInView ? 'mt-28' : 'mt-8'
              }`}
            >
              <CarForm type="post" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default SellACar
