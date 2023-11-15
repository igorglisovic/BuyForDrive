'use client'

import CarForm from '@app/components/CarForm'
import Container from '@app/components/Container'
import LoadingBar from '@app/components/LoadingBar'
import { usePostCarContext } from '@app/store/post-car'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SellACar = () => {
  const { headerInView } = usePostCarContext()

  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect user if not logged in
  useEffect(() => {
    if (!session?.user && status === 'unauthenticated') {
      // router.replace('/signin')
    }
  }, [session])

  return (
    <div>
      <LoadingBar />
      <section>
        <Container>
          <div className="flex justify-center">
            <div
              className={`py-8 px-10 bg-white mb-16 rounded-[30px] w-full md:w-[60%] shadow-lg ${
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
